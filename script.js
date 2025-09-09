let add = document.querySelector('.add');
let input = document.querySelector('.input');
let tasks = document.querySelector('.tasks');
let hide = document.getElementById('hide')


// The array including tasks
let array = [];

// when we do reload (localStorage)
if (localStorage.getItem('task')) {
    array = JSON.parse(localStorage.getItem('task'));
}





getDataFromLocalStorage()


// clicked on button add
add.onclick = function () {
    showContent(input);
    input.value = '';
   
   hide.classList.add('hide')

}



// show the tasks
function showContent(input) {
    if (input.value !== '') {
        let task = {
            title: input.value,
            id: Date.now(),
            completed: false,
        }
        // push the task in the array
        array.push(task);

        showContentToPage(array);

        addTasksToLocalStorage(array)
    }

}


// clicked button delete
tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('del')) {
        // remove element from page
        e.target.parentElement.remove();

        // remove task from LocalStorage
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'))

    }
   // task element
   if (e.target.classList.contains('task')) {
    // toggle completed for the class
    toggleStatusTask(e.target.getAttribute('data-id'))
    //    toggle done class
    e.target.classList.toggle('done');
    
}
})



function toggleStatusTask(taskId) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == taskId) {
            array[i].completed == false
                ? array[i].completed == true
                : array[i].completed == false;
        }
    }

    addTasksToLocalStorage(array);
}








function deleteTaskWith(taskId) {
    array = array.filter((task) => task.id != taskId);
    addTasksToLocalStorage(array);
}






function showContentToPage(array) {
    // Empty the array
    tasks.innerHTML = '';
    // create elements ::::
    array.forEach((task) => {
        // create div
        let div = document.createElement('div')
        div.className = 'task';
        // if the task is done
        if (task.completed === true) {
            div.className = 'task done';
        }
        div.setAttribute('data-id', task.id);
        div.appendChild(document.createTextNode(task.title))
        // create button delete
        let span = document.createElement('span');
        span.className = 'del';
        span.appendChild(document.createTextNode('Delete'))
        div.appendChild(span);

        // append div.task in the tasks
        tasks.appendChild(div);
    })
}


 


function addTasksToLocalStorage() {
    localStorage.setItem('task', JSON.stringify(array))
}


function getDataFromLocalStorage() {
    let data = localStorage.getItem('task');
    if (data) {
        let tasks = JSON.parse(data);
        showContentToPage(tasks)
    }
}