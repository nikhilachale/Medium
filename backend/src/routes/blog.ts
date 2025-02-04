import { Hono } from "hono";
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {blogInput ,updateblogInput} from "@nikhilachale/medium-blog"
export const blogRouter = new Hono<
    {
        Bindings: {
            DATABASE_URL: string
            JWT_SECRET: string
        }
        Variables:{
            userId:string
        }
    }>();



blogRouter.use('/*', async (c, next) => {
    const hdr = c.req.header('Authorization') || "";
    if (!hdr.startsWith('Bearer ')) {
        c.status(400);
        return c.json({ error: 'Invalid authorization header format' });
    }
    const token = hdr.split(' ')[1];
    try {
        const response = await verify(token, c.env.JWT_SECRET) as { id: string };
        if (response) {
            c.set("userId", response.id);
            await  next();
        } else {
            c.status(403);
            return c.json({ error: "Unauthorized" });
        }
    } catch (e) {
        c.status(403);
        return c.json({ error: "Invalid or expired token" });
    }
});




blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const authorId=c.get("userId")
    const body = await c.req.json();


      const success = blogInput.safeParse(body);
      if(!success)
      {
        c.status(411);
        return c.json({
          message:"incorrect inputs"
        })
      }
    try {

        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)

            }
        });
        return c.json({ message: "Blog added!",blog });
    }
    catch (e) {
        console.error('Error:', e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }



});

blogRouter.put('/', async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const success = updateblogInput.safeParse(body);
      if(!success)
      { 
        c.status(411);
        return c.json({
          message:"incorrect inputs"
        })
      }
    try {

        const blog = await prisma.blog.update({
           where:{
            id:body.id,
           },
           data: {
            title: body.title,
            content: body.content,
            authorId: body.authorId,

        }

        });
        return c.json({ message: "Blog updated!",blog });
    }
    catch (e) {
        console.error('Error:', e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }


  

});

blogRouter.get('/:id',async (c) => {
    const id = c.req.param("id");
    console.log("Received ID:", id);

    if (!id) {
        c.status(400);
        return c.json({ error: "Blog ID is required" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {

        const blog = await prisma.blog.findFirst({
            where: { id },
        });
        return c.json({blog });
    }
    catch (e) {
        console.error('Error:', e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }

});
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    try {
        const blogs = await prisma.blog.findMany(); // Await the promise
        return c.json({ blogs });
    } catch (e) {
        console.error('Error:', e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }

 
});


  
