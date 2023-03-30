import { Router } from 'express';
import { 
    usuarioDelete,
    usuarioGet,
    usuarioPost,
    usuarioPut 
} from '../controllers/usuarios.js';

export const routes = Router();

routes.get('/', usuarioGet);

routes.post('/', usuarioPost);

routes.put('/:id', usuarioPut);

routes.delete('/', usuarioDelete);