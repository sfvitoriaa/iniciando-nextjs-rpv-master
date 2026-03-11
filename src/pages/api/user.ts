import type { NextApiRequest, NextApiResponse } from "next";

interface IUser {
    nome: string
    email: string
    company: {
        nome: string
    }
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IUser>
) {
    console.log('REQUISIÇÃO', req.query)
    res.status(200).json({
        nome: req.query.nome,
        email: req.query.email,
        company: req.query.company
    });
}