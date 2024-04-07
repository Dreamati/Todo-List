const projectArray = [];

class Projects {
    constructor(projectName){
        this.tasks = [];
        this.projectName = projectName;
        this.editForm = false;
    }
    deleteTask(){

    }

    deleteproject(obj){
        projectArray.forEach(function(element){
            console.log(element.projectName);
            
            if(element.projectName === obj.projectName){
                const index = projectArray.indexOf(element);
                if (index > -1) { // only splice array when item is found
                projectArray.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
        })
    }
}

class Task {
    constructor(taskName, taskDescription, dueDate){
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.dueDate = dueDate;
        this.isComplete = false;
        this.editForm = false;

    }
}

export{Projects, Task, projectArray}