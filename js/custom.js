const form = document.getElementById('todo');
const inputField = document.querySelector('.todo-list');
const addItem = document.querySelector('.add-item');
const bodySection = document.querySelector('.body-section ul');

function GetToDoList(inputVal, id) {
  this.inputVal = inputVal;
  this.id = id;
}

class renderToUI {
  static appendUI(toDoArray) {
    const li = document.createElement('li');
    li.classList.add('todo-list');
    li.innerHTML = `<span class="todo-item">${toDoArray.inputVal}</span>
                    <span><input type="checkbox" class="complete"></span>
                    <span class="edit">Edit</span>
                    <span class="delete">Delete</span>`;
    bodySection.append(li);

    const editButton = li.querySelector('.edit');
    const deleteButton = li.querySelector('.delete');

    editButton.addEventListener('click', () => {
      renderToUI.edit(li, toDoArray);
    });

    deleteButton.addEventListener('click', () => {
      renderToUI.delete(li);
    });
  }

  static edit(li, toDoArray) {
    const todoItem = li.querySelector('.todo-item');
    const newInputVal = prompt('Edit item:', toDoArray.inputVal);
    if (newInputVal !== null) {
      todoItem.textContent = newInputVal;
      toDoArray.inputVal = newInputVal;
    }

    const localArray = localStore.getItem();
    localArray.forEach((el, i) => {
      if (el.id === toDoArray.id) {
        localArray[i].inputVal = newInputVal;
      }
    });
    localStorage.setItem('toDoList', JSON.stringify(localArray));
  }

  static delete(li) {
    const localArray = localStore.getItem();
    localArray.forEach((el, i) => {
      if (li.querySelector('.todo-item').textContent === el.inputVal) {
        localArray.splice(i, 1);
      }
    });
    localStorage.setItem('toDoList', JSON.stringify(localArray));
    li.remove();
  }
}

class localStore {
  static getItem() {
    let toDoArray = JSON.parse(localStorage.getItem('toDoList')) === null ? [] : JSON.parse(localStorage.getItem('toDoList'));
    return toDoArray;
  }

  static setItem(toDoArray) {
    const localArray = localStore.getItem();
    localArray.push(toDoArray);
    localStorage.setItem('toDoList', JSON.stringify(localArray));
  }
}

form.addEventListener('submit', () => {
  const date = new Date();
  const time = date.getTime();
  const inputVal = inputField.value;
  if (inputVal != '') {
    const todoList = new GetToDoList(inputVal, time);
    renderToUI.appendUI(todoList);
    localStore.setItem(todoList);
    inputField.value = '';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const localArray = localStore.getItem();
  localArray.forEach((el) => {
    renderToUI.appendUI(el);
  });
});
