import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import styles from "./styles/OpenCatalog.module.css"
import {changeOneDevice, fetchOneDevice} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const ChangeDevice = observer(({update, show, onHide,props}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [old_price, setOldPrice] = useState(0)
    const [count, setCount] = useState(0)
    const [article, setArticle] = useState("")
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}])
    }
    const addNewInfo = (newInfo) => {
        let m = []
        if(newInfo.length)
            newInfo.map( pInfo => {
                m.push({title: pInfo.title, description: pInfo.description, id: pInfo.id})
            setInfo(m)
    })}
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.id !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.id === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    function findCategory(id) {
        let result =  device.categories.filter(category => category.id === id )
        return result[0]
      }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('old_price', old_price)
        formData.append('article', article)
        formData.append('img', file)
        formData.append('description', description)
        formData.append('count', count)

        formData.append('categoryId', device.selectedCategory.id)
        formData.append('info', JSON.stringify(info))
        changeOneDevice(props.id, formData).then(data => {
            onHide()
            update()
        })
    }

    return (
        <Modal
            className={styles.modal_window}
            show={show}
            onHide={onHide}
            centered
            onShow={() => {
                    fetchOneDevice(props.id).then( (data) => {
                        setName(data.name)
                        setPrice(data.price)
                        setOldPrice(data.old_price)
                        setCount(data.count)
                        setArticle(data.article)
                        setId(data.id)
                        console.log(data.info)
                        setDescription(data.description)
                        addNewInfo(data.info || [])
                        device.setSelectedCategory(findCategory(data.categoryId))
                    })

            }}
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить Товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Form.Label>Категория товара</Form.Label>
                        <Dropdown.Toggle>{device.selectedCategory.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.categories.map(brand => !device.categories.some(item => item.familyId === brand.id) &&
                                <Dropdown.Item
                                    onClick={() => device.setSelectedCategory(brand)} 
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Label>Название товара</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название товара"
                    />
                    <Form.Label>Стоимость товара</Form.Label>
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость товара"
                        type="number"
                    />
                    <Form.Label>Старая стоимость товара (Если товар без скидки, то введите 0)</Form.Label>
                    <Form.Control
                        value={old_price}
                        onChange={e => setOldPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите старую стоимость товара (Если товар без скидки, то введите 0)"
                        type="number"
                    />
                    <Form.Label>Описание товара</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание товара"
                        type="text"
                    />
                    <Form.Label>Количество товара</Form.Label>
                    <Form.Control
                        value={count}
                        onChange={e => setCount(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите количество товара"
                        type="number"
                    />
                    <Form.Label>Артикул Товара товара</Form.Label>
                    <Form.Control
                        value={article}
                        onChange={e => setArticle(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите артукул товара"
                        type="number"
                    />
                    <Form.Label>Фото товара</Form.Label>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    
                    {info.map(i =>
                        <Row className="mt-4" key={i.id}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.id)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.id)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.id)}
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

export default ChangeDevice;