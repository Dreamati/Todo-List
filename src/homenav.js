import {isToday, startOfWeek, endOfWeek, isWithinInterval} from 'date-fns';
import {Projects, projectArray} from './projects.js';
import {contentBody} from './contentbody.js';


const allTaskButton = document.getElementById('all-tasks')
const todayButton = document.getElementById('today');
const weekButton = document.getElementById('this-week');

const todayTasks = new Projects("Today's Task", true);
const allTasks = new Projects("All Task's", true);
const weekTasks = new Projects("This Week's Task", true);

const checkDate = {
    checkToday: function(){
        emptyTasks.empty(todayTasks);

        projectArray.forEach(function(project){
            project.tasks.forEach(function(task){
                if(isToday(task.dueDate))
                {
                    todayTasks.tasks.push(task);
                    console.log(project.tasks);
                }
            })
        })
    },
    allTasks: function(){
        emptyTasks.empty(allTasks);

        projectArray.forEach(function(project){
            project.tasks.forEach(function(task){
                allTasks.tasks.push(task);
                console.log(project.tasks);
            })
        })
    },
    checkWeek : function(){
        emptyTasks.empty(weekTasks);

        projectArray.forEach(function(project){
            project.tasks.forEach(function(task){
                const taskdueDate = new Date(task.dueDate); // Replace with desired date

                // Get the start and end of the current week (considering Sunday as the first day)
                const start = startOfWeek(new Date());
                const end = endOfWeek(new Date());

                console.log(isWithinInterval(taskdueDate, { start, end }));
                console.log(taskdueDate, start, end);

                if(isWithinInterval(taskdueDate, { start, end }))
                {
                    weekTasks.tasks.push(task);
                    console.log(project.tasks);
                }
            })
        })


    }
}
const Render = {
    renderToday: function(){
        todayButton.addEventListener('click',function(){
            checkDate.checkToday();
            console.log(todayTasks);
            contentBody.projectIndividual(todayTasks);
        })
    },
    renderAll : function(){
        allTaskButton.addEventListener('click', function(){
            checkDate.allTasks();
            contentBody.projectIndividual(allTasks);
        })

    },
    renderWeek : function(){
        weekButton.addEventListener('click', function(){
            checkDate.checkWeek();
            console.log(weekTasks);
            contentBody.projectIndividual(weekTasks);
        })
    }
};
const emptyTasks ={
    empty : function (project){
        while(project.tasks.length > 0){
            project.tasks.pop();
        }
    }
} 
    


export{Render}