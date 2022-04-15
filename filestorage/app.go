package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"syscall"
)

var dir, _ = os.Getwd()
var uploadPath = path.Join(dir, "uploads")
var uploadTempPath = path.Join(uploadPath, "temp")

func PathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}

func uploadFile(w http.ResponseWriter, r *http.Request) {
	file, _, err := r.FormFile("file")
	// total := r.PostFormValue("total")
	index := r.PostFormValue("index")
	// size, err := strconv.ParseInt(r.PostFormValue("size"), 10, 64)
	hash := r.PostFormValue("hash")
	// name := r.PostFormValue("name")
	nameList, err := ioutil.ReadDir(uploadPath)
	m := map[string]interface{}{
		"code": 46900,
		"msg":  "文件已上传",
	}
	result, _ := json.MarshalIndent(m, "", "    ")
	for _, name := range nameList {
		tmpName := strings.Split(name.Name(), "_")[0]
		if tmpName == hash {
			fmt.Fprintf(w, string(result))
			return
		}
	}

	chunksPath := path.Join(uploadTempPath, hash, "/")

	isPathExists, err := PathExists(chunksPath)
	if !isPathExists {
		err = os.MkdirAll(chunksPath, os.ModePerm)
	}
	destFile, err := os.OpenFile(path.Join(chunksPath+"/"+hash+"-"+index), syscall.O_CREAT|syscall.O_WRONLY, 0777)
	reader := bufio.NewReader(file)
	writer := bufio.NewWriter(destFile)
	buf := make([]byte, 1024*1024) // 1M buf
	for {
		n, err := reader.Read(buf)
		if err == io.EOF {
			writer.Flush()
			break
		} else if err != nil {
			return
		} else {
			writer.Write(buf[:n])
		}
	}

	defer file.Close()
	defer destFile.Close()
	if err != nil {
		log.Fatal("%v", err)
	}
}

// 合并文件
func chunks(w http.ResponseWriter, r *http.Request) {
	// total, _ := strconv.Atoi(r.PostFormValue("total"))
	// index := r.PostFormValue("index")
	size, _ := strconv.ParseInt(r.PostFormValue("size"), 10, 64)
	hash := r.PostFormValue("hash")
	name := r.PostFormValue("name")

	toSize, _ := DirSize(path.Join(uploadTempPath, hash, "/"))
	if size != toSize {
		fmt.Fprintf(w, "文件上传错误")
	}
	chunksPath := path.Join(uploadTempPath, hash, "/")
	files, _ := ioutil.ReadDir(chunksPath)
	fs, _ := os.OpenFile(path.Join(uploadPath, hash+"_"+name), os.O_CREATE|os.O_RDWR|os.O_APPEND, os.ModeAppend|os.ModePerm)
	var wg sync.WaitGroup
	wg.Add(len(files))
	for i, f := range files {
		go func(f os.FileInfo) {
			name := strings.Split(f.Name(), "-")[0] + "-" + strconv.Itoa(i)
			fileName := path.Join(chunksPath, "/"+name)
			data, _ := ioutil.ReadFile(fileName)
			fs.Write(data)
			os.RemoveAll(path.Join(chunksPath, "/"))
			defer wg.Done()
		}(f)

	}
	wg.Wait()
	m := map[string]interface{}{
		"code": 20000,
		"msg":  "上传成功",
	}
	result, _ := json.MarshalIndent(m, "", "    ")
	fmt.Fprintf(w, string(result))
	defer fs.Close()

}

// 获取整体文件夹大小
func DirSize(path string) (int64, error) {
	var size int64
	err := filepath.Walk(path, func(_ string, info os.FileInfo, err error) error {
		if !info.IsDir() {
			size += info.Size()
		}
		return err
	})
	return size, err
}

func main() {
	http.HandleFunc("/uploadFile", uploadFile)
	http.HandleFunc("/file/chunks", chunks)
	err := http.ListenAndServe(":8080", nil) // set listen port
	if err != nil {
		log.Fatal("Error while starting GO http server on port - 8080 : ", err) //log error and exit in case of error at server boot up
	}
}
