import {Projects, Task, projectArray} from './projects.js'

const projectButton = document.getElementById('project-add');
const projectList = document.getElementById("projects-list");
const Content = document.getElementById("content");

const Render = {
    displaySidebar: function(){
        
        while (projectList.firstChild)
        {
            projectList.removeChild(projectList.firstChild)
        }
        projectArray.forEach(function(element){
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const newButton = document.createElement('button'); 
            newButton.textContent = element.projectName;
            newButton.classList.add('project-name-button');

            const delButton = document.createElement('button'); //del button
            delButton.classList.add('del-button');

            delButton.textContent = 'x';

            delButton.addEventListener('click', function(){
                element.deleteproject(element);
                Render.displaySidebar();
            })
            const editButton = document.createElement('button'); //edit button
            
            editButton.textContent = '+';
            editButton.classList.add('edit-button')
            editButton.addEventListener('click', function(){
                element.editForm = true;
                Render.displaySidebar();
            })

            if(element.editForm === false){
                buttonContainer.append(newButton, editButton, delButton);
                newButton.textContent = element.projectName;
            }
            else{
                const projectForm = document.createElement('form');
        
                const buttonDiv = document.createElement('div');
                buttonDiv.classList.add('button-div');

                const inputForm = document.createElement('input');
                inputForm.value = element.projectName;
                const submitForm = document.createElement('button');

                submitForm.type = 'button';
                submitForm.textContent = 'Update';
                submitForm.setAttribute('type', 'button');
                submitForm.setAttribute('id', 'navform-submit');
                

                
                inputForm.setAttribute('class', 'nav-input')

                const cancelForm = document.createElement('button')
                cancelForm.textContent = 'Cancel';
                cancelForm.addEventListener('click',function(){
                    element.editForm = false;
                    Render.formDisplay();
                })

                cancelForm.setAttribute('type', 'button');
                cancelForm.setAttribute('id', 'navform-cancel');
                buttonDiv.append(submitForm, cancelForm);
                projectForm.append(inputForm, buttonDiv);
                
                buttonContainer.append(projectForm);

                submitForm.addEventListener('click',function(){
                    element.projectName = inputForm.value;
                    element.editForm = false;
                    console.log(element);
                    
                    Render.displaySidebar();
                })

            }
            

            newButton.addEventListener('click', function(){
                Render.projectIndividual(element);
            })

            if(element.projectName){
                projectList.append(buttonContainer);
            }
            
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
    },
    formDisplay: function(){
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
            
            if(inputForm.value){
                
                
                const tempProject = new Projects();
                
                tempProject.projectName = inputForm.value;
                tempProject.tasks = [{taskName: 'test', taskDescription: 'test'}]; //For Testing
                projectArray.push(tempProject);

                Render.displaySidebar();
                
            }
            
            projectList.removeChild(projectForm);

        })
        cancelForm.addEventListener('click', function(){
            projectList.removeChild(projectForm)
        })
    }
}

const domStuff = function(){
    
    projectButton.addEventListener('click', function(){
        Render.formDisplay();
        
    })
}

export {domStuff}