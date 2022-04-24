package oss

import (
	"encoding/json"
	"filestorage/conf"
	"fmt"
	"github.com/aliyun/alibaba-cloud-sdk-go/services/sts"
)

var client *sts.Client

type AssumedRoleUser struct {
	Arn           string
	AssumedRoleId string
}

type Credentials struct {
	SecurityToken   string
	AccessKeyId     string
	AccessKeySecret string
	Expiration      string
}

type STSToken struct {
	RequestId       string
	AssumedRoleUser AssumedRoleUser
	Credentials     Credentials
}

func Init() {
	var err error
	client, err = sts.NewClientWithAccessKey(
		conf.Config.Region,
		conf.Config.AccessKeyId,
		conf.Config.AccessKeySecret)
	if err != nil {
		panic(err.Error())
	}
}

func GetSTS() STSToken {
	var res STSToken
	request := sts.CreateAssumeRoleRequest()
	request.Scheme = "https"
	request.RoleArn = conf.Config.RoleArn
	request.RoleSessionName = conf.Config.RoleSessionName
	response, err := client.AssumeRole(request)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("======")
	fmt.Println(response.GetHttpContentString())
	json.Unmarshal(response.GetHttpContentBytes(), &res)
	return res
}
