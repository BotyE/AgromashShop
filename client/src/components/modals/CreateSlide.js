import React, {useState} from 'react';
import { observer } from 'mobx-react-lite';
import {Button, Form, Modal} from "react-bootstrap";
import {createSlide} from "../../http/deviceApi";

const CreateSlide = observer(({update, show, onHide}) => {

    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [order, setOrder] = useState('')
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addSlide = () => {
        if(!name || !link || !order)
            return alert("Не достаточно данных")
        if(!file)
            return alert("Файл не прикреплен")
        const formData = new FormData()
        formData.append('name', name)
        formData.append('link', link)
        formData.append('order', order)
        formData.append('img', file)
        createSlide(formData).then(data => {
            onHide()
            update()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Добавить Слайд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Введите название слайда</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Введите название слайда"}
                    />
                    <Form.Label>Введите ссылку</Form.Label>
                    <Form.Control
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        placeholder={"Введите ссылку"}
                    />
                    <Form.Label>Введите очередь</Form.Label>
                    <Form.Control
                        value={order}
                        onChange={e => setOrder(e.target.value)}
                        placeholder={"Введите очередь"}
                        type = "number"
                    />
                    <Form.Label>Выберите фотографию слайда</Form.Label>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addSlide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateSlide;