export default class EditForm {
    constructor(todo){
        this.id = todo.id;
        this.name = todo.name;
    }
    render(){
        return  `
                <div class="edit">
                    <form method='PUT' action="" id="todo-form">
                        <div class="container">
                            <input type="text" name='name' value='${this.name}'>
                            <input type="text" style="display:none" name='id' value='${this.id}'>
                            <p id="error"></p>
                            <input class="save-button" type='submit' value='Save'>
                        </div>
                    </form>

                </div>
                `
    }
}