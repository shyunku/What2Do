$(()=>{
    const addNewTodoItemInput = $('#new_todo_item_input');

    // add new todo items
    addNewTodoItemInput.on("keydown", function(e){
        if(e.keyCode === 13){
            const itemTitle = $(this).val();
            $(this).val(``);

            // add item named {title}
            addTodoItem(itemTitle);
        }
    });


    debug();
});

function addTodoItem(title){
    // Temporary
    let preference = parseInt(Math.random()*100);
    let colorQuery = getTodoItemBoxColorQuery(preference);

    $('.todo-list').prepend(`
    <div class="todo-item" style="background-color: ${colorQuery}">
        <span class="item-title">${title}</span>
        <div class="item-property-wrapper">
            <span class="item-deadline">~2019/3/14</span>
        </div>
    </div>
    `);

    // Implement to upload item to server (later)
}

function debug(){
    for(let i=0;i<20;i++){
        let preference = parseInt(Math.random()*100);
        let colorQuery = getTodoItemBoxColorQuery(preference);

        $('.todo-list').append(`
        <div class="todo-item" style="background-color: ${colorQuery}">
            <span class="item-title">todo item &nbsp;${i}</span>
            <div class="item-property-wrapper">
                <span class="item-deadline">~2019/3/14</span>
            </div>
        </div>
        `);
    }
}