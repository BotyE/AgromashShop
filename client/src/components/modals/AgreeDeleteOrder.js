import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {deleteOrder} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const AgreeDeleteOrder = observer(({update, show, onHide,order}) => {

    const deleteItem = () => {
        deleteOrder(order.id).then(data => {
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
                    Удаление заказа №{order.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Удалить заказ №{order.id} </p>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={deleteItem}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AgreeDeleteOrder;