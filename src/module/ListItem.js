//template for the list-item
const template = document.createElement('template');
template.innerHTML = `
<style>
  .list-complete{
    text-decoration: line-through;
  }

  .list-incomplete{
    text-decoration: none;
  }

  .list-group{
    padding: 2vh 2vw;
  }

  #list-content{
    font-size: 2vh;
  }
  .delete-btn{
    float: right;
  }
  button{
    border: none;
    border-radius: 10px;
    background-color: #2ac;
    color: white;
    height: 30px;
    width: 100px;
  }
  button:hover{
    cursor: pointer;
  }
</style>
<div class="list-group">
  <button id="check-btn">Mark Done</button>
  <span id="list-content">
    <slot name="list-text" />
  </span>
  <button class="delete-btn">Delete</button>
<div> <hr>
`

class ListItem extends HTMLElement {

  constructor(){
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.completed = false;
  }

  connectedCallback(){
    this.render();
    this.shadow.querySelector('#check-btn').addEventListener('click', () => this.toogleComplete());
    this.shadow.querySelector('.delete-btn').addEventListener('click', () => this.deleteItem());
  }

  disconnectedCallback() {

    if(this.shadow.querySelector('#myCheck')){
      this.shadow.querySelector('#myCheck').removeEventListener('click',this.toogleComplete.bind(this));
    }

    if(this.shadow.querySelector('.delete-btn')){
      this.shadow.querySelector('.delete-btn').removeEventListener('click',this.deleteItem.bind(this));
    }
  }

  render(){
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  toogleComplete(){
    this.completed = !this.completed;

    const chkBtn = this.shadow.querySelector('#check-btn');

    if(this.completed){
      this.shadow.querySelector('#list-content').className = "list-complete";
      chkBtn.innerText = 'Undo' ;
    }
    else{
      this.shadow.querySelector('#list-content').className = "list-incomplete";
      chkBtn.innerText = 'Mark Done' ;
    }

  }

  deleteItem(){
    this.remove();
  }

}

export { ListItem };