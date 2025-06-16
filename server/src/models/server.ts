import express, {Application, Request, Response} from 'express';
import routesP from '../routes/producto'
import { json } from 'sequelize';
import db from '../db/connection';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;

    constructor(){
       this.app = express(); 
       this.port = process.env.PORT || '3001';
       this.listen();
       this.midlewares();
       this.routes();
       this.dbConnect();
    }
    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Corriendo en el ${this.port}`)
        })
    }
    routes(){
        this.app.get('/', (req: Request, res:Response)=>{
            res.json({
                msg:'JSON CREATED'
            })
        })
        this.app.use('/api/productos', routesP)
    }

    midlewares(){

        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect(){
        await db.authenticate();
        console.log('Base connected')
    }

}

export default Server;