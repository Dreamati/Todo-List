const projectArray = [];

class Projects {
    constructor(projectName, home = false){
        this.tasks = [];
        this.projectName = projectName;
        this.editForm = false;
        this.home = home;
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
        this.isDeleted = false;

    }
    removeTask(){
        projectArray.forEach(function(project){
            project.tasks.forEach(function(task){
                if(task.isDeleted){
                    const index = project.tasks.indexOf(task);
                    if (index > -1) { // only splice array when item is found
                        project.tasks.splice(index, 1); // 2nd parameter means remove one item only
                    }
                }
            })
        })
    }
}

export{Projects, Task, projectArray}