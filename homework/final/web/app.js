import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

const posts = [

];

const router = new Router();

router.get('/', list)//列出所有貼文
.get('/login', LoginUi)
.get('/signup',signupUi)

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  
  ctx.response.body = await render.list(posts);
}
async function LoginUi(ctx) {
  
  ctx.response.body = await render.loginUi();
}
async function signupUi(ctx) {
  
  ctx.response.body = await render.signupUi();
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8110 });