import type { NextApiRequest, NextApiResponse } from 'next'
import Db, { Client } from "../../app/db";
 
export default async function clients(
  req: NextApiRequest,
  res: NextApiResponse<Client[]>
) {
    const db = new Db();

    switch (req.method) {
      case "GET":
        res.status(200).json(await db.getClients())
    
        break;
      
      case "POST":
        let client = JSON.parse(req.body);
        res.status(200).json(await db.setClient(client))
        
        break;

      case "DELETE":
        let id = JSON.parse(req.body);
        res.status(200).json(await db.deleteClient(id))
        
        break;
    }
}