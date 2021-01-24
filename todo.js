// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const todoForm = document.querySelector(".todoForm"),
  todoInput = todoForm.querySelector("input"),
  UFList = document.querySelector(".unfinishedList"),
  FList = document.querySelector(".finishedList");

const UF_LS = "unfinishedList";
const F_LS = "finishedList";

let UFTodos = [];
let FTodos = [];

let UFidNumbers = 0;
let FidNumbers = 0;

function loadList() {
  const loadedUFTodos = localStorage.getItem(UF_LS);
  const loadedFTodos = localStorage.getItem(F_LS);

  if (loadedUFTodos !== null) {
    const parsedUFTodos = JSON.parse(loadedUFTodos);
    parsedUFTodos.forEach(function (todo) {
      paintUFTodo(todo.text);
    });
  }

  if (loadedFTodos !== null) {
    const parsedFTodes = JSON.parse(loadedFTodos);
    parsedFTodes.forEach(function (todo) {
      paintFTodo(todo.text);
    });
  }
}

function paintUFTodo(text) {
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  const check = document.createElement("button");
  const span = document.createElement("span");
  const newId = UFidNumbers;
  UFidNumbers += 1;

  delbtn.innerText = "✖";
  check.innerText = "✔";
  span.innerText = text;

  delbtn.addEventListener("click", delUFTodo);
  check.addEventListener("click", finishTodo);

  li.appendChild(span);
  li.appendChild(delbtn);
  li.appendChild(check);
  li.id = newId;
  li.classList.add("list");
  UFList.appendChild(li);

  const UFObj = {
    text: text,
    id: newId,
  };

  UFTodos.push(UFObj);
  saveUFTodo();
}

function saveUFTodo() {
  localStorage.setItem(UF_LS, JSON.stringify(UFTodos));
}

function paintFTodo(text) {
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  const undo = document.createElement("button");
  const span = document.createElement("span");
  const newId = FidNumbers;
  FidNumbers += 1;

  delbtn.innerText = "✖";
  undo.innerText = "↩";
  span.innerText = text;

  delbtn.addEventListener("click", delFTodo);
  undo.addEventListener("click", returnTodo);

  li.appendChild(span);
  li.appendChild(undo);
  li.appendChild(delbtn);
  li.id = newId;
  li.classList.add("list");
  FList.appendChild(li);

  const FObj = {
    text: text,
    id: newId,
  };

  FTodos.push(FObj);
  saveFTodo();
}

function saveFTodo() {
  localStorage.setItem(F_LS, JSON.stringify(FTodos));
}

function delUFTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  UFList.removeChild(li);
  const cleanUFTodo = UFTodos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  UFTodos = cleanUFTodo;
  saveUFTodo();
}

function delFTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  FList.removeChild(li);
  const cleanFTodo = FTodos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  FTodos = cleanFTodo;
  saveFTodo();
}

function finishTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.querySelector("span");
  UFList.removeChild(li);
  paintFTodo(text.innerText);

  const cleanUFTodo = UFTodos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });

  UFTodos = cleanUFTodo;
  saveUFTodo();
}

function returnTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.querySelector("span");
  FList.removeChild(li);
  paintUFTodo(text.innerText);

  const cleanFTodo = FTodos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });

  FTodos = cleanFTodo;
  saveFTodo();
}

function handleSubmit(event) {
  event.preventDefault();
  const currnetValue = todoInput.value;
  paintUFTodo(currnetValue);
  todoInput.value = "";
}

function init() {
  loadList();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
