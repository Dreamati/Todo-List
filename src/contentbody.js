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
    
    const projectNameDisplay = document.createElement('h2'); //Project Name Display
    projectNameDisplay.textContent = project.projectName;
        
    Content.append(taskDisplayDiv, taskButtonDiv); 
    Content.insertBefore(projectNameDisplay, Content.firstChild);
    
    
    project.tasks.forEach((task)=>{
        
        const taskContainer = document.createElement('div'); //task Container
        taskDisplayDiv.append(taskContainer)
        

        const taskCheckbox = document.createElement('input');//checkbox added
        taskCheckbox.setAttribute('type', 'checkbox');
        taskCheckbox.classList.add('task-checkbox');
        if(task.isComplete)
        {
            taskCheckbox.checked = true;
        }

        taskCheckbox.addEventListener('change', function() { //checbox functionality
            if (this.checked) {
            console.log("Checkbox is checked..");
            task.isComplete = true;

            } else {
            console.log("Checkbox is not checked..");
            task.isComplete = false;
            }
            projectIndividual(project);
        });

        const taskName = document.createElement('h3'); //task Name
        taskName.textContent = task.taskName;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.taskDescription;

        const taskDate = document.createElement('p');
        taskDate.textContent = task.dueDate;

        if(task.isComplete)
        {
            taskName.classList.add('strike-out');
            taskDescription.classList.add('strike-out');
            taskDate.classList.add('strike-out');
        }
        else{
            taskName.classList.remove('strike-out');
            taskDescription.classList.remove('strike-out');
            taskDate.classList.remove('strike-out');
        }

        const changeButton = document.createElement('div'); //container

        const delButton = document.createElement('button');//delete button for tasks
        delButton.textContent = 'x';

        delButton.addEventListener('click', function(){
            task.isDeleted = true;
            task.removeTask();
            const index = project.tasks.indexOf(task);
            if (index > -1) { // only splice array when item is found
                project.tasks.splice(index, 1); // 2nd parameter means remove one item only
            }
            projectIndividual(project);
        })

        


        const editButton = document.createElement('button');//edit button for tasks
        editButton.textContent = '+';
        editButton.addEventListener('click', function(){
            task.editForm = true;
            projectIndividual(project);
        })
        const starShape = document.createElement('input');
        starShape.type = 'checkbox';
        starShape.classList.add('star-shape')

        if(!task.editForm){
            changeButton.append(starShape, editButton, delButton)
            taskContainer.append(taskCheckbox, taskName, taskDescription, taskDate, changeButton);
        }
        else {
            taskContainer.append(editFormButton(task, project));
        }
        taskContainer.classList.add('task-container');   
            

    });
    if(!project.home){
        addTaskButton(project);
    }
    
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
    titleInput.placeholder = 'Enter title (required)';
    titleInput.required = true;

    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.placeholder = 'Enter description';
    descriptionInput.setAttribute("required", "");

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';

    // Create buttons
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click',function(){
        if(titleInput.value && dateInput.value){
            const newTask = new Task(titleInput.value, descriptionInput.value, dateInput.value);
            project.tasks.push(newTask);
            console.log(project);
            projectIndividual(project);
        }
        else{
            if(taskForm.getElementsByTagName('p').length>0){
                taskForm.removeChild(taskForm.getElementsByTagName('p')[0]);
            }
            
            const warn = document.createElement('p');
            warn.textContent = "*Please Enter Date And/Or Title";
            warn.style.color = "red";
            taskForm.insertBefore(warn, submitButton);
            
        }

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
    Content.insertBefore(taskForm, Content.lastChild);

}

const editFormButton = function(task, project){
    const taskForm = document.createElement('form');
    taskForm.id = 'edit-task-form'; // Assign an ID for later reference

  // Create input elements
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.value = task.taskName;

    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.value = task.taskDescription;

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    dateInput.value = task.dueDate;

    // Create buttons
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click',function(){
        task.taskName = titleInput.value;
        task.taskDescription = descriptionInput.value;
        task.dueDate =  dateInput.value;
        task.editForm = false;
        projectIndividual(project);

  })

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        task.editForm = false;
        projectIndividual(project);
    });

    // Append elements to the form
    taskForm.appendChild(titleInput);
    taskForm.appendChild(descriptionInput);
    taskForm.appendChild(dateInput);
    taskForm.appendChild(submitButton);
    taskForm.appendChild(cancelButton);
    return (taskForm);
}

return({projectIndividual})
})()

export{contentBody}