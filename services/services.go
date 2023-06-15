package services

import (
	"fmt"
	"to-do-list/initializer"
	"to-do-list/model"
)

var Data []model.Todo

func GetTodos() []model.Todo {
	if err := initializer.DB.Preload("Attachments").Find(&Data).Error; err != nil {
		fmt.Println("error in fetch ", err)
	}
	return Data
}

func UpdateTodo(id int, stage string) {
	initializer.DB.Model(&model.Todo{}).Where("id = ?", id).Update("stage", stage)
}

func GetUpdatedTodo(id int) []model.Todo {
	initializer.DB.Where("id=?", id).Preload("Attachments").Find(&Data)
	return Data

}

func UpdateTodoData(id int) {

}
