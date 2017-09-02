const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const activeTodoList = "active_todos_list";
const completeTodoList = "complete_todos_list";
const deletedTodoList = "deleted_todos_list";


window.onload = getTodosAJAX();

//Function to hide/unhide completed or deleted todos
//Input - id of the completed/deleted div
function hideComplete(id){
    var ele = document.getElementById(id);
    var eleNew = "";
    if(id == "hideComplete"){
        eleNew = document.getElementById(completeTodoList);
    }
    else if(id == "hideDelete"){
        eleNew = document.getElementById(deletedTodoList);
    }
    //check if div is visible then hide the div
    //else make it visible
    if(ele.value == "0"){

        eleNew.style.visibility = 'hidden';
        ele.innerText = "Show items";
        ele.value = "1";
    }
    else{
        ele.value = "0";
        eleNew.style.visibility='visible';
        ele.innerText = "Hide items";
    }
}

//Function to add todos to a particular div

function addTodoElements(todos_data_json) {
    var todos = JSON.parse(todos_data_json); //parse the json data received
    var parent = document.getElementById(activeTodoList);//get access to active Todos div
    var completeTodoListId = document.getElementById(completeTodoList);//get access to completed Todos div
    var deletedTodoListId = document.getElementById(deletedTodoList);//get access to deleted todos div

    parent.innerHTML = "";
    completeTodoListId.innerHTML="";
    deletedTodoListId.innerHTML="";
    if (parent) {
        Object.keys(todos).forEach(
            function (key) {
                var todoElement = createTodoElement(key, todos[key]);
                if(todos[key].status == "ACTIVE"){
                    parent.appendChild(todoElement);
                }
                else if(todos[key].status == "COMPLETE"){
                    completeTodoListId.appendChild(todoElement);
                }
                else if(todos[key].status == "DELETED"){
                    deletedTodoListId.appendChild(todoElement);
                }
            }
        )
    }
}

function createTodoElement(id,todoObject){
    var todo_element = document.createElement("div");
    todo_element.innerText = todoObject.title;
    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class","todoStatus"+todoObject.status);

    if(todoObject.status == "ACTIVE" || todoObject.status == "COMPLETE"){
        var div = document.createElement("div");
        div.setAttribute("class","btn-group");
        div.setAttribute("data-toggle","buttons");
        div.addEventListener("click",function(){
            completeTodoAJAX(todoObject.status,id);
        });

        var label = document.createElement("label");
        if(todoObject.status == "ACTIVE"){
            label.setAttribute("class","btn btn-primary");
        }
        else{
            label.setAttribute("class","btn btn-primary active");
        }


        var completeButton = document.createElement("input");
        completeButton.type = "checkbox";

        var span = document.createElement("span");
        span.setAttribute("class","glyphicon glyphicon-ok");
        label.appendChild(completeButton);
        label.appendChild(span);
        div.appendChild(label);
        todo_element.insertBefore(div,todo_element.firstChild);

    }
    if(todoObject.status !="DELETED"){
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "x";
        deleteButton.setAttribute("onclick","deleteTodoAJAX("+id+")");
        deleteButton.setAttribute("class", "btn btn-danger btn-xs");
        deleteButton.setAttribute("id","deleteButton");
        todo_element.appendChild(deleteButton);
    }
    return todo_element;
}

function completeTodoAJAX(todoStatus,id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    if(todoStatus == "ACTIVE"){
        var data = "status=COMPLETE";
    }
    else if(todoStatus == "COMPLETE"){
        var data = "status=ACTIVE";
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                addTodoElements(xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);
}

function deleteTodoAJAX(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var data = "status=DELETED";

    xhr.onreadystatechange = function(){
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                addTodoElements(xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);

}


function addTodoAjax(){
    var title = document.getElementById("new_todo_input").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var data = "title=" + encodeURI(title);

    xhr.onreadystatechange = function(){
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                addTodoElements(xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);


}

function getTodosAJAX(){


    var xhr = new XMLHttpRequest();//create a request object

    xhr.open("GET","/api/todos",true);

    xhr.onreadystatechange = function() {
        //write code here that needs to be
        //executed after response

        //check if response received
        if (xhr.readyState == RESPONSE_DONE) {
            //Is response OK?
            //Status code == 200
            if (xhr.status == STATUS_OK) {
                //xhr.response
                //xhr.responseText
                console.log(xhr.responseText);
                addTodoElements(xhr.responseText);
            }
        }
    }

    xhr.send(data = null);
}