import config from "../config/postgres.json";
import { Pool } from 'pg';

export type Coord = { x: number, y: number };

export type Client = {
    id?: number,
    name: string,
    email: string,
    phone: string,
    coord: Coord
}

export default class Db {
    pool: Pool;
    
    constructor() {
        // Cria uma nova instância de Pool para se conectar ao banco de dados PostgreSQL usando as configurações fornecidas em postgres.json
        this.pool = new Pool(config);

        // Cria a tabela caso não exista, algo simples que estou adicionando aqui apenas para evitar rodar esse teste sem ter criado a tabela antes
        // apenas para prevenção
        this.pool.query('CREATE TABLE IF NOT EXISTS clients ( \
            id      SERIAL PRIMARY KEY, \
            name    TEXT    NOT NULL, \
            email   TEXT    NOT NULL, \
            phone   TEXT    NOT NULL, \
            coordx  INTEGER NOT NULL, \
            coordy  INTEGER NOT NULL \
        );');
    }

    // Método para obter todos os clientes do banco de dados
    async getClients(): Promise<Client[]> {
        let result = await this.pool.query('SELECT id, name, email, phone, coordx, coordy FROM clients;');
        
        // Mapeia os resultados da consulta para objetos Client
        return result.rows.map(r => {
            return {
                id: r['id'],
                name: r['name'],
                email: r['email'],
                phone: r['phone'],
                coord: { x: r['coordx'], y: r['coordy'] },
            }
        });
    }

    // Método para adicionar um novo cliente ao banco de dados
    async setClient(client: Client): Promise<Client[]> {
        await this.pool.query('INSERT INTO clients (name, email, phone, coordx, coordy) VALUES ($1, $2, $3, $4, $5);', [client.name, client.email, client.phone, client.coord.x, client.coord.y]);
        
        // Retorna a lista atualizada de clientes após a inserção
        return await this.getClients();
    }

    // Método para excluir um cliente do banco de dados com base no ID fornecido
    async deleteClient(id: number): Promise<Client[]> {
        await this.pool.query('DELETE FROM clients WHERE id = $1;', [id]);
        
        // Retorna a lista atualizada de clientes após a exclusão
        return await this.getClients();
    }
}
