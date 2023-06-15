package model

import (
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	Id          int
	Todoname    string `form:"todoname"`
	Tododesc    string `form:"tododesc"`
	Stage       string
	Attachments []Attachment
}
type Attachment struct {
	gorm.Model
	ID     int
	Files  string
	TodoID int
}
