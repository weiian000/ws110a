import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

const posts = [

];

const router = new Router();

router.get('/', list)//列出所有貼文
  //.get所有參數放在網址上傳遞
  //.post參數放在內文傳遞 不是在網址上的東西
  .get('/post/new', add)//點create new 進去的畫面 。/post/new', add會觸發add
  .get('/post/:id', show)//顯示的畫面
  .post('/post', create);//
//.post是指method '/post'是指路徑
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {//?
  const id = ctx.params.id;
  const post = posts[id]; //create之後才會show所以可以直接用id
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    //取得的欄位name 是欄位的名稱也就是他的key 那裡面打的字就是值

    const pairs = await body.value //value是指所有的name and value
    const post = {}//post為一物件 稱為字典
    for (const [key, value] of pairs) {//把name value透過 key,value傳
      post[key] = value//key value放到post貼文。 第一個key對應到render的title 因為name ="title"。
      //key是name value是輸入的值 post的title欄位ccc post的value欄位cccc
    }
    console.log('post=', post)
    const id = posts.push(post) - 1; //posts是一個陣列裡面是post裡的物件。
    //因為是存在陣列想知道第幾筆所以用id //push回傳陣列目前有多少筆 push進去的那一個就是-1後的
    post.created_at = new Date();//記日期
    post.id = id;
    ctx.response.redirect('/');
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
