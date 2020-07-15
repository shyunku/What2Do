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

const FLIP_SVG_ANIMATE_DURATION = 400;

$(()=>{
    const addNewTodoItemInput = $('#new_todo_item_input');
    const importanceSlider = $('#todo_item_importance_input');

    // add new todo items
    addNewTodoItemInput.on("keydown", function(e){
        if(e.keyCode === 13){
            const itemTitle = $(this).val();
            const itemImportance = importanceSlider.val();
            $(this).val(``);
            importanceSlider.val(0);
            deactivateSettingPanel();
            $('#importance_displayer').text(`중요도 (0)`);

            // add item named {title}
            addTodoItem(itemTitle, itemImportance);
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

    $.datepicker.setDefaults({
        prevText: '이전 달',
        nextText: '다음 달',
        closeText: '닫기',
        currentText: '오늘',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
    });

    animate();
});

function addTodoItem(title, importance){
    // Implement to upload item to server (later)
    $.ajax({
        url: '/post-todoitem',
        type: 'POST',
        data: {
            title: title,
            importance: importance,
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
        let importance = item.importance;
        let colorQuery = getTodoItemBoxColorQuery(importance);

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
    const importanceView = $('#importance_displayer');
    const importanceSlider = $('#todo_item_importance_input');

    importanceSlider.on("input", function(){
        let importance = $(this).val();
        importanceView.text(`중요도 (${importance})`);
    });

    const deadlinePicker = $('#deadline_picker_btn');

    $('#deadline_picker').datepicker({
        dateFormat: '기한: yy/mm/dd',
        onSelect: function(text){
            $('#deadline_picker_btn').addClass('selected');
        }
    });

    $('#startline_picker').datepicker({
        dateFormat: '시작일: yy/mm/dd',
        onSelect: function(text){
            $('#startline_picker_btn').addClass('selected');
        }
    });
}

function toggleDetailSettingPanel(){
    const settingPanel = $('#item_detail_setting_panel');
    if(settingPanel.hasClass("activated")){
        deactivateSettingPanel();
    }else{
        activateSettingPanel();
    }
}

function activateSettingPanel(){
    const settingPanel = $('#item_detail_setting_panel');
    let panelHeight = settingPanel.outerHeight();
    settingPanel.addClass("activated");
    settingPanel.stop().animate({
        top: `-${panelHeight}px`,
    }, 600, 'easeOutBounce');
    $('#flip_up_panel').fadeOut(FLIP_SVG_ANIMATE_DURATION);
    $('#flip_back_panel').fadeIn(FLIP_SVG_ANIMATE_DURATION);
}

function deactivateSettingPanel(){
    const settingPanel = $('#item_detail_setting_panel');
    settingPanel.removeClass("activated");
    settingPanel.stop().animate({
        top: '0px',
    }, 600, 'easeOutBounce');
    $('#flip_up_panel').fadeIn(FLIP_SVG_ANIMATE_DURATION);
    $('#flip_back_panel').fadeOut(FLIP_SVG_ANIMATE_DURATION);
}