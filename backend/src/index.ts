import { Hono } from 'hono'

import {userRouter} from "./routes/user"
import {blogRouter} from "./routes/blog"

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>();

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter)


app.get('/', (c) => {
  return c.text('Hello from here! testing and debuging');
});

export default app;

// postgresql://learn_owner:POe6ULl1KkEp@ep-divine-hall-a1k1i6oa-pooler.ap-southeast-1.aws.neon.tech/learn?sslmode=require