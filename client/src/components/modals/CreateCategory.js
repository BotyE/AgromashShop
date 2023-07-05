import React, {useState, useContext} from 'react';
import { Context } from '../../index.js';
import { observer } from 'mobx-react-lite';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createCategory} from "../../http/deviceApi";

const CreateCategory = observer(({update, show, onHide}) => {
    const {device} = useContext(Context)

    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [familyId, setFamilyId] = useState(0)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    function translit(word){
        var answer = '';
        var converter = {
            'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
            'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
            'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
            'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
            'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
            'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
            'э': 'e',    'ю': 'yu',   'я': 'ya', ' ': ''
        };
     
        for (var i = 0; i < word.length; ++i ) {
            if (converter[word[i]] === undefined){
                answer += word[i];
            } else {
                answer += converter[word[i]];
            }
        }
     
        return answer;
    }

    const addCategory = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('link', translit(name.toLowerCase()))
        formData.append('familyId', familyId)
        formData.append('img', file)
        createCategory(formData).then(data => {
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
                    Добавить Категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Введите название категории</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Введите название категории"}
                    />
                    <Form.Label>Выберите фотографию категории</Form.Label>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <Form.Label>Выберите родительскую категорию</Form.Label>
                    <Form.Select 
                        value = {familyId}
                        onChange={e => setFamilyId(e.target.value)}
                        placeholder={"Введите название категории"}>
                            <option value={0}>Основная категория</option>
                            <option value={0}>Основная категория</option>
                            <option value={0}>Основная категория</option>
                        {device.categories.map(category => 
                            <option value={category.id}>{category.name}</option>
                        )}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCategory}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCategory;