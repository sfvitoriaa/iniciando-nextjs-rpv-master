import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import bd from "../../bd.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { usuarioId, livroId } = req.body;

    const usuario = bd.usuarios.find((u: any) => u.id === usuarioId);
    const livro = bd.livros.find((l: any) => l.id === livroId);

    if (!usuario || !livro) {
      return res.status(404).json({ message: "Usuário ou livro não encontrado" });
    }

    // devolve se já tem
    if (usuario.livroEmprestado === livroId) {
      usuario.livroEmprestado = null;
      livro.qtdEmprestados -= 1;
      fs.writeFileSync(path.join(process.cwd(), "bd.json"), JSON.stringify(bd, null, 2));
      return res.status(200).json({ message: "Livro devolvido com sucesso!" });
    }

    // empresta se não tiver nada
    if (!usuario.livroEmprestado && livro.qtdEmprestados < livro.quantidade) {
      usuario.livroEmprestado = livroId;
      livro.qtdEmprestados += 1;
      fs.writeFileSync(path.join(process.cwd(), "bd.json"), JSON.stringify(bd, null, 2));
      return res.status(200).json({ message: "Livro emprestado com sucesso!" });
    }

    return res.status(400).json({ message: "Não foi possível emprestar o livro" });
  }

  res.status(405).json({ message: "Método não permitido" });
}
