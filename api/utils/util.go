package utils

import "encoding/json"

func StructToByte(v interface{}) (b []byte) {
	b, _ = json.Marshal(v)
	return
}
