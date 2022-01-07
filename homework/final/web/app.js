import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions/mod.ts";

const db = new DB("blog.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, title TEXT, body TEXT)");

db.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)");

const session = new Session()
const router = new Router();

router.get('/',session.initMiddleware(), loginUi)
  .post('/',session.initMiddleware(), login)
  .get('/signup',session.initMiddleware(), signupUi)
  .post('/signup',session.initMiddleware(), signup)
  .get('/calendar',session.initMiddleware(),createcalendar)
  .get('/list',session.initMiddleware(), list)
  .get('/logout',session.initMiddleware(), logout)
  .get('/post/new',session.initMiddleware(), add)
  .get('/post/:id', session.initMiddleware(),show)
  .post('/post',session.initMiddleware(), create)


const app = new Application();


app.use(router.routes());
app.use(router.allowedMethods());

function sqlcmd(sql, arg1) { //參數為sql指令結果 和 參數
  console.log('sql:', sql) //印出資料庫下的指令
  try {
    var results = db.query(sql, arg1)//從db裡將id username title body撈出來
    console.log('sqlcmd: results=', results)
    return results
  } catch (error) {
    console.log('sqlcmd error: ', error)
    throw error
  }
}

function postQuery(sql) {//postQuery("SELECT id, username, title, body FROM posts")
  let list = []
  for (const [id, username, title, body] of sqlcmd(sql)) {//陣列順序和db創建欄位的順序有關
    list.push({id, username, title, body})
  }
  console.log('postQuery: list=', list)
  return list
}

function userQuery(sql) {//回傳user的資料庫內容
  let list = []
  for (const [id, username, password, email] of sqlcmd(sql)) {
    list.push({id, username, password, email})
  }
  console.log('userQuery: list=', list)
  return list
}

async function parseFormBody(body) {//把form的input的value轉為一個物件
  const pairs = await body.value
  const obj = {}
  for (const [key, value] of pairs) {
    obj[key] = value
  }
  return obj
}

async function signupUi(ctx) {
  ctx.response.body = await render.signupUi();
}
async function createcalendar(ctx) {
  ctx.response.body = await render.calendar();
}
async function signup(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    var user = await parseFormBody(body)
    var dbUsers = userQuery(`SELECT id, username, password, email FROM users WHERE username='${user.username}'`)//檢查帳號是否有人用依照username做判斷
    if (dbUsers.length === 0) {
      sqlcmd("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [user.username, user.password, user.email]);//沒有人用則將帳號匯入資料庫
      ctx.response.body = render.success()
    } else 
      ctx.response.body = render.fail()
  }
}

async function loginUi(ctx) {
  ctx.response.body = await render.loginUi();
}

async function login(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    var user = await parseFormBody(body)
    var dbUsers = userQuery(`SELECT id, username, password, email FROM users WHERE username='${user.username}'`) // userMap[user.username]
    var dbUser = dbUsers[0]
    if (dbUser.password === user.password) {
      ctx.state.session.set('user', user)
      console.log('session.user=', await ctx.state.session.get('user'))
      ctx.response.redirect('/list');
    } else {
      ctx.response.body = render.fail()
    }
  }
}

async function logout(ctx) {
   ctx.state.session.set('user', null)
   ctx.response.redirect('/')
}

async function list(ctx) {
  let posts = postQuery("SELECT id, username, title, body FROM posts")
  console.log('list:posts=', posts)
  ctx.response.body = await render.list(posts, await ctx.state.session.get('user'));
}

async function add(ctx) {
  var user = await ctx.state.session.get('user')
  if (user != null) {
    ctx.response.body = await render.newPost();
  } else {
    ctx.response.body = render.fail()
  }
}

async function show(ctx) {
  const pid = ctx.params.id;
  let posts = postQuery(`SELECT id, username, title, body FROM posts WHERE id=${pid}`)
  let post = posts[0]
  console.log('show:post=', post)
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    var post = await parseFormBody(body)
    console.log('create:post=', post)
    var user = await ctx.state.session.get('user')
    if (user != null) {
      console.log('user=', user)
      sqlcmd("INSERT INTO posts (username, title, body) VALUES (?, ?, ?)", [user.username, post.title, post.body]);  
    } else {
      ctx.throw(404, 'not login yet!');
    }
    ctx.response.redirect('/list');
  }

}

console.log('Server run at http://127.0.0.1:8110')
await app.listen({ port: 8110 });