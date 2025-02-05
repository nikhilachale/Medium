import {Hono} from "hono";
import { sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
 import { signupInput ,signinInput} from "@nikhilachale/medium-blog"


export const userRouter=new Hono<
{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    }
  }>();



userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const success = signupInput.safeParse(body);
  if(!success)
  {
    c.status(411);
    return c.json({
      message:"incorrect inputs"
    })
  }
  try {

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password ,
        name :body.name
      }
    });

    const token = await  sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(token)
    return c.json({ jwt: token,
      data: user
     });
   
  } catch (e) {
    console.error('Error:', e);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const success = signinInput.safeParse(body);
  if(!success) 
  {
    c.status(411);
    return c.json({
      message:"incorrect inputs"
    })
  }
  const user = await prisma.user.findUnique({
    where: { email: body.email }
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User not found" });
  }

  // Simple password check (not recommended for production)
  if (user.password !== body.password) {
    c.status(403);
    return c.json({ error: "Invalid password" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt: token });
});