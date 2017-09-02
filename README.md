# Project Title
A simple Todo App which lets you add ,delete or complete todos.

## Getting Started
These instructions will help you to get a copy of project to run on your local machine.

### Prerequisites
Install Node on your machine

Install all the dependencies using:
```
npm install
```

## Running the sample
Change the path in Node Command prompt to your project directory.
Use the following command to run your project
```
nodemon index.js
```
Open the browser
```
localhost:3000
```
This app has four sections:
* Active Todos-Displays the list of active todos
* Add Todo- To add new todo.
* Complete Todos-Displays the list of completed todos
* Deleted Todos-Displays the list of deleted todos.

To mark an active todo as complete todo click the checkbox button on left of todo.
Clicking the checkbox on left of completed todo makes the todo active again.
Cross button marks the todo as deleted.

### REST End Points
The server implementation supports GET,PUT,POST AND DELETE request methods.

GET request- Gets all todos
```
GET \api\todos
```
PUT request- Update a todo
```
PUT \api\todos\:id
```
POST request- Adds a new Todo
```
POST \api\todos
```
DELETE request-Marks a todo deleted
```
DELETE \api\todos\:id
```
You can add some additional end points also.

## Built with
* Node.js
* AJAX
* Javascript
* HTML/CSS

## Author
* **Gaurav Narang**

