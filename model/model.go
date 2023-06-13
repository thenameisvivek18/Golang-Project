package model

import (
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	ID       int
	Todoname string `form:"todoname"`
	Tododesc string `form:"tododesc"`
	Stage    string
}
