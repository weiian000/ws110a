import { Application } from "https://deno.land/x/oak/mod.ts";
import { table9x9 } from "./html.js";


const app = new Application(); //app是一個物件 用new創一個新的物件

app.use((ctx) => { //箭頭函數
  ctx.response.body =`
  <html>
<style>
    table {
      width: 60%; 
      border: 1px solid brown;
      border-collapse: collapse;
      padding: 15px;
      text-align: center;
      margin-left:auto; 
      margin-right:auto;
}
    th {
      text-align:center; 
      background-color:
       burlywood;padding: 15px;
      }
    td{border: 1px solid brown ; padding: 15px;}
    h1{text-align: center ; color:orange;}
</style>

<body>

${table9x9()}
</body>
</html>
  ` 
});

// function hello(ctx) { //改寫函數
//   ctx.response.body = "Hello World!" 把hello world 塞到body
// });

//app.use(hello) use 都是用函數 hello是回應韓式
console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 }); //listen是把port8000仔下來

//await 是只要有讀寫檔案  或開啟網路需要時間 前面要加上await