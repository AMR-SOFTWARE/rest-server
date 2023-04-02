import { request, response } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario.js';

export const usuarioGet = async(req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit( Number( limit ) )
    ]);

    res.json({
        total,
        usuarios
    });
}

export const usuarioPost = async(req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    await usuario.save();

    res.json(usuario);
}

export const usuarioPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: Validar password contra la DB
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true} );

    res.json(usuario);
}

export const usuarioDelete = async(req = request, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true } )

    res.json(usuario);
}