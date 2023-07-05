import React, { useContext,useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Form } from "react-bootstrap";
import { recoveryConfirm} from "../http/userApi";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmRecovery = observer(() => {
    const navigate = useNavigate();
    const [password,setPassword] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')
    const {id} = useParams()
    const recoveryPassword = async () => {
        if(password.length<=7)
            return alert("Слишком короткий пароль")
        if(password!==passwordConfirm)
            return alert("Введеные пароли не одинаковы")
        await recoveryConfirm(password,id).then(data => {
                navigate("/login", {replace: true})
        })
    }
    
    return (
        <Card
        className = "d-flex justify-content-center align-items-center"
        style = {{ width: "300px", margin: "0px auto",border: "none" }}>
            <p style = {{fontSize: "22px", fontFamily: "Montserrat"}}>Восстановление пароля</p>
        <Form>
                <Form.Label style = {{fontSize: "15px", fontFamily: "Montserrat"}}>Введите пароль</Form.Label>
                <Form.Control
                style = {{fontSize: "15px", fontFamily: "Montserrat", marginBottom: "10px"}}
                required = "true"
                value = { password }
                onChange = { e => setPassword(e.target.value) }
                type = "password"/>
                <Form.Label style = {{fontSize: "15px", fontFamily: "Montserrat"}}>Повторите пароль</Form.Label>
                <Form.Control
                style = {{fontSize: "15px", fontFamily: "Montserrat", marginBottom: "10px"}}
                required = "true"
                value = { passwordConfirm }
                onChange = { e => setPasswordConfirm(e.target.value) }
                type = "password"/>
                <Button
                    variant="castom"
                    style={{backgroundColor: "#069942", color: "white", fontFamily: "Montserrat"}}
                    onClick={recoveryPassword}
                >Восстановить</Button>
            </Form>
        </Card>
    );

  })
  
  export default ConfirmRecovery;