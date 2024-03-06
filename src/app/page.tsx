'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { KeyboardEvent, useEffect, useState } from "react";
import { Client } from "./db";
import { Button, Form, Row, Col } from "react-bootstrap";
import RegisterModal from "./register";
import RouteModal from "./route_modal";

// Componente principal da aplicação
export default function Home() {
  // Estado para armazenar a lista de clientes
  const [users, setUsers] = useState<Client[]>([]);
  // Estados para controlar a exibição dos modais de cadastro e rota
  const [show, setShow] = useState(false);
  const [showR, setShowR] = useState(false);

  // Efeito que é acionado quando o componente é montado para buscar os clientes
  useEffect(() => {
    fetch("/api/clients")
      .then(r => r.json())
      .then(data => setUsers(data));
  }, []);
  
  // Mapeia os clientes para elementos de tabela
  let elmt = users.map(c => {
    return (
      <tr key={c.id}>
        <th scope="row">{c.id}</th>
        <td>{c.name}</td>
        <td>{c.email}</td>
        <td>{c.phone}</td>
        <td>{c.coord.x}, {c.coord.y}</td>
        <td>
          {/* Botão para deletar um cliente */}
          <Button onClick={() => fetch("/api/clients", { method: "DELETE", body: JSON.stringify(c.id) }).then(r => r.json()).then(data => setUsers(data))}>Deletar</Button>  
        </td>
      </tr>
    )
  });

  // Retorna a estrutura JSX da página
  return (
    <>
      <div className="m-auto">
        {/* Campo de busca */}
        <Row>
          <Col className="mx-auto" sm="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              onKeyUp={filter}
            />
          </Col>
        </Row>
        {/* Tabela de clientes */}
        <Row>
          <Col className="table_row m-auto" sm="auto">
            <table id="listClients" className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nome</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Coordenada</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {elmt}
              </tbody>
            </table>
          </Col>
        </Row>
        {/* Botões para cadastrar e calcular rota */}
        <Row>
          <Col className="ms-auto" sm="auto">
            <Button variant="outline-success" onClick={() => setShow(true)}>Cadastrar</Button>
          </Col>
          <Col className="me-auto" sm="auto">
            <Button variant="outline-primary" onClick={() => setShowR(true)}>Rota</Button>
          </Col>
        </Row>
      </div>
      {/* Modais de cadastro e rota */}
      <RegisterModal show={show} setShow={setShow} callback={setUsers} />
      <RouteModal show={showR} setShow={setShowR} />
    </>
  );
}

// Função para filtrar os clientes com base no valor do campo de busca
const filter = (e: KeyboardEvent<any>) => {
  Array.from(document.querySelectorAll("table#listClients tbody tr")).map(t => {
    if (Array.from(t.querySelectorAll("td")).map(td => td.innerText).some(text => text.search(e.currentTarget.value) != -1))
        t.classList.remove("d-none")
    else
        t.classList.add("d-none")
  })
}
