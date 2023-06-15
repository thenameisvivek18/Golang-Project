console.log("hii");

async function stateChange(data) {
    console.log("qwertyyuu");
    console.log("state:::", data.value);
    let id = data.id;
    let value = data.value;
    let todos = "";
    console.log("id outer :- ", id);
    if (value == "hold") {
        console.log(`/update?id=${id}&stage=${value}`);
        let res = await fetch(`/update?id=${id}&stage=${value}`);
        let ans = await res.json();
        console.log("data main:- ", ans);
        console.log("id", ans[0].Id)
        var div = document.getElementById("hold");
        console.log("div tag:- ", document.getElementById(ans[0].Id))
        document.getElementById(ans[0].Id).remove();
        todos = `<div class="card mb-3 hold" style="width: 15rem;" id="${ans[0].Id}">
        <img src="./public/images/todo.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${ans[0].Todoname}</h5>
          <p class="card-text">${ans[0].Tododesc}</p>
          <select name="stage" id="${ans[0].Id}" onchange="stateChange(this)" class="select-design">
            <option value="" selected disabled>Move to</option>
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
        console.log("data :- ", ans);
        console.log("id", ans[0].Id);
        var div = document.getElementById("progress");
        document.getElementById(ans[0].Id).remove();
        todos = `<div class="card mb-3 prog" style="width: 15rem;" id="${ans[0].Id}">
        <img src="./public/images/todo.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${ans[0].Todoname}</h5>
          <p class="card-text">${ans[0].Tododesc}</p>
          <select name="stage" id="${ans[0].Id}" onchange="stateChange(this)" class="select-design">
            <option value="" selected disabled>Move to</option>
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
        todos = `<div class="card mb-3 completed" style="width: 15rem;" id="${ans[0].Id}">
        <img src="./public/images/todo.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${ans[0].Todoname}</h5>
          <p class="card-text">${ans[0].Tododesc}</p>
          <select name="stage" id="${ans[0].Id}" onchange="stateChange(this)" class="select-design">
            <option value="" selected disabled>Move to</option>
            <option value="hold">On Hold</option>
            <option value="progress">Progress</option>
          </select>
        </div>
    </div>`;
        div.innerHTML += todos;
    }
}
