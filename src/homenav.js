import {isToday, startOfWeek, endOfWeek, isWithinInterval} from 'date-fns';
import {Projects, projectArray} from './projects.js';
import {contentBody} from './contentbody.js';

const todayTasks = new Projects("Today's Task");
const allTaskButton = document.getElementById('all-tasks')
const todayButton = document.getElementById('today');

const allTasks = new Projects("All Task's");

const checkDate = {
    checkToday: function(){
        while(todayTasks.tasks.length > 0){
            todayTasks.tasks.pop();
        }
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
        while(allTasks.tasks.length > 0){
            allTasks.tasks.pop();
        }
        projectArray.forEach(function(project){
            project.tasks.forEach(function(task){
                allTasks.tasks.push(task);
                console.log(project.tasks);
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

    }
}
    


export{Render}