import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';
import { 
    existeEmail, 
    existeUsuarioPorId, 
    isValidRole 
} from '../helpers/db-validators.js';

import { 
    usuarioDelete,
    usuarioGet,
    usuarioPost,
    usuarioPut 
} from '../controllers/usuarios.js';

export const routes = Router();

routes.get('/', usuarioGet);

routes.post('/', [
    check('nombre', 'El nombre ingresado no es válido').not().isEmpty(),
    check('password', 'El password ingresado no es válido').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo ingresado no es válido').isEmail(),
    check('correo').custom( existeEmail ),
    // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( isValidRole ),
    validarCampos
], usuarioPost);

routes.put('/:id', [
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( isValidRole ),
    validarCampos
], usuarioPut);

routes.delete('/:id', [
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuarioDelete);