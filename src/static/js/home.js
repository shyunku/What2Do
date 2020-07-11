$(()=>{
    debug();
});

function debug(){
    for(let i=0;i<35;i++){
        let preference = parseInt(Math.random()*100);
        let colorQuery = getTodoItemBoxColorQuery(preference);

        $('.todo-list').append(`
        <div class="todo-item" style="background-color: ${colorQuery}">
            <span class="item-title">todo item &nbsp;${i}</span>
            <div class="item-property-wrapper">
                <span class="item-deadline">2019년 3월 14일</span>
            </div>
        </div>
        `);
    }
}