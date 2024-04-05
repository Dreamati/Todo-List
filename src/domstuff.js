const projectButton = document.getElementById('project-add');
const projectList = document.getElementById("projects-list");

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
        

    }
}

const domStuff = function(){
    console.log('hi');
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
            const projectName = document.createElement('p');
            projectName.textContent = inputForm.value;

            projectList.append(projectName);
            projectList.removeChild(projectForm);

        })
        cancelForm.addEventListener('click', function(){
            projectList.removeChild(projectForm)
        })
        
    })
}

export {domStuff}