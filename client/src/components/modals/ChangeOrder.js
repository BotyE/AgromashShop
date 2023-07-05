import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Row, Col} from "react-bootstrap";
import {changeOrder} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const ChangeOrder = observer(({update, show, onHide,order}) => {
    const [individual, setIndividual] = useState({})
    const [deviceOrder, setDeviceOrder] = useState([])
    const [status, setStatus] = useState("")
    const [company, setCompany] = useState({ })

    const removedeviceOrder = (number) => {
        setDeviceOrder(deviceOrder.filter(i => i.id !== number))
    }
    const changedeviceOrder = (key, value, number) => {
        setDeviceOrder(deviceOrder.map(i => i.id === number ? {...i, [key]: value} : i))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('individual', JSON.stringify(individual))
        formData.append('company', JSON.stringify(company))
        formData.append('status', status)
        formData.append('devices', JSON.stringify(deviceOrder))
        changeOrder(order.id, formData).then(data => {
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
                  setIndividual({ ...order.individual})
                  setDeviceOrder(order.device_list)
                  setCompany({...order.company})
                  setStatus(order.status)
            }}
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить Товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Label>Выберите статус заказа</Form.Label>
                    <Form.Select 
                        value = {status}
                        onChange={e => setStatus(e.target.value)}
                        placeholder={"Выберите статус заказа"}>
                        {["Создан", "Ожидает отправки", "Отправлен" , "Выполнен"].map(elem => 
                            <option value={elem}>{elem}</option>
                        )}
                    </Form.Select>
                    <Form.Label>Введите ФИО заказчика</Form.Label>
                    <Form.Control
                        value={individual.fio}
                        onChange={e => setIndividual({ ...individual, fio: e.target.value })}
                        className="mt-3"
                        placeholder="Введите ФИО заказчика"
                    />
                    <Form.Label>Введите номер телефона</Form.Label>
                    <Form.Control
                        value={individual.phone}
                        onChange={e => setIndividual({ ...individual, phone: e.target.value })}
                        className="mt-3"
                        placeholder="Введите ФИО заказчика"
                    />
                    <Form.Label>Введите почту</Form.Label>
                    <Form.Control
                        value={individual.email}
                        onChange={e => setIndividual({ ...individual, email: e.target.value })}
                        className="mt-3"
                        placeholder="Введите ФИО заказчика"
                    />
                    {Object.keys(company).length !== 0 ? 
                    <div>
                    <Form.Label>Введите название компании</Form.Label>
                    <Form.Control
                        value={company.name}
                        onChange={e => setCompany({ ...company, name: e.target.value })}
                        
                        className="mt-3"
                        placeholder="Введите название компании"
                    />
                    <Form.Label>Введите ИНН</Form.Label>
                    <Form.Control
                        value={company.inn}
                        onChange={e => setCompany({ ...company, inn: e.target.value })}
                        className="mt-3"
                        placeholder="Введите ИНН"
                    />
                    <Form.Label>Введите КПП</Form.Label>
                    <Form.Control
                        value={company.kpp}
                        onChange={e => setCompany({ ...company, kpp: e.target.value })}
                        className="mt-3"
                        placeholder="Введите КПП"
                    />
                    <Form.Label>Введите КИП</Form.Label>
                    <Form.Control
                        value={company.kip}
                        onChange={e => setCompany({ ...company, kip: e.target.value })}
                        className="mt-3"
                        placeholder="Введите КИП"
                    />
                    <Form.Label>Введите юридический адрес</Form.Label>
                    <Form.Control
                        value={company.adress}
                        onChange={e => setCompany({ ...company, adress: e.target.value })}
                        className="mt-3"
                        placeholder="Введите юридический адрес"
                    />
                    <Form.Label>Введите рассчетный счет</Form.Label>
                    <Form.Control
                        value={company.payacc}
                        onChange={e => setCompany({ ...company, payacc: e.target.value })}
                        className="mt-3"
                        placeholder="Введите рассчетный счет"
                    />
                    <Button
                    onClick={ ()=> {
                        setCompany({})
                    }}
                    >Удалить юр. лицо</Button>
                    </div>
                    :
                    <Button
                    onClick={ ()=> {
                        setCompany({name: "",
                        inn: "",
                        kpp: "",
                        adress: "",
                        bik: "",
                        payacc: ""
                    })
                    }}
                    >Добавить юр. лицо</Button>
                    }   
                    <hr/>
                    
                    {deviceOrder.map(i =>
                        <Row className="mt-4" key={i.id}>
                            <Form.Label>{i.name}</Form.Label>
                            <Col md={4}>
                                
                                <Form.Label>Цена</Form.Label>
                                <Form.Control
                                    value={i.price}
                                    onChange={(e) => changedeviceOrder('price', e.target.value, i.id)}
                                    placeholder="Введите цену товара"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label>Количество</Form.Label>
                                <Form.Control
                                    value={i.basket_count}
                                    onChange={(e) => changedeviceOrder('basket_count', e.target.value, i.id)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removedeviceOrder(i.id)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeOrder;