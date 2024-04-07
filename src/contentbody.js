const Content = document.getElementById("content");

import {Projects, Task, projectArray} from './projects.js'

const contentBody = (function(){
const projectIndividual = function(project){
    while (Content.firstChild) {
        Content.removeChild(Content.firstChild);
        
    }

    const taskDisplayDiv = document.createElement('div');
    taskDisplayDiv.id = 'task-display';
    const taskButtonDiv = document.createElement('div');
    taskButtonDiv.id = 'task-button-div';
    Content.append(taskDisplayDiv, taskButtonDiv);
    const projectNameDisplay = document.createElement('h2'); //Project Name Display
        projectNameDisplay.textContent = project.projectName;
        Content.insertBefore(projectNameDisplay, Content.firstChild);

    ;
    
    project.tasks.forEach((task)=>{
        
        const taskContainer = document.createElement('div'); //task Container
        taskDisplayDiv.append(taskContainer)

        const taskCheckbox = document.createElement('input');
        taskCheckbox.setAttribute('type', 'checkbox');
        taskCheckbox.classList.add('task-checkbox');

        const taskName = document.createElement('h3'); //task Name
        taskName.textContent = task.taskName;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.taskDescription;

        const taskDate = document.createElement('p');
        taskDate.textContent = task.dueDate;

        taskContainer.append(taskCheckbox, taskName, taskDescription, taskDate);
        taskContainer.classList.add('task-container');

        
        // taskDisplayDiv.append(taskDescription);
        // taskDisplayDiv.append(taskDate);

        // taskDisplayDiv.append(taskContainer);
        

    });
    addTaskButton(project);
};
const addTaskButton = function(project){
    const taskButtonDiv = document.getElementById('task-button-div');

    const taskButton = document.createElement('button');
    taskButton.textContent = '+ Add Task';
    taskButton.classList.add('task-button')
    taskButtonDiv.append(taskButton);
    taskButton.addEventListener('click', function(){
        taskCreateForm(project);
    })
    

};
function taskCreateForm(project){
    const taskForm = document.createElement('form');
    taskForm.id = 'myForm'; // Assign an ID for later reference

  // Create input elements
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.placeholder = 'Enter title';

  const descriptionInput = document.createElement('textarea');
  descriptionInput.name = 'description';
  descriptionInput.placeholder = 'Enter description';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.name = 'date';

  // Create buttons
  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click',function(){
        const newTask = new Task(titleInput.value, descriptionInput.value, dateInput.value);
        project.tasks.push(newTask);
        console.log(project);
        projectIndividual(project);

  })

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => {
    Content.removeChild(taskForm);
    // Handle cancel action (e.g., remove the form or prompt for confirmation)
  });

  // Append elements to the form
  taskForm.appendChild(titleInput);
  taskForm.appendChild(descriptionInput);
  taskForm.appendChild(dateInput);
  taskForm.appendChild(submitButton);
  taskForm.appendChild(cancelButton);
  Content.append(taskForm);

}
return({projectIndividual})
})()

export{contentBody}