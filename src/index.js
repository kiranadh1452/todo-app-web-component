import { ListItem } from './module/ListItem.js';

customElements.define('list-item', ListItem);

/**
 * Function to create a custom list-item and add it to the main page.
 * @param {String} listText : Content of the list (Todo task.) 
 * */
function addItemToList(listText){
  const pendingItemList = document.getElementById('pending-item-container');

  const newElem = document.createElement('list-item');

  const newElemText = document.createElement('span');
  newElemText.setAttribute('slot','list-text');
  newElemText.innerText = listText;
  newElem.appendChild(newElemText);

  pendingItemList.appendChild(newElem);
}

document.getElementById('todo-item-submit').addEventListener('click', submitNewTodoItem);

//on clicking `Add` button
function submitNewTodoItem(){
  const newEntry = document.getElementById('new-todo-item');
  const newEntryText = newEntry.value;

  if(newEntryText != ''){
    addItemToList(newEntryText);
  }
}