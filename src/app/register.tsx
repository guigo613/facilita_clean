import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Client } from "./db";

export default function RegisterModal({ show, setShow, callback }: { show: boolean, setShow: (arg0: boolean) => void, callback?: (arg0: Client[]) => void }) {
    let [name, setName] = useState("");
    let [mail, setMail] = useState("");
    let [phone, setPhone] = useState("");
    let [coord, setCoord] = useState({x: 1, y: 1});


    let sendForm = () => {
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
                if (callback)
                    callback(data)
            })
        
        setName("");
        setMail("");
        setPhone("");
        setCoord({x: 1, y: 1});
    }
    
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={() => {sendForm(); setShow(false)}}>
                    Enviar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}