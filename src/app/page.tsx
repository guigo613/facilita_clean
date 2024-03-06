'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { KeyboardEvent, useEffect, useState } from "react";
import { Client } from "./db";
import { Button, Form, Row, Col } from "react-bootstrap";
import RegisterModal from "./register";
import RouteModal from "./route_modal";


export default function Home() {
  const [users, setUsers] = useState<Client[]>([]);
  const [show, setShow] = useState(false);
  const [showR, setShowR] = useState(false);

  useEffect(() => {
    fetch("/api/clients")
      .then(r => r.json())
      .then(data => setUsers(data));
  }, []);
  
  let elmt = users.map(c => {
    return (
      <tr key={c.id}>
        <th scope="row">{c.id}</th>
        <td>{c.name}</td>
        <td>{c.email}</td>
        <td>{c.phone}</td>
        <td>{c.coord.x}, {c.coord.y}</td>
        <td>
          <Button onClick={() => fetch("/api/clients", { method: "DELETE", body: JSON.stringify(c.id) }).then(r => r.json()).then(data => setUsers(data))}>Deletar</Button>  
        </td>
      </tr>
    )
  });

  return (
    <>
      <div className="m-auto">
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
        <Row>
          <Col className="ms-auto" sm="auto">
            <Button variant="outline-success" onClick={() => setShow(true)}>Cadastrar</Button>
          </Col>
          <Col className="me-auto" sm="auto">
            <Button variant="outline-primary" onClick={() => setShowR(true)}>Rota</Button>
          </Col>
        </Row>
      </div>
      <RegisterModal show={show} setShow={setShow} callback={setUsers} />
      <RouteModal show={showR} setShow={setShowR} />
    </>
  );
}

const filter = (e: KeyboardEvent<any>) => {
  Array.from(document.querySelectorAll("table#listClients tbody tr")).map(t => {
    if (Array.from(t.querySelectorAll("td")).map(td => td.innerText).some(text => text.search(e.currentTarget.value) != -1))
        t.classList.remove("d-none")
    else
        t.classList.add("d-none")
  })
}