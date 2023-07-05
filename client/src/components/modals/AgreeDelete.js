import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {deleteOneItem} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const AgreeDelete = observer(({update, show, onHide,props}) => {

    const deleteItem = () => {
        deleteOneItem(props.id,props.type).then(data => {
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
                    Удалить {props.ru_type}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Удалить {props.name}?</p>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={deleteItem}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AgreeDelete;