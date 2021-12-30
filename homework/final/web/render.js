

export function layout(title,content){
    return `<html>
    <head>
        <meta charset="utf-8"/>
        <meta name = "viewport" content = "width=device-width, initial-scale=1,maxiumu-scale=1">
        
        <link rel="stylesheet" href="calendar.css">
        <title>${title}</title>
        <style>
        .calendar{
            position: relative;
            line-height: 10px;
            text-align: center;
            width: 650px;
            height:400px;
            background:#fff;
            box-shadow:0px 1px 1px rgba(0,0,0,0.1);
        }
        .title{
            text-align: center;
        }
        
        .pre{
            position:absolute;
            left: 35%;
            top: 140px;
            
        }
        
        .yearmonth{
            text-align: center;
            position: relative;
            top: 120px;
            font-size: 20px
        }
        
        .next{
            position:absolute;
            right: 35%;
            top: 140px;
        }
        .body{
            margin:0px auto;
        }
        .body-list ul{
            width:700px;
            display: flex;
            flex-wrap: wrap;
            font-family:arial;
            font-weight:bold;
            font-size:14px;
            margin:0px auto;
        }
        .body-list ul li{
            width:100px;
            height:50px;
            line-height:36px;
            list-style-type:none;
            display:block;
            box-sizing:border-box;
            float:center;
            text-align:center;
            position: relative;
            top: 160px;
            right: 15px;
        }
        .lightgrey{
            color:#a8a8a8; /*浅灰色*/
        }
        .darkgrey{
            color:#565656; /*深灰色*/
        }
        .green{
            position: relative;
            top: 5px;
            color:#6ac13c; /*绿色*/
        }
        
        .greenbox{
            border:1px solid #6ac13c;
            background:#e9f8df; /*浅绿色背景*/
        }
        .list{
            display: flex; flex-wrap: wrap;/*換行*/
            width: 700px;
            position:relative;
            top: 60px;
            margin:0px auto;
        }
        .list .date{
            width: 100px;height: 50px;
            text-align: center;
            margin:0px auto;
            position:relative;
            top: 130px;
        }
        .list .fadeout{
            opacity: 0.3;
        }
        </style>
    </head>
    <body>
    <section id="content">
    ${content}
    </section>
    <script src = "./connect.js"> </scirpt>
    </body>
    </html> 
`
}


export function calendar(){
    let content = `
        <div class="title">
            <h3 id="yearmonth" class = 'yearmonth'></h3>
            <button onclick="premonth();" class="pre">&#10094;</button>
            <button onclick="nextmonth();" class='next'>&#10095;</button>
            
        </div>  
        <div class="body">
            <div class="green body-list">
            <ul>
                <li>MON</li>
                <li>TUE</li>
                <li>WED</li>
                <li>THU</li>
                <li>FRI</li>
                <li>SAT</li>
                <li>SUN</li>
            </ul>
            </div>
      </div>
        <div class = "list" id = "list"></div>
        <script>
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

        </script>
</body>`
return layout('行事曆',content)
}
export function list(posts,user){
    let list = []
    for(let post of posts){
        list.push(`
        <li>
        <h2>${ post.title } -- by ${post.username}</h2>
        <p><a href="/post/${post.id}">Read post</a></p>
        </li>
        `
        )
    }
    let content = `
    <h1>Posts</h1>
    <p><a href="/login">Login</a> to create your calendar</p>
    <p>There are <strong>${posts.length}</strong> posts!</p>
    <ul id="posts">
    ${list.join('\n')}
    </ul>
    `
    return layout('Post calendar',content)
}

export function loginUi(){
    let content = `
    <h1>Login</h1>
    <form action = "/login" method = "post">
    <p><input type="text" placeholder="username" name="username"></p>
    <p><input type="password" placeholder="password" name="password"></p>
    <p><input type="submit" value="Login"></p>
    <p>New user? <a href="/signup">Create an account</p>
    </form>
    `
    return layout('Login',content)
}
export function signupUi(){
    let content = `
    <h1>Signup</h1>
    <form action = "/signup" method = "post">
    <p><input type="text" placeholder="username" name="username"></p>
    <p><input type="password" placeholder="password" name="password"></p>
    <p><input type="email" placeholder="email" name="email"></p>
    <p><input type="submit" value="signup"></p>
    </form>
    `
    return layout('Signup',content)
}

export function newPost(){

}
export function show(){

}