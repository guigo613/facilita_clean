import type { NextApiRequest, NextApiResponse } from 'next'
import Db, { Client } from "../../app/db";
 
export default async function clients(
  req: NextApiRequest,
  res: NextApiResponse<Client[]>
) {
    // Cria uma nova instância da classe Db.
    const db = new Db();

    // Switch case para determinar a ação com base no método HTTP da requisição.
    switch (req.method) {
      case "GET":
        // Se o método for GET, retorna todos os clientes.
        res.status(200).json(await db.getClients())
    
        break;
      
      case "POST":
        // Se o método for POST, adiciona um novo cliente.
        // O cliente é extraído do corpo da requisição e adicionado ao banco de dados.
        let client = JSON.parse(req.body);
        res.status(200).json(await db.setClient(client))
        
        break;

      case "DELETE":
        // Se o método for DELETE, remove um cliente existente.
        // O ID do cliente a ser removido é extraído do corpo da requisição e é removido do banco de dados.
        let id = JSON.parse(req.body);
        res.status(200).json(await db.deleteClient(id))
        
        break;
    }
}