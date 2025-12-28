# task-manger-app
A task manager with CRUD method and drag and drop functionality using HTML/CSS/vanilla Js 
# Advanced Task Manager – Vanilla JavaScript

A browser-based task management application built with **pure JavaScript**, focused on clean state management, persistent storage, and real-world productivity features.

This project demonstrates how complex UI behavior can be handled without frameworks by relying on solid JavaScript fundamentals.

---

## Features

-  Create tasks with title, priority, and due date
-  Edit existing tasks
-  Mark tasks as completed
-  Delete tasks
-  Filter tasks (All, Today, Completed)
-  Drag and drop tasks to reorder them
-  Persistent storage using LocalStorage
-  Offline-first behavior

---

## JavaScript Concepts Demonstrated

-  State management with a single source of truth
-  Browser Storage APIs (LocalStorage)
-  DOM manipulation and event delegation
-  Drag and Drop API (dragstart, dragover, drop)
-  Array manipulation (`map`, `filter`, `findIndex`, `splice`)
-  Clean data-driven UI rendering
-  Separation of concerns (logic vs rendering)

---

## Drag & Drop Implementation

Tasks can be reordered using drag and drop.  
The implementation updates the underlying task array first, then re-renders the UI to keep DOM and state in sync.

Key concepts:

-  Unique task IDs
-  Preventing default browser behavior on dragover
-  Reordering data instead of directly manipulating the DOM

---

## Technologies Used

-  HTML5
-  CSS3
-  Vanilla JavaScript (ES6+)

No frameworks. No libraries.

---

## Storage Strategy

All tasks are stored in the browser using **LocalStorage**.  
The application automatically restores state on page reload.

---
