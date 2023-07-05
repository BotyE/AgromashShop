import React, {useState} from "react";
import { Modal, Form,Button } from "react-bootstrap";
import { changeUserInAdmin } from "../../http/userApi";

const ChangeUser = ({update,show,onHide,user}) => {
    const [first_name, setFirstName] = useState('')
    const [middle_name, setMiddleName] = useState('')
    const [second_name, setSecondName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [discount, setDiscount] = useState('')


    const changeCategory = () => {  
        changeUserInAdmin(user.id, email, first_name, second_name, middle_name, phone, discount).then(data => {
            onHide()
            update()
        })
    }
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            onShow={() => {
                setFirstName(user.first_name)
                setSecondName(user.second_name)
                setMiddleName(user.middle_name)
                setPhone(user.phone)
                setEmail(user.email)
                setDiscount(user.discount)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить Пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Введите Имя</Form.Label>
                    <Form.Control
                        value={first_name}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder={"Введите Имя"}
                    />
                    <Form.Label>Введите Отчество</Form.Label>
                    <Form.Control
                        value={middle_name}
                        onChange={e => setMiddleName(e.target.value)}
                        placeholder={"Введите Отчество"}
                    />
                    <Form.Label>Введите Фамилию</Form.Label>
                    <Form.Control
                        value={second_name}
                        onChange={e => setSecondName(e.target.value)}
                        placeholder={"Введите Фамилию"}
                    />
                    <Form.Label>Введите телефон</Form.Label>
                    <Form.Control
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder={"Введите телефон"}
                    />
                    <Form.Label>Введите почту</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={"Введите почту"}
                    />
                    <Form.Label>Введите скидку</Form.Label>
                    <Form.Control
                        value={discount}
                        onChange={e => setDiscount(e.target.value)}
                        placeholder={"Введите скидку"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={changeCategory}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ChangeUser