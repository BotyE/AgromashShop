import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Context } from '../../index';
import { getOne } from '../../http/userApi';
import { sendFeedbackMail } from '../../http/deviceApi';


const Feedback = () => {
    const {user} = useContext(Context)
    const [fio,setFIO] = useState("")
    const [email,setEmail] = useState("")
    const [text,setText] = useState("")
    const [phone,setPhone] = useState("")
    const [isSend, setIsSend] = useState(false)
    useEffect( () => {
        if(user.isAuth) {
            getOne(user.user.id).then( data => {
                setFIO(data.second_name + ' ' + data.first_name + ' ' + data.middle_name )
                setPhone(data.phone)
                setEmail(data.email)
              })
        }
        
    },[user.user.id])
 
    const sendFeedback = () => {
        const formData = new FormData()
        formData.append('fio', fio)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('text', text)
        sendFeedbackMail(formData).then( () => {
            setText("")
            setIsSend(true)
        })
    }

    return (
        <Container style={{maxWidth: "1000px"}}>
            {!isSend ? <div>
            <h1>Форма обратной связи</h1>
            <Form>
                <div>
                <div>
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control
                    value={fio}
                    onChange={e => setFIO(e.target.value)}
                    type='name'></Form.Control>
                </div>
                <div>
                    <Form.Label>Почта</Form.Label>
                    <Form.Control
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type='email'></Form.Control>
                </div>
                <div>
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    type='tel'></Form.Control>
                </div>
                </div>
                <Form.Label>Текст обращения!</Form.Label>
                    <Form.Control
                    value={text}
                    as="textarea" 
                    style={{resize: "none"}}
                    rows={6}
                    onChange={e => setText(e.target.value)}
                    type='text'></Form.Control>
                </Form>
                <Button
                onClick={() => {sendFeedback()}}
                >Отправить обращение</Button>
                </div>
                :
                <p>Спасибо что оставили обращение!</p>
            }
        </Container>
    );
    
};

export default Feedback;