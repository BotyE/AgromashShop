import React, {useState, useContext} from 'react';
import { Context } from '../../index.js';
import { observer } from 'mobx-react-lite';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import { createCategoryShop } from '../../http/deviceApi';

const CreateCategoriesShop = observer(({update, show, onHide}) => {
    const {device} = useContext(Context)
    const [order, setOrder] = useState('')
    const [id, setId] = useState(0)

    const addCategory = () => {
        if(!id)
            return alert("Не выбрана категория")
        const formData = new FormData()
        formData.append('id', id)
        formData.append('order', order)
        createCategoryShop(formData).then(data => {
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
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить категорию на главную страницу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Label>Выберите категорию</Form.Label>
                <Form.Select 
                        value = {id}
                        onChange={e => setId(e.target.value)}
                        placeholder={"Выберите категорию"}>
                            <option value=''>Выберите категорию</option>
                        {device.categories.map(category => !device.categories.some(item => item.familyId === category.id) &&
                            <option value={category.id}>{category.name}</option>
                        )}
                    </Form.Select>
                    <Form.Label>Введите очередь</Form.Label>
                    <Form.Control
                        value={order}
                        onChange={e => setOrder(e.target.value)}
                        placeholder={"Введите очередь"}
                        type = "number"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCategory}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCategoriesShop;