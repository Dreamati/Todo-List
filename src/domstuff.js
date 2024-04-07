import {Projects, Task, projectArray} from './projects.js'
import {contentBody} from './contentbody.js'

const projectButton = document.getElementById('project-add');
const projectList = document.getElementById("projects-list");


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
                    contentBody.projectIndividual(element);
                    Render.displaySidebar();
                })

            }
            

            newButton.addEventListener('click', function(){
                contentBody.projectIndividual(element);
            })

            if(element.projectName){
                projectList.append(buttonContainer);
            }
            
        });
        

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
                tempProject.tasks = [{taskName: 'Chest', taskDescription: 'Chest Workout', dueDate: '10-04-2024', editForm:false}]; //For Testing
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