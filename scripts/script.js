document.addEventListener("DOMContentLoaded", () => {
  // Icons
  const sunIcon = document.querySelector("#sun");
  const moonIcon = document.querySelector("#moon");

  // Theme Variables
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Icon Toggling
  const iconToggle = () => {
    moonIcon.classList.toggle("display-none");
    sunIcon.classList.toggle("display-none");
  };

  // Initial Theme Check
  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      moonIcon.classList.add("display-none");
      return;
    }
    sunIcon.classList.add("display-none");
  };

  // Manual Theme Switch
  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      iconToggle();
      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    iconToggle();
  };

  // Call Theme Switch on clicking buttons
  sunIcon.addEventListener("click", () => {
    themeSwitch();
  });

  moonIcon.addEventListener("click", () => {
    themeSwitch();
  });

  // Invoke theme check on initial load
  themeCheck();

  const nameInput = document.querySelector("#name");
  const addBtn = document.getElementById("addBtn");
  // const view = document.getElementById("view");
  const clearBtn = document.getElementById("clearBtn");
  const deleteModal = document.getElementById("deleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  // const username = localStorage.getItem('username') || '';

  // nameInput.value = username;

  // nameInput.addEventListener('change', e => {
  //     localStorage.setItem('username', e.target.value);
  // })

  // var isRotated = false;
  // view.addEventListener('click', () => {
  //     if (view.classList.contains('rotate-on-click1')) {
  //         todoList.classList.remove("hidden");
  //             // view.classList.remove('rotate-on-click1');
  //             view.classList.add('rotate-on-click2');
  //     } else {
  //         view.classList.add("rotate-on-click1");
  //         todoList.classList.add("hidden");
  //     }
  //     // if (todos.length !== 0) {
  //     //     todoList.classList.remove('hidden');
  //     // }
  //     // else{
  //     //     todoList.classList.add('hidden');
  //     // }

  //     // if (view.classList.contains('rotate-on-click')) {
  //     //     todoList.classList.add('hidden');
  //     // }
  // });

  const buttonBusiness = document.getElementById("radioBusiness");
  const buttonPersonal = document.getElementById("radioPersonal");

  buttonBusiness.addEventListener("click", (e) => {
    // Select the input tag of type radio having the Id 'business'
    const business = document.getElementById("business");

    business.click();
  });

  buttonPersonal.addEventListener("click", (e) => {
    // Select the input tag of type radio having the Id 'personal'
    const business = document.getElementById("personal");

    personal.click();
  });

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoList = document.querySelector("#todo-list");

  // Display the Todo List
  function displayTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const todoItem = document.createElement("div");
      todoItem.className = 'animate-fadeInDown flex justify-between mb-2 p-10"';

      if (todo.category == "business") {
        todoItem.innerHTML = `<p class="mt-2
                 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 max-w-xs [#527CAC]">${todo.content}</p>
                <button data-index="${index}" class="mt-2 px-1.5 h-8 rounded-md bg-red-500 hover:opacity-75 sm:hover:opacity-100 sm:hover:scale-105 duration-200 shadow-xl text-white delete-button">Delete</button>`;
        todoList.appendChild(todoItem);
      } else {
        todoItem.innerHTML = `<p class="mt-2 
                text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">${todo.content}</p>
                <button data-index="${index}" class="mt-2 px-1.5 h-8 rounded-md bg-red-500 hover:opacity-75 sm:hover:opacity-100 sm:hover:scale-105 duration-200 shadow-xl text-white delete-button">Delete</button>`;
        todoList.appendChild(todoItem);
      }
    });

    updateLocalStorage();
  }

  function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Submit Todo
  addBtn.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default behaviour of the 'submit' event

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    if (todo.content.trim() !== "") {
      todos.push(todo);
      updateLocalStorage();
    }

    e.target.reset(); // Reset the form

    displayTodos();
  });

  // Delete a Todo
  todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      todos.splice(index, 1);
      updateLocalStorage();
      displayTodos();
    }
  });

  // Function to display the modal
  function showModal() {
    deleteModal.classList.remove("hidden");
  }

  // Function to hide the modal
  function hideModal() {
    deleteModal.classList.add("hidden");
  }

  // Event listener to show the modal when clicking the "Clear" button
  clearBtn.addEventListener("click", () => {
    showModal();
  });

  // Event listener to confirm and delete all to-dos
  confirmDeleteBtn.addEventListener("click", () => {
    todos.length = 0; // Clear the todos array
    updateLocalStorage();
    hideModal(); // Hide the modal
    displayTodos(); // Update the UI
  });

  // Event listener to cancel and hide the modal
  cancelDeleteBtn.addEventListener("click", () => {
    hideModal(); // Hide the modal
  });

  displayTodos();
});
