import { Application , Router, send } from "https://deno.land/x/oak/mod.ts";
import { table9x9 } from "./html.js";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = `
    <html>
  
  <body>
  
  ${table9x9()}
  </body>
  </html>
    ` ;
  })

const app = new Application(); //app是一個物件 用new創一個新的物件

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx) => {
  console.log('path=', ctx.request.url.pathname)
  if (ctx.request.url.pathname.startsWith("/css/")) {//在http://127.0.0.1:8000 後加上/css/ 導引css資料夾
    console.log('pass:', ctx.request.url.pathname)
    await send(ctx, ctx.request.url.pathname, {
      root: Deno.cwd(),
      index: "showhtml.html", //將index 指定給css裡的showhtml.html 顯示網頁
    });  
  }
});

// function hello(ctx) { //改寫函數
//   ctx.response.body = "Hello World!" 把hello world 塞到body
// });

//app.use(hello) use 都是用函數 hello是回應韓式
console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 }); //listen是把port8000仔下來

//await 是只要有讀寫檔案  或開啟網路需要時間 前面要加上await