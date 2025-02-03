import { Hono } from 'hono'


import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();



app.post('/api/v1/signup', async(c) => {
 
 
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  const body = await c.req.json(); // to get body 
  try{
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      }
    })
    return c.text("cekjsrdfvj");
  }
  catch(e)
  {
    console.log("error")
  }


})

app.post('/api/v1/signin', (c) => {
  return c.body("Hello from here !!")
})
app.post('/api/v1/blog', (c) => {
  return c.body("Hello from here !!")
})
app.put('/api/v1/blog', (c) => {
  return c.body("Hello from here !!")
})
app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

export default app





