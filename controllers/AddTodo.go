package controllers

import (
	"fmt"

	// "to-do-list/initializer"

	"to-do-list/initializer"
	"to-do-list/model"

	"github.com/gin-gonic/gin"
)

// func AddTodo(c *gin.Context) {
// 	//alternate option
// 	// todoname := c.PostForm("todoname")
// 	// tododesc := c.PostForm("tododesc")

// 	// c.JSON(200, gin.H{
// 	// 	"Name": todoname,
// 	// 	"Desc": tododesc,
// 	// })

// 	todo_id := c.PostForm("todo_id")
// 	fmt.Println("update id", todo_id)
// 	if todo_id != "" {

// 	} else {

// 		form, err := c.MultipartForm()
// 		if err != nil {
// 			fmt.Println(err)
// 		}

// 		var data model.Todo
// 		if err := c.Bind(&data); err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{
// 				"error": "Invalid",
// 			})
// 			return

// 		}

// 		data.Stage = "todo"
// 		files := form.File["myfile"]

// 		if err != nil {
// 			fmt.Println(err)
// 		}
// 		attachements := make([]model.Attachment, len(files))
// 		for i, file := range files {

// 			err = c.SaveUploadedFile(file, "/home/vivek-valand/go/src/to-do-list/assets/images/"+file.Filename)
// 			if err != nil {
// 				fmt.Println(err)
// 			}

// 			attachements[i] = model.Attachment{
// 				Files:  "/assets/images/" + file.Filename,
// 				TodoID: data.Id,
// 			}

// 			if err := initializer.DB.Create(&attachements[i]).Error; err != nil {
// 				fmt.Println(err)
// 			}

// 		}
// 		data.Attachments = attachements

// 		initializer.DB.AutoMigrate(&model.Todo{})
// 		res := initializer.DB.Create(&data)

// 		if res.Error != nil {
// 			fmt.Println(res.Error)
// 			c.Status(400)
// 		} else {
// 			c.Status(200)
// 			c.Redirect(302, "/")
// 		}
// 		fmt.Println("data save")
// 	}

// }
func AddTodo(c *gin.Context) {
	var todo model.Todo
	todo_id := c.PostForm("todo_id")

	// Check if the todo ID is provided
	if todo_id != "" {
		// Update an existing todo
		initializer.DB.First(&todo, todo_id)
	}

	// Update the todo fields
	todo.Todoname = c.PostForm("todoname")
	todo.Tododesc = c.PostForm("tododesc")
	todo.Stage = "todo"

	// Save the todo record
	initializer.DB.Save(&todo)

	// Get the attachments from the request
	form, err := c.MultipartForm()
	if err != nil {
		fmt.Println(err)
	}

	// Create or update the attachments
	files := form.File["myfile"]
	attachments := make([]model.Attachment, len(files))

	for i, file := range files {
		err = c.SaveUploadedFile(file, "/home/vivek-valand/go/src/to-do-list/assets/images/"+file.Filename)
		if err != nil {
			fmt.Println(err)
		}

		// Create or update the attachment record
		attachment := model.Attachment{
			Files:  "/assets/images/" + file.Filename,
			TodoID: todo.Id,
		}
		initializer.DB.Where(model.Attachment{ID: i + 1}).Assign(attachment).FirstOrCreate(&attachment)
		attachments[i] = attachment
	}

	// Update the attachments for the todo
	todo.Attachments = attachments
	initializer.DB.Save(&todo)

	// Redirect to the home page
	c.Redirect(302, "/")
}
