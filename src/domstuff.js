import {Projects, Task} from './projects.js'

const projectButton = document.getElementById('project-add');
const projectList = document.getElementById("projects-list");
const Content = document.getElementById("content")

const Render = {
    projectSidebar: function(projects){
        
        while (projectList.firstChild)
        {
            projectList.removeChild(projectList.firstChild)
        }
        projects.array.forEach(element => {
            newButton = document.createElement('button'); 
            newButton.textContent = element;
            projectList.append(newButton);
        });
        

    },
    projectIndividual : function(project){
        project.tasks.forEach((task)=>{
            while (Content.firstChild) {
                Content.removeChild(Content.firstChild);
                
            }
            const projectNameDisplay = document.createElement('h2'); //Project Name Display
            projectNameDisplay.textContent = project.projectName;
            Content.append(projectNameDisplay);

            const taskContainer = document.createElement('div'); //task Container

            const taskName = document.createElement('h3'); //task Name
            taskName.textContent = task.taskName;

            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.taskDescription;

            const taskDate = document.createElement('p');
            taskDate.textContent = task.dueDate;

            taskContainer.append(taskName);
            taskContainer.append(taskDescription);
            taskContainer.append(taskDate);

            Content.append(taskContainer);

        })
    }
}

const domStuff = function(){
    
    projectButton.addEventListener('click', function(){
        const projectForm = document.createElement('form');
        
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-div');

        const inputForm = document.createElement('input');
        const submitForm = document.createElement('button')
        submitForm.type = 'button';
        submitForm.textContent = 'Submit';
        submitForm.setAttribute('type', 'button');
        submitForm.setAttribute('id', 'navform-submit');
        inputForm.setAttribute('placeholder', 'Project Name')
        inputForm.setAttribute('class', 'nav-input')

        const cancelForm = document.createElement('button')
        cancelForm.textContent = 'Cancel';
        cancelForm.setAttribute('type', 'button');
        cancelForm.setAttribute('id', 'navform-cancel');

        buttonDiv.append(submitForm);
        buttonDiv.append(cancelForm);

        projectForm.append(inputForm);
        projectForm.append(buttonDiv);

        projectList.append(projectForm);

        submitForm.addEventListener('click', function(){
            const projectName = document.createElement('button');
            projectName.textContent = inputForm.value;
            
            if(inputForm.value){
                projectList.append(projectName);
                const tempProject = new Projects();
                tempProject.projectName = projectName.textContent;
                tempProject.tasks = [{taskName: 'test', taskDescription: 'test'}]; //For Testing

                projectName.addEventListener('click', function(){
                    Render.projectIndividual(tempProject);
                })
    
            }
            
            projectList.removeChild(projectForm);

        })
        cancelForm.addEventListener('click', function(){
            projectList.removeChild(projectForm)
        })
        
    })
}

export {domStuff}