const taskInput = document.getElementById("textInput");
const taskList = document.getElementById("list");
const taskAdd = document.getElementById("addTask");
const totalCount = document.getElementById("totalCount");
const completeCountShow = document.getElementById("completeCount");
const pendingCountShow = document.getElementById("pendingCount");
let count = 0;
let completeCount = 0;
let pendingCount = 0;

taskAdd.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return alert("Enter your task");

  const li = document.createElement("li");
  li.className =
    "bg-fuchsia-700 py-2 rounded-2xl flex justify-around items-center md:flex-row md:gap-5 gap-3 flex-col mt-2 border-b-2 border-sky-400 text-white";

  const index = document.createElement("h1");
  index.style.fontSize = "25px";
  index.innerHTML = count + 1;

  const span = document.createElement("span");
  span.className = " font-mono capitalize";
  span.textContent = text;

  const p = document.createElement("p");
  p.style.display = "inline";
  let newDate = new Date();
  p.innerHTML = `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;

  const complete = document.createElement("input");
  complete.setAttribute("type", "checkbox");
  complete.classList.add("checkBox");
  complete.style.cursor = "pointer";

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn-edit");
  editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-delete");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash-arrow-up"></i>`;

  // complete checkbox
  complete.addEventListener("click", function () {
    span.classList.toggle("checked");
    p.classList.toggle("checked");
    index.classList.toggle("checked");
    console.dir(complete);
    if (complete.checked === false) {
      completeCount -= 1;
      completeCountShow.innerHTML = completeCount;
      pendingCount += 1;
      pendingCountShow.innerHTML = pendingCount;
    } else {
      completeCount += 1;
      completeCountShow.innerHTML = completeCount;
      pendingCount -= 1;
      pendingCountShow.innerHTML = pendingCount;
    }
  });

  // edit
  editBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const newTaskText = prompt("Edit your task:", span.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      span.textContent = newTaskText.trim();
    }
  });

  // delete
  deleteBtn.addEventListener("click", function () {
    li.remove();
    count -= 1;
    totalCount.innerHTML = count;

    if (complete.checked === true) {
      completeCount -= 1;
      completeCountShow.innerHTML = completeCount;
    } else {
      pendingCount -= 1;
      pendingCountShow.innerHTML = pendingCount;
    }
  });

  li.appendChild(index);
  li.appendChild(span);
  li.appendChild(p);
  li.appendChild(complete);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();
  count += 1;
  totalCount.innerHTML = count;
  pendingCount += 1;
  pendingCountShow.innerHTML = pendingCount;
}