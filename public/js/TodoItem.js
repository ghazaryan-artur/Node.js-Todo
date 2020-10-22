export default class TodoItem {
    constructor(todo){
        this.id = todo.id;
        this.name = todo.name;
    }

    render(){
        return  `
                <li id="li${this.id}">
                    <div class="todo-field">          
                        <span>${this.name}</span>
                    </div>
                    <div class="todo-buttons">
                        <button class="editB" data-id="${this.id}" id="e${this.id}">Edit</button>
                        <button class="deleteB" data-id="${this.id}" id="d${this.id}">Delete</button>
                    </div>
                </li>
                `
    }
}