import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'

const SECRET_KEY = 'SENHA_MUITO_FORTE'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end()

    const { username, password } = JSON.parse(req.body)

    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({
            username, role: 'admin', name: 'Daniel Ventura de Almeida'
        }, SECRET_KEY, { expiresIn: '1h' })

        const cookies = new Cookies(req, res)
        cookies.set('auth_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
        })

        return res.status(200).json({ message: 'Token gerado com sucesso!', token })
    }

    return res.status(401).json({ message: "Credenciais inválidas !" })
}