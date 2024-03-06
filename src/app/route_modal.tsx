import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Client } from "./db";

export default function RouteModal({ show, setShow }: { show: boolean, setShow: (arg0: boolean) => void }) {
    // Estado local para armazenar a lista de clientes
    const [users, setUsers] = useState<Client[]>([]);

    // Efeito que é acionado quando `show` muda. Ele busca os clientes da rota quando o modal é exibido.
    useEffect(() => {
        fetch("/api/route")
            .then(r => r.json())
            .then(data => setUsers(data));
    }, [show]);
    
    // Mapeia os clientes para elementos de tabela.
    let elmt = users.map(c => {
        return (
        <tr key={c.id}>
            <th scope="row">{c.id}</th>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>{c.coord.x}, {c.coord.y}</td>
        </tr>
        )
    });
    
    // Retorna o modal que exibe a lista de clientes.
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table id="listClients" className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Coordenada</th>
                    </tr>
                </thead>
                <tbody>
                    {elmt}
                </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="success" onClick={() => fetch("/api/route?all=true").then(r => r.json()).then(data => setUsers(data))}>
                    Busca aprimorada
                </Button> */}
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
