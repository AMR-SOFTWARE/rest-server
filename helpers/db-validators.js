import mongoose from 'mongoose';

import Role from '../models/role.js';
import Usuario from '../models/usuario.js';

export const isValidRole = async(rol = '') => {
    const existeRole = await Role.findOne({ rol });
    if ( !existeRole ) {
        throw new Error(`El rol ${ rol } no éxiste en la base de datos`);
    }
}

export const existeEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${ correo } ingresado ya está registrado'`)
    }
}

export const existeUsuarioPorId = async( id ) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El ID ingresado no es válido`);
    }

    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El ID: ${ id } ingresado no existe.`)
    }
}