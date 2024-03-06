import type { NextApiRequest, NextApiResponse } from 'next'
import Db, { Client } from "../../app/db";
 
export default async function route(
  req: NextApiRequest,
  res: NextApiResponse<Client[]>
) {
    // Criação de uma nova instância da classe Db.
    const db = new Db();
    // Obtém os clientes da base de dados.
    let clients = await db.getClients();
    let route;
    
    // Verifica se a query "all" não está presente na requisição.
    if (!req.query.all)
        // Calcula a rota mais simples (não visitando todos os clientes).
        route = simpleRoute(clients);
    else
        // Calcula a rota visitando todos os clientes.
        route = allRoute(clients);

    // Retorna a rota calculada como resposta da API.
    res.status(200).json(route)
}

// Função para calcular a rota visitando todas as possibilidades (não recomendado).
const allRoute = (clients: Client[]) => {
    // Define um ponto inicial fictício (a empresa).
    let owner = {
        name: "Empresa",
        email: "",
        phone: "",
        coord: {
            x: 0,
            y: 0
        }
    };

    // Inicializa o resultado como falso.
    let result: { route: Client[], distance: number } | false = false;

    // Função recursiva para calcular todas as possíveis rotas.
    function calc(list: Client[], slice: Client[] = []) {
        // Se a lista estiver vazia, calcula a distância total da rota.
        if (list.length === 0) {
            let sum = 0;
            
            // Adiciona a empresa no início e no final da rota.
            slice.unshift(owner);
            slice.push(owner);

            // Calcula a distância total percorrida.
            for (let i = 0; i < slice.length - 1;)
                sum += getDistance(slice[i], slice[++i]).range();

            // Atualiza o resultado se for a melhor rota encontrada.
            if (!result || sum < result.distance)
                result = {
                    route: slice,
                    distance: sum
                }
            
            return;
        }

        // Para cada cliente na lista, calcula as rotas possíveis.
        for (let i = 0; i < list.length; i++) {
            const l = list.slice(0, i).concat(list.slice(i + 1));
            calc(l, slice.concat(list[i]));
        }
    }

    // Inicia o cálculo da rota.
    calc(clients);

    // Retorna a melhor rota encontrada.
    return (result as unknown as { route: Client[], distance: number }).route;
}

// Função para calcular a rota mais simples.
const simpleRoute = (clients: Client[]) => {
    // Inicia a rota com o ponto inicial (a empresa).
    let route = [{
        name: "Empresa",
        email: "",
        phone: "",
        coord: {
            x: 0,
            y: 0
        }
    }];

    // Enquanto houver clientes na lista.
    while (clients.length) {
        // Remove e obtém o próximo cliente da lista.
        let c = clients.shift() as Client;
        // Calcula a distância entre o último ponto da rota e o cliente.
        let d = getDistance(route[route.length - 1], c);

        // Itera sobre os clientes restantes.
        for (let i = 0; i < clients.length; i++) {
            // Calcula a distância entre o último ponto da rota e o cliente atual.
            let d2 = getDistance(route[route.length - 1], clients[i]);

            // Se a distância for menor que a anterior, atualiza o cliente e a distância.
            if (d2.range() < d.range()) {
                c = clients.splice(i, 1, c)[0];
                d = d2;
            }
        }

        // Adiciona o cliente à rota.
        route.push(c);
    }
    // Adiciona o ponto inicial novamente no final da rota.
    route.push(route[0]);

    // Retorna a rota final.
    return route;
}

// Função para calcular a distância entre dois pontos.
const getDistance = (a: Client, b: Client) => {
    return {
        x: Math.abs(a.coord.x - b.coord.x),
        y: Math.abs(a.coord.y - b.coord.y),
        // Calcula a distância euclidiana entre os pontos.
        range: function() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) }
    }
}