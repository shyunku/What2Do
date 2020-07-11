function getTodoItemBoxColorQuery(pref){
    const maxColVal = 220;
    let red = parseInt(maxColVal * (pref/100));
    return `rgb(${red},${maxColVal},${maxColVal})`
}