function getTodoItemBoxColorQuery(importance){
    const maxColVal = 220;
    let red = parseInt(maxColVal * (1 - importance/100));
    return `rgb(${red},${maxColVal},${maxColVal})`
}