

export function layout1(title,content){
    return `<html>
    <head>
        <meta charset="utf-8"/>
        <meta name = "viewport" content = "width=device-width, initial-scale=1,maxiumu-scale=1">
        
        <link rel="stylesheet" href="calendar.css">
        <title>${title}</title>
        <style>
       
        .title h1{
          font-size:35px;
          text-align: center;
          background-color:#FFFFF0;
      }
        .calendar{
            position: relative;
            line-height: 10px;
            text-align: center;
            width: 650px;
            height:400px;
           
            
        }
        .pre{
           background-color:#FFFFF0;
            position:absolute;
            left: 35%;
            top: 110px;
           
            
        }
        
        .yearmonth{
            text-align: center;
            position: relative;
            top: 25px;
            left:0px;
            font-size: 30px
            
        }
        
        .next{
            position:absolute;
            right: 35%;
            top: 110px;
            background-color:#FFFFF0;
        }
        .body{
            margin:0px auto;
            background-color:#FFFFF0;

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
            top: 70px;
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
            text-decoration:none;
            text-align: center;
            margin:0px auto;
            position:relative;
            top: 60px;
        }
        .list .fadeout{
            opacity: 0.3;
            text-decoration:none;
        }
        #content{
          

        }
        .body{
          background-color:#FFFFF0;
        }
        </style>
    </head>
    <body class = "body">
    <section id="content">
    ${content}
    </section>
    
    </body>
    </html> 
`
}
export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
          margin:0 auto;
          background:#FFFACD;
        }
    
        h1 {
          font-size: 2em;
        }
    
        h2 {
          font-size: 1.2em;
        }
    
        #posts {
          margin: 0;
          padding: 0;
        }
    
        #posts li {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
    
        #posts li:last-child {
          border-bottom: none;
        }
    
        textarea {
          width: 500px;
          height: 300px;
        }
       
        input[type=text],input[type=password],input[type=email],
        textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px;
          padding: 15px;
          font-size: .8em;
          
        }
        input[type=submit]
        {
          width:60px;height:30px;
        }
        .center{
          margin:0 auto;
          width:600px;
          
        }
        input[type=text],input[type=password],input[type=email] {
          width: 500px;
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `
  }


export function calendar(){
    let content = `
        <div class="title">
            <h1>Create event</h1>
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
                let cell = document.createElement("a");
                cell.setAttribute('href', '/post/new')
                cell.className = "date" + (date.getMonth()===state.current.getMonth()?"":" fadeout");
                cell.textContent =  date.getDate();
            
                list.appendChild(cell);//
            }
            //controller
            init();
        </script>
</body>`
return layout1('行事曆',content)
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
    <p>Welcome ${user.username}, You may <a href="/calendar">Create a Post</a> or <a href="/logout">Logout</a> !</p>
    <p>There are <strong>${posts.length}</strong> posts!</p>
    <ul id="posts">
    ${list.join('\n')}
    </ul>
    `
    return layout('Post calendar',content)
}

export function loginUi(){
    let content = `
    <div class = "center">
    <h1>Login</h1>
    <form action = "/" method = "post">
    <p><input type="text" placeholder="username" name="username"></p>
    <p><input type="password" placeholder="password" name="password"></p>
    <p><input type="text" placeholder="email" name="email"></p>
    <p><input type="submit" value="Login"></p>

    <p>New user? <a href="/signup">Create an account</p>
    </div>
    </form>
    `
    return layout('Login',content)
}
export function signupUi(){
    let content = `
    <div class = "center">
    <h1>Signup</h1>
    <form action = "/signup" method = "post">
    <p><input type="text" placeholder="username" name="username"></p>
    <p><input type="password" placeholder="password" name="password"></p>
    <p><input type="email" placeholder="email" name="email"></p>
    <p><input type="submit" value="signup"></p>
    </div>
    </form>
    `
    return layout('Signup',content)
}

export function success() {
    return layout('Success', `
    <div class = "center">
    <h1>Success!</h1>
    You can <a href="/">login now !</a> 
    </div>
    `)
  }
  
  export function fail() {
    return layout('Fail', `
    <div class = "center">
    <h1>Fail!</h1>
    Your username had been use by other people . Please <a href="JavaScript:window.history.back()">Signup again</a> !
    </div>
    `)
  }

export function newPost(){
    return layout('New Post', `
    <h1>New Post</h1>
    <p>Create a new post.</p>
    <form action="/post" method="post">
      <p><input type="text" placeholder="Title" name="title"></p>
      <p><textarea placeholder="Contents" name="body"></textarea></p>
      <p><input type="submit" value="Create"></p>
    </form>
    `)
}
export function show(post){
    return layout(post.title, `
    <div class = "center">
    <h1>${post.title} -- by ${post.username}</h1>
    <p>${post.body}</p>
    </div>
  `)
}