let taskInput = document.getElementById("task-input");
let taskSubmit = document.getElementById("submit");
let task_list_pointer = document.getElementById("task-list");

// Custom function to make a method remove(), this function
// takes an input and then remove that input from the array.
Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};


const taskList = new Array();

function addToTaskList(value) {
  let li = document.createElement("li");

  let paragraph = document.createElement("p");
  paragraph.classList.add("visible");
  paragraph.classList.add("undone");
  paragraph.innerText = value;

  let input = document.createElement("input");
  input.type = "text";
  input.classList.add("hidden");
  input.classList.add("input-field");

  let updateButton = document.createElement("button");
  updateButton.classList.add("hidden");
  updateButton.classList.add("update-button");
  updateButton.innerText = "UPDATE";

  let editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.innerHTML = '<i class="fa fa-edit"></i>';

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  
  let doneButton = document.createElement("button");
  doneButton.classList.add("done-button");
  doneButton.innerHTML = '<i class="fa fa-check"></i>';

  li.appendChild(paragraph);
  li.appendChild(input);
  li.appendChild(updateButton);
  li.appendChild(doneButton);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  taskList.push(li);





  doneButton.addEventListener("click", (e) => {
    e.preventDefault();
    let parent = doneButton.parentElement;
    let paragraph = parent.querySelector(".undone");

    if(paragraph===null)
    {
      paragraph = parent.querySelector(".done");
      paragraph.classList.remove("done");
      paragraph.classList.add("undone");
    }
    else{
      paragraph.classList.remove("undone");
      paragraph.classList.add("done");
    }
  });

  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    let parent = deleteButton.parentElement;
    let grandParent = parent.parentElement;
    grandParent.removeChild(parent);
    taskList.remove(parent);
  });

  editButton.addEventListener("click", (e) => {
    e.preventDefault();

    let parent = editButton.parentElement;
    let paragraph = parent.querySelector(".visible");
    paragraph.classList.add("hidden");
    paragraph.classList.remove("visible");

    let input = parent.querySelector(".input-field");

    input.classList.add("visible");
    input.classList.remove("hidden");

    let update = parent.querySelector(".update-button");

    update.classList.add("visible");
    update.classList.remove("hidden");


    editButton.style.display="none";

    updateButton.addEventListener("click", (e) => {
      e.preventDefault();
      do {

        paragraph.innerText = input.value;

        paragraph.classList.add("visible");
        paragraph.classList.remove("hidden");


        input.classList.add("hidden");
        input.classList.remove("visible");
        update.classList.add("hidden");
        update.classList.remove("visible");
        editButton.style.display="block";

      } while (input.value === "");
      updateScreen();
    });
  });
}

taskSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (taskInput.value !== "") {
    addToTaskList(taskInput.value);
    taskInput.value = "";
  }

  updateScreen();
});

function updateScreen() {
  for (let i = 0; i < taskList.length; i++) {
    task_list_pointer.appendChild(taskList[i]);
  }
}
