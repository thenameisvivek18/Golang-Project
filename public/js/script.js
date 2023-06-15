console.log("hii");
async function stateChange(data) {
  console.log("qwertyyuu");
  console.log("state:::", data.value);
  let id = data.id.trim();
  let value = data.value;
  let todos = ``;
  console.log("id outer :- ", id);
  if (value == "hold") {
    console.log(`/hold?id=${id}&stage=${value}`);
    let res = await fetch(`/update?id=${id}&stage=${value}`);
    let ans = await res.json();
    console.log("data main:- ", ans);
    console.log("id", ans[0].Id);
    var div = document.getElementById("hold");
    document.getElementById(ans[0].Id).remove();
    console.log("div tag:- ", document.getElementById(ans[0].Id));
    let imgSrc = "./assets/images/todo.jpg";
    if (ans[0].Attachments.length > 0) {
      imgSrc = ans[0].Attachments[0].Files;
    }
    todos += `<div class="card mb-3 hold" style="width: 15rem;" id="${ans[0].Id}">
        <img src="${imgSrc}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${ans[0].Todoname}</h5>
          <p class="card-text">${ans[0].Tododesc}</p>
          <select name="stage" id="${ans[0].Id}" onchange="stateChange(this)" class="select-design">
            <option value="" selected disabled >Move to</option>
            <option value="progress">Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
    </div>`;
    console.log(todos);
    div.innerHTML += todos;
  }
  if (value == "progress") {
    let res = await fetch(`/update?id=${id}&stage=${value}`);
    let ans = await res.json();
    console.log("id", ans[0].Id);
    var div = document.getElementById("progress");
    document.getElementById(ans[0].Id).remove();
    let imgSrc = "./assets/images/todo.jpg";
    if (ans[0].Attachments.length > 0) {
      imgSrc = ans[0].Attachments[0].Files;
    }
    todos += ` <div class="card mb-3 prog" style="width: 15rem;" id="${ans[0].Id}">
        <img src="${imgSrc}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${ans[0].Todoname}</h5>
          <p class="card-text">${ans[0].Tododesc}</p>
          <select name="stage" id="${ans[0].Id}" onchange="stateChange(this)" class="select-design">
            <option value="" selected disabled >Move to</option>
            <option value="hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
    </div>`;
    div.innerHTML += todos;
  }
  if (value == "completed") {
    let res = await fetch(`/update?id=${id}&stage=${value}`);
    let ans = await res.json();
    console.log("data :- ", ans);

    console.log("id", ans[0].Id);
    var div = document.getElementById("complete");
    document.getElementById(ans[0].Id).remove();
    let imgSrc = "./assets/images/todo.jpg";
    if (ans[0].Attachments.length > 0) {
      imgSrc = ans[0].Attachments[0].Files;
    }
    todos += ` <div class="card mb-3 completed" style="width: 15rem;" id="${ans[0].Id}">
        <img src="${imgSrc}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${ans[0].Todoname}</h5>
          <p class="card-text">${ans[0].Tododesc}</p>
          <select name="stage" id="${ans[0].Id}" onchange="stateChange(this)" class="select-design">
            <option value="" selected disabled >Move to</option>
            <option value="hold">On Hold</option>
            <option value="progress">Progress</option>
          </select>
        </div>
    </div>`;
    div.innerHTML += todos;
  }
}

async function getMoreData(data) {
  let id = data.id;
  let demo = ``;
  let value = "single";
  console.log("id :- ", id);
  let alldatasingleId = await fetch(`/update?id=${id}`);
  let res = await alldatasingleId.json();
  console.log(res);
  secondpopupdiv = document.getElementById("atcbody");
  let imgSrc = "./assets/images/todo.jpg";
  if (res[0].Attachments.length > 0) {
    imgSrc = res[0].Attachments[0].Files;
  }
  demo += ` <div class="card mb-3" style="width: 15rem;" id="${res[0].Id}_modal" onclick="getMoreData(this)">
  <form action="/addtodo" method="post" enctype="multipart/form-data"> 
  <img src="${imgSrc}" class="card-img-top" alt="..."  data-bs-toggle="modal" data-bs-target="#atcModal" >  
  <input type="text" name="todo_id" value="${res[0].Id}" hidden>
  <div class="card-body">
        <h5 class="card-title">
        <div class="mb-3">
          <label for="" class="form-label">Todo Name:</label>
          <input type="text" class="form-control" name="todoname" id="todoname" value="${res[0].Todoname}">
        </div>
        </h5>
          <div class="mb-3">
         <label for="" class="form-label">Todo Desc:</label>
          <input type="text" class="form-control" name="tododesc" id="tododesc" value="${res[0].Tododesc}">
          </div>
          <div class="mb-3">
          <label for="myfile" class="form-label">Select a file:</label>
          <input type="file" id="myfile" class="form-control" name="myfile" multiple="multiple" value="${imgSrc}">
          </div>
          <div class="mb-3">
        <select name="stage" id="${res[0].Id} "onchange="stateChange(this)">
            <option value="" selected>ToDo</option>
            <option value="hold">Hold</option>
            <option value="progress">Progress</option>
            <option value="completed">Completed</option>
        </select>
        </div>
        <div class="mb-3">
        <input type="submit" value="Add Todo" class="form-control btn btn-success">
        </div>
     </div>   
    </form>    
    </div>`;
  secondpopupdiv.innerHTML = demo;
}

