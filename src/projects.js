class Projects {
    constructor(projectName){
        this.tasks = [];
        this.projectName = projectName;

    }
    deleteTask(){

    }
}

class Task {
    constructor(taskName, taskDescription, dueDate){
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.dueDate = dueDate

    }
}

export{Projects, Task}