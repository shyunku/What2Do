let firebaseConfig = {
    apiKey: "AIzaSyCXuiJsLZbMKeEOcOHgOMJEndQ2hALmVyU",
    authDomain: "what2do-8d1d3.firebaseapp.com",
    databaseURL: "https://what2do-8d1d3.firebaseio.com",
    projectId: "what2do-8d1d3",
    storageBucket: "what2do-8d1d3.appspot.com",
    messagingSenderId: "747463899902",
    appId: "1:747463899902:web:c4944156f0e0dea54c83af",
    measurementId: "G-5W55GS8RMB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let todoitems = {};

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

    // Listen todo item value changes (temporary)
    const itemRef = firebase.database().ref("test/todo-items");
    itemRef.on("value", function(snapshot){
        const updatedData = snapshot.val();
        if(updatedData != undefined){
            updateItems(snapshot.val());
        }else{
            $('.todo-list').empty();
        }
    });

    animate();
});

function addTodoItem(title){
    // Temporary
    let preference = parseInt(Math.random()*100);

    // Implement to upload item to server (later)
    $.ajax({
        url: '/post-todoitem',
        type: 'POST',
        data: {
            title: title,
            preference: preference,
        },
        success: function(res){

        }
    })
}

function updateItems(data){
    todoitems = data;

    $('.todo-list').empty();

    Object.keys(todoitems).forEach((key)=>{
        let item = todoitems[key];
        let preference = item.preference;
        let colorQuery = getTodoItemBoxColorQuery(preference);

        $('.todo-list').prepend(`
        <div class="todo-item" style="background-color: ${colorQuery}">
            <span class="item-title">${item.title}</span>
            <div class="item-property-wrapper">
                <span class="item-deadline">~2019/3/14</span>
            </div>
        </div>
        `);
    });
}

function animate(){
    
}

function toggleDetailSettingPanel(){
    const settingPanel = $('#item_detail_setting_panel');
    let panelHeight = settingPanel.outerHeight();
    if(settingPanel.hasClass("activated")){
        settingPanel.removeClass("activated");
        settingPanel.stop().animate({
            top: '0px',
        }, 600, 'easeOutBounce');
    }else{
        settingPanel.addClass("activated");
        settingPanel.stop().animate({
            top: `-${panelHeight}px`,
        }, 600, 'easeOutBounce');
    }
}