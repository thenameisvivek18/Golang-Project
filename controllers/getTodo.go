package controllers

import (
	"net/http"
	"to-do-list/services"

	"github.com/gin-gonic/gin"
)

func GetTodo(c *gin.Context) {

	todos := services.GetTodos()

	c.HTML(http.StatusOK, "todos.html", gin.H{
		"todos": todos,
	})

}
