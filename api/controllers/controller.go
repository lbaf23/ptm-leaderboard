package controllers

import (
	"api/conf"
	"fmt"
	"net/http"
	"net/url"
)

type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func DoPost(route string, payload url.Values) (resp *http.Response, err error) {
	resp, err = http.PostForm(fmt.Sprintf("%s%s", conf.Config.AttackBaseUrl, route), payload)
	return
}
