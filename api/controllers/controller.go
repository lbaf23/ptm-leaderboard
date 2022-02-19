package controllers

import (
	"api/conf"
	"bytes"
	"fmt"
	"net/http"
)

type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func DoPost(route string, buf *bytes.Buffer) (resp *http.Response, err error) {
	url := fmt.Sprintf("%s%s", conf.Config.AttackBaseUrl, route)
	resp, err = http.Post(url, "application/json", buf)
	return
}
