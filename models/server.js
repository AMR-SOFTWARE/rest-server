import express from 'express';
import cors from 'cors';

import { routes as usuarioRoutes } from '../routes/usuario.js';
import { dbConection } from '../db/config.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.api = '/api';
        this.usuarioPath = 'usuarios';

        this.conectDB();
        
        this.middlewares();

        this.routes();
    }

    async conectDB() {
        await dbConection();
    }

    middlewares() {
        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( `${ this.api }/${ this.usuarioPath }`, usuarioRoutes );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening in port http://localhost:${ this.port }`);
        })
    }
}