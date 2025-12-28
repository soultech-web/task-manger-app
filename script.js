'use strict';
//SECTION - TaskForm
const addTaskBtn = document.querySelector('#add-task-btn');
const textTitle = document.querySelector('#task-title');
const taskPriority = document.querySelector('#task-priority');
const date = document.querySelector('#task-deadline');
const confirmEdit = document.querySelector('.edit-id');
//SECTION - Fillters
const filter = document.querySelector('.filters');
//SECTION taskList
const taskList = document.querySelector('.tasks-list');

document.addEventListener('DOMContentLoaded', () => {
   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   const dates = new Date();
   const today = `${dates.getFullYear()}-${
      dates.getMonth() + 1
   }-${dates.getDate()}`;
   const saveTasks = (task) => {
      localStorage.setItem('tasks', JSON.stringify(task));
   };
   //!SECTION Reset Form
   const resetForm = () => {
      const form = document.querySelector('.task-form');
      const child = form.querySelectorAll('input');
      form.querySelector('select').value = 'low';
      child.forEach((ch) => {
         ch.value = '';
      });
      console.log(child);
   };

   //SECTION - DiaplayAllTasks
   let dragedId = null;
   const displayTasks = (task) => {
      taskList.innerHTML = '';
      task.forEach((task) => {
         const row = document.createElement('tr');
         row.classList.add(`${task.complete ? 'completed' : 'row'}`);
         row.draggable = 'true';
         row.dataset.row = task.id;
         row.innerHTML = `
            <td>${task.tittle}</td>
            <td class="priority ${task.priority}">${task.priority}</td>
            <td>${task.date}</td>
            <td>

                <button class="btn edit" data-key='${task.id}'>Edith</button>
                <button class="btn delete" data-key='${task.id}'>Delete</button>
                <button class='btn complete' data-key='${task.id}'>Completed </button>
            </td>
        `;
         //!SECTION drag event start
         row.addEventListener('dragstart', () => {
            dragedId = row.dataset.row;
         });

         row.addEventListener('dragover', (e) => {
            e.preventDefault();
         });

         row.addEventListener('drop', (e) => {
            e.preventDefault();
            const dropId = Number(row.dataset.row);
            if (dragedId === dropId) return;
            const dragedindex = tasks.findIndex(
               (r) => r.id === Number(dragedId),
            );
            const dropIndex = tasks.findIndex((r) => r.id === Number(dropId));
            const [cutDraged] = tasks.splice(dragedindex, 1);
            tasks.splice(dropIndex, 0, cutDraged);
            saveTasks(tasks);
            displayTasks(tasks);
         });

         row.addEventListener('dragend', () => {
            dragedId = null;
         });

         taskList.append(row);
      });
   };
   displayTasks(tasks);

   //!SECTION add tasks
   addTaskBtn.addEventListener('click', () => {
      if (!textTitle.value.trim() || !date.value) return;

      if (confirmEdit.value) {
         const confirmId = confirmEdit.value;
         const [editTask] = tasks.filter(
            (task) => task.id === Number(confirmId),
         );
         editTask.tittle = textTitle.value;
         editTask.priority = taskPriority.value;
         editTask.date = date.value;
         saveTasks(tasks);
         displayTasks(tasks);
         confirmEdit.value = '';
         resetForm();
      } else {
         const taskObj = {
            id: Date.now(),
            tittle: textTitle.value,
            priority: taskPriority.value,
            date: date.value,
            complete: false,
         };
         tasks.push(taskObj);
         saveTasks(tasks);
         displayTasks(tasks);
         resetForm();
      }
   });

   filter.addEventListener('click', (e) => {
      const filterBtn = e.target.dataset.filter;
      filter
         .querySelectorAll('button')
         .forEach((btn) => btn.classList.remove('active'));
      e.target.classList.add('active');
      if (filterBtn === 'today') {
         const dd = tasks.filter((tas) => tas.date === today);
         console.log(dd);
         if (dd.length > 0) displayTasks(dd);
         else displayTasks(tasks);
      } else if (filterBtn === 'completed') {
         const comp = tasks.filter((comp) => comp.complete);
         console.log(comp);
         if (comp.length > 0) displayTasks(comp);
         else displayTasks(tasks);
      } else {
         displayTasks(tasks);
      }
   });

   //!SECTION Action Buttons [edit,delete,complete]
   taskList.addEventListener('click', (e) => {
      const target = e.target;
      const data = target.dataset.key;
      if (target.classList.contains('edit')) {
         const [edit] = tasks.filter((task) => task.id === Number(data));
         textTitle.value = edit.tittle;
         taskPriority.value = edit.priority;
         date.value = edit.date;
         confirmEdit.value = edit.id;
      } else if (target.classList.contains('delete')) {
         tasks = tasks.filter((task) => task.id !== Number(data));
         saveTasks(tasks);
         displayTasks(tasks);
         resetForm();
      } else if (target.classList.contains('complete')) {
         const [item] = tasks.filter((task) => task.id === Number(data));
         console.log(item);
         item.complete = true;
         saveTasks(tasks);
         displayTasks(tasks);
      }
   });
});

const displayProfile = (user) => {
   if (user.profilePicture) {
      faceBook.addprofile.file[0] = user.profilePicture;
   } else {
      faceBook.addprofile.file[0] = '';
      user.checkmyprofile = `sorry this user is an Introvert 😊💻`;
   }
};
displayProfile('SoulTech👨🏽‍💻🧑🏽‍💻');
