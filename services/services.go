package services

import (
	"to-do-list/initializer"
	"to-do-list/model"
)

var Data []model.Todo

func GetTodos() []model.Todo {
	initializer.DB.Find(&Data)
	return Data
}

func UpdateTodo(id int, stage string) {
	initializer.DB.Model(&model.Todo{}).Where("id = ?", id).Update("stage", stage)
}

func GetUpdatedTodo(id int) []model.Todo {
	initializer.DB.Where("id=?", id).Find(&Data)
	return Data

}
