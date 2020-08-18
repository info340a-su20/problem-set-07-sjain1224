'use strict';

/* your code goes here! */

class Task {

  constructor(newDescString, newIsComplete){
    this.descString = newDescString;
    this.isComplete = newIsComplete;
  }

  render() {
    let elem = document.createElement('li');
    elem.textContent = this.descString;

    if(this.isComplete){
      elem.classList.add('font-strike');
    }

    elem.addEventListener('click', () => {
      this.toggleFinished();
      elem.classList.toggle('font-strike');
    })
    
    return elem;
  }

  toggleFinished() {
    this.isComplete = !this.isComplete;
  }
}

class TaskList {

  constructor(taskArray){
    this.tasks = taskArray;
  }

  addTask(description) {
    let newTask = new Task(description, false);
    this.tasks.push(newTask);
  }

  render(){
    let olElem = document.createElement('ol');
    this.tasks.forEach((taskObj) => {
      let taskElem = taskObj.render();
      olElem.appendChild(taskElem);
    })
    return olElem;
  }
}

class NewTaskForm {

  constructor(funcWhenSubmitted) {
    this.submitCallback = funcWhenSubmitted;
  }

  render() {
    let formElem = document.createElement('form');

    let inputElem = document.createElement('input');
    inputElem.classList.add('form-control', 'mb-3');
    inputElem.setAttribute('placeholder', "What else do you have to do?");
    formElem.appendChild(inputElem);

    let btnElem = document.createElement('button');
    btnElem.classList.add('btn', 'btn-primary');
    btnElem.textContent = "Add task to list";
    formElem.appendChild(btnElem);

    btnElem.addEventListener('click', (event) => {
      event.preventDefault();

      let inputValue = inputElem.value;

      let whatToDo = this.submitCallback;
      whatToDo(inputValue);
    })

    return formElem;
  }
}

class App {

  constructor(parent, list) {
    this.parentElem = parent;
    this.taskList = list;
  }

  render() {
    let listElem = this.taskList.render();
    this.parentElem.appendChild(listElem);
    let whichToCall = (arg) => this.addTaskToList(arg);
    let formObj = new NewTaskForm(whichToCall);
    this.parentElem.appendChild(formObj.render());
  }

  addTaskToList(descString) {
    this.taskList.addTask(descString);
    this.parentElem.innerHTML = '';
    this.render();
  }
}

let taskListObj = new TaskList([
  new Task('Make some classes', true),
  new Task('Arrow some functions', false)
]);


let appElem = document.querySelector('#app');
let appObj = new App(appElem, taskListObj);
appObj.render();



//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}