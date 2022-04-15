package controllers

import (
	"filestorage/conf"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"os"
	"strconv"
)

func UploadFile(c *gin.Context) {
	var err error

	file, _ := c.FormFile("file")

	chunkLength, _ := strconv.ParseInt(c.PostForm("chunkLength"), 10, 64)
	index, _ := strconv.ParseInt(c.PostForm("index"), 10, 64)
	//currentSize := c.PostForm("currentSize")
	//totalSize := c.PostForm("totalSize")
	path := c.PostForm("path")
	name := c.PostForm("name")

	dir := fmt.Sprintf("files%s", path)
	filePath := fmt.Sprintf("%s/%s%d", dir, name, index)
	err = os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		fmt.Println(err.Error())
	}

	newFile, err := os.Create(filePath)
	newFile.Close()

	err = c.SaveUploadedFile(file, filePath)

	if err != nil {
		fmt.Println(err.Error())
	}

	url := ""
	finished := false
	if index+1 == chunkLength {
		print("[file] merge chunks")
		url, err = mergeChunks(dir, name, chunkLength)
		finished = true
		print("[file] merge finished")
	}

	c.JSON(200, gin.H{
		"code":     200,
		"message":  "ok",
		"url":      url,
		"finished": finished,
	})
}

func GetFile(c *gin.Context) {
	path := c.Query("path")
	name := c.Query("name")
	c.Header("Content-Type", "application/zip")
	c.Header("Content-Disposition", fmt.Sprintf("attachment;filename=%s", name))
	c.File(fmt.Sprintf("%s/%s", path, name))
}

func DeleteFile(c *gin.Context) {

}

func mergeChunks(dir string, name string, chunkLength int64) (url string, err error) {
	var (
		i int64
	)
	file, _ := os.Create(fmt.Sprintf("%s/%s", dir, name))
	for i = 0; i < chunkLength; i++ {
		f, _ := os.OpenFile(fmt.Sprintf("%s/%s%d", dir, name, i), os.O_RDONLY, os.ModePerm)
		b, _ := ioutil.ReadAll(f)
		file.Write(b)
		f.Close()
		os.Remove(fmt.Sprintf("%s/%s%d", dir, name, i))
	}
	file.Close()
	url = fmt.Sprintf("%s/?path=%s&name=%s", conf.Config.LocalServer, dir, name)
	return
}
