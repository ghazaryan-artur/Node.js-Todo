import EditForm from "./EditForm.js";
import TodoItem from "./TodoItem.js";


class Main {
    BASE_URL = 'http://localhost:5000/api/todos';
	ROOT = document.getElementById('root');


    async getTodos(){
        const response = await fetch(this.BASE_URL);
		const jsonRes = await response.json();
		if(!jsonRes.success){
			throw new Error(jsonRes.error);
		} else {
			return this.generateTodos(jsonRes.data);
		}
    }

    generateTodos(data){
        let todoCollection = '';
        data.forEach(todo => {
            todoCollection += (new TodoItem(todo)).render();
		}); 
        return todoCollection;
    }


	async createTodo(name){
		const input = document.querySelector('.to-do-input');
		try {
			const response = await fetch(`${this.BASE_URL}`, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			});
			const jsonRes = await response.json();
			if(!jsonRes.success){
				throw new Error(jsonRes.error);
			} else {
				const todoData = jsonRes.data;
				const todo = (new TodoItem(todoData)).render();
				document.querySelector('#todos-list').insertAdjacentHTML('beforeend', todo);
				this.attachListenersToButtons();
				input.value = '';
				input.placeholder = "What needs to be done?";
			}
		} catch (err) {
			console.log(err);
			input.placeholder = "Todo name can\'t be empty";
		}
		
	}

	async updateTodo(form){
		const name = form.name.value
		const id = form.id.value;
		try {
			const response = await fetch(`${this.BASE_URL}/${id}`, {
				method: "PUT",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			});
			const jsonRes = await response.json();
			if (!jsonRes.success) {
				throw new Error(jsonRes.error);
			} else {
				this.render();
			}
		} catch (err) {
			console.log(err);
			if(err.message == "Bad Request"){
				document.querySelector('#error').innerText = "Todo should have name!";
			} else if (err.message == "ToDo not found") {
				document.querySelector('#error').innerText = "Todo not found";
			}
		}
    } 
    async deleteTodo(id){
		try {
			const response = await fetch(`${this.BASE_URL}/${id}`, {
				method: 'DELETE'
			});
			const jsonRes = await response.json();
			if(!jsonRes.success){
				throw new Error(jsonRes.error);
			} else {
				const li = document.getElementById(`li${id}`);
				li.remove();
			}
		} catch (err) {
			console.log(err)
		}
        
    }

    async takeToEdit(id){
		try {
			const response =  await fetch(`${this.BASE_URL}/${id}`);
			const jsonRes = await response.json();
			if(!jsonRes.success){
				throw new Error(jsonRes.error);
			} else {
				const todo = jsonRes.data
				const editForm = new EditForm(todo);
				const todoToInner = editForm.render();
				this.ROOT.innerHTML = todoToInner;
				this.attachListenersToForm('edit');
			}
		} catch (err) {
			console.log(err)
		}
		
    }

    

	attachListenersToButtons(){
		// edit button
		const editButtons = document.querySelectorAll('.editB');
		editButtons.forEach(button => {
			button.addEventListener('click', ()=> {
				this.takeToEdit(button.dataset.id);
			})
		});

		// delete button
		const deleteButtons = document.querySelectorAll('.deleteB');
		deleteButtons.forEach(button => {
			button.addEventListener('click', ()=> {
				this.deleteTodo(button.dataset.id);
			})
		});
	}

	attachListenersToForm(action){
		const todoForm = document.querySelector('#todo-form');
		todoForm.addEventListener('submit', (e) => {
			e.preventDefault();
			if(action == 'create'){
				this.createTodo(todoForm.name.value);
			} else if (action == 'edit') {
				this.updateTodo(todoForm);
			}
		});
	}

    async render(){
        let todos = '';
        try {
            todos = await this.getTodos();
        } catch (err) {
            todos = err.message;
        }
        
        root.innerHTML = `
                            <div class="container">
                                <h1>Todos</h1>
                                <form id="todo-form" action="" method="POST">        
                                    <div class="downArrow">
                                        <div >
                                            <label></label>
                                        </div>
                                    </div>
                                    <div class="inputs-container">
										<input class="to-do-input" type="text" name="name" placeholder="What needs to be done?">
                                        <input class="submit" type="submit" value="Send">
									</div>

								</form>
								<ul id="todos-list">
                                    ${todos}
								</ul>
                            </div>
						`;

		this.attachListenersToButtons();
		this.attachListenersToForm('create');
						
    }
}

const main = new Main();
main.render();