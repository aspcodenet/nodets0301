import express  from "express";
import type {Express, Request, Response}  from "express";
import { getAllMessages } from "./models/message";
import { findAll, findById, createIfNotExists,seedProducts } from "./database/product";
import ejs from "ejs";
//import express, {Express, Request, Response}  from "express";


const app: Express = express();
const port =  3000;

app.set('view engine', 'ejs')

// string, number, boolean, null, undefined, function, objt

app.get("/test2", async (req: Request, res: Response) => {
    const allProducts = await findAll()
    res.json(allProducts);
  });

  app.get("/", async (req: Request, res: Response) => {
    const allProducts = await findAll()
    res.render( "pages/products",{ 
        allProducts
    });
  });

  app.get("/productpage", async (req: Request, res: Response) => {
    const id = req.query.id;
    const product = await findById(Number(id))
    res.render( "pages/product",{ 
        product
    });
  });



let  namnet:string   = "Hej"


app.get("/test", (req: Request, res: Response) => {
    res.json(getAllMessages());
});

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
    await createIfNotExists()
    await seedProducts()    
    console.log(`[server]: Server is running at http://localhost:${port}`);
}); 


