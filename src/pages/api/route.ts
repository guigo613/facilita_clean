import type { NextApiRequest, NextApiResponse } from 'next'
import Db, { Client } from "../../app/db";
 
export default async function route(
  req: NextApiRequest,
  res: NextApiResponse<Client[]>
) {
    const db = new Db();
    let clients = await db.getClients();
    let route;
    
    if (!req.query.all)
        route = simpleRoute(clients);
    else
        route = allRoute(clients);

    res.status(200).json(route)
}

const allRoute = (clients: Client[]) => {
    let owner = {
        name: "Empresa",
        email: "",
        phone: "",
        coord: {
            x: 0,
            y: 0
        }
    };

    let result: { route: Client[], distance: number } | false = false;

    function calc(list: Client[], slice: Client[] = []) {
        if (list.length === 0) {
            let sum = 0;
            
            slice.unshift(owner);
            slice.push(owner);

            for (let i = 0; i < slice.length - 1;)
                sum += getDistance(slice[i], slice[++i]).range();

            if (!result || sum < result.distance)
                result = {
                    route: slice,
                    distance: sum
                }
            
            return;
        }

        for (let i = 0; i < list.length; i++) {
            const l = list.slice(0, i).concat(list.slice(i + 1));
            calc(l, slice.concat(list[i]));
        }
    }

    calc(clients);

    return (result as unknown as { route: Client[], distance: number }).route;
}

const simpleRoute = (clients: Client[]) => {
    let route = [{
        name: "Empresa",
        email: "",
        phone: "",
        coord: {
            x: 0,
            y: 0
        }
    }];

    while (clients.length) {
        let c = clients.shift() as Client;
        let d = getDistance(route[route.length - 1], c);

        for (let i = 0; i < clients.length; i++) {
            let d2 = getDistance(route[route.length - 1], clients[i]);

            if (d2.range() < d.range()) {
                c = clients.splice(i, 1, c)[0];
                d = d2;
            }
        }

        route.push(c);
    }
    route.push(route[0]);

    return route;
}

const getDistance = (a: Client, b: Client) => {
    return {
        x: Math.abs(a.coord.x - b.coord.x),
        y: Math.abs(a.coord.y - b.coord.y),
        range: function() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) }
    }
}