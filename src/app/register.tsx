import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Client } from "./db";

export default function RegisterModal({ show, setShow, callback }: { show: boolean, setShow: (arg0: boolean) => void, callback?: (arg0: Client[]) => void }) {
    // Definição dos estados locais para armazenar os dados do formulário
    let [name, setName] = useState("");
    let [mail, setMail] = useState("");
    let [phone, setPhone] = useState("");
    let [coord, setCoord] = useState({x: 1, y: 1});

    // Função para enviar o formulário
    let sendForm = () => {
        // Faz uma requisição POST para a API de clientes com os dados do formulário
        fetch("/api/clients", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: mail,
                phone: phone,
                coord: coord,
            })
        }).then(res => res.json())
            .then(data => {
                // Se um callback foi fornecido, chama-o com os dados retornados pela API
                if (callback)
                    callback(data)
            })
        
        // Limpa os campos do formulário
        setName("");
        setMail("");
        setPhone("");
        setCoord({x: 1, y: 1});
    }
    
    // Retorna o modal de registro de cliente
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Formulário para inserir os dados do cliente */}
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome" onChange={(e) => setName(e.currentTarget.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" onChange={(e) => setMail(e.currentTarget.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" placeholder="Telefone" onChange={(e) => setPhone(e.currentTarget.value)} />
                    </Form.Group>
                    
                    {/* Inputs separados para as coordenadas X e Y */}
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formCoordX">
                                <Form.Label>Coordenada X</Form.Label>
                                <Form.Control type="number" placeholder="X" onChange={(e) => setCoord({ x: Number(e.currentTarget.value), y: coord.y })} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="formCoordY">
                                <Form.Label>Coordenada Y</Form.Label>
                                <Form.Control type="number" placeholder="Y" onChange={(e) => setCoord({ x: coord.x, y: Number(e.currentTarget.value) })} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* Botão para fechar o modal */}
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Fechar
                </Button>
                {/* Botão para enviar o formulário */}
                <Button variant="primary" onClick={() => {sendForm(); setShow(false)}}>
                    Enviar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
