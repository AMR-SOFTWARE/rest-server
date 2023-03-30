import { request, response } from 'express';

export const usuarioGet = (req = request, res = response) => {

    const { q, page = '1', limit = '5' } = req.query;

    res.json({
        msg: 'Usuario GET - Controller',
        q,
        page,
        limit
    });
}

export const usuarioPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'Usuario POST - Controller',
        nombre,
        edad
    });
}

export const usuarioPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'Usuario PUT - Controller',
        id
    });
}

export const usuarioDelete = (req = request, res = response) => {
    res.json({
        msg: 'Usuario DELETE - Controller'
    });
}