//資料
let state = null;
//初始化
function init() {
    state={
    current: new Date()//當前時間
    };
    render();
}
function premonth(){
    state.current.setMonth(state.current.getMonth()-1)
    render()
}
function nextmonth(){
    state.current.setMonth(state.current.getMonth()+1)
    render()
}
//根據資料產生畫面
function render(){
    let year = document.querySelector("#yearmonth")
    year.textContent = state.current.getFullYear() + "-" + (state.current.getMonth()+1)
    let list = document.querySelector("#list")
    list.innerHTML=""
    let firstDate=new Date(state.current.getFullYear(), state.current.getMonth(), 1);
    let date = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    console.log(date.getDay());//第一天是星期幾
    //劃出上個月的後幾天
    date.setDate(date.getDate()-date.getDay())//用第一天日期扣掉第一天是星期幾就知道前面有幾天要填
    while(date<firstDate){
        renderDate(date,list)
        date.setDate(date.getDate() + 1)
    }
    //劃出當月日期
    while (date.getMonth()===state.current.getMonth())
    {
        renderDate(date,list)
        //日期 +1
        date.setDate(date.getDate() + 1)
    }
    while(date.getDay()>0)
    {
        renderDate(date,list)
        date.setDate(date.getDate() + 1)
    }
}
function renderDate(date,list)
{
    let cell = document.createElement("div");
    cell.className = "date" + (date.getMonth()===state.current.getMonth()?"":" fadeout");
    cell.textContent =  date.getDate();
    list.appendChild(cell);//
}
//controller
init();
