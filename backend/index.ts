import express, {type Express, type Request, type Resposne} from 'express';


const app: Express = express();
const port = 3000;


app.get('/', (req: Request, res: Resposne) => {
    res.send("Hello World!");
})


app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
})


