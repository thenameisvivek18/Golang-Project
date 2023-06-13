package controllers

import (
	"fmt"
	"net/http"
	"to-do-list/initializer"
	"to-do-list/model"

	"github.com/gin-gonic/gin"
)

func AddTodo(c *gin.Context) {
	//alternate option
	// todoname := c.PostForm("todoname")
	// tododesc := c.PostForm("tododesc")

	// c.JSON(200, gin.H{
	// 	"Name": todoname,
	// 	"Desc": tododesc,
	// })

	var data model.Todo
	if err := c.Bind(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid",
		})
		return
	}

	initializer.DB.AutoMigrate(&model.Todo{})
	data.Stage = "todo"
	res := initializer.DB.Create(&data)

	if res.Error != nil {
		fmt.Println(res.Error)
		c.Status(400)
	} else {
		c.Status(200)
		c.Redirect(302, "/")
	}
	fmt.Println("data save")

}
