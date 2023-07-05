import React, { useState} from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Form } from "react-bootstrap";
import { recoveryUser } from "../http/userApi";
import { validateEmail } from "../utils/func";
const RecoveryPassword = observer(() => {
    const [email,setEmail] = useState('')
    const recoveryPassword = async () => {
        if(!validateEmail(email))
            return alert("Не правильно указана почта")
        await recoveryUser(email).then(data => {
                console.log(data)
        })
    }
    
    return (
        <Card
            className = "d-flex justify-content-center align-items-center"
            style = {{ width: "300px", margin: "0px auto",border: "none" }}>
            <p style = {{fontSize: "22px", fontFamily: "Montserrat"}}>Восстановление пароля</p>
            <Form>
                <Form.Label style = {{fontSize: "15px", fontFamily: "Montserrat"}}>Введите почту</Form.Label>
                <Form.Control
                 style = {{fontSize: "15px", fontFamily: "Montserrat", marginBottom: "10px"}}
                required = "true"
                value = { email }
                onChange = { e => setEmail(e.target.value) }
                type = "email"/>
                <Button
                    variant="castom"
                    style={{backgroundColor: "#069942", color: "white", fontFamily: "Montserrat"}}
                    onClick={recoveryPassword}
                >Восстановить</Button>
            </Form>
        </Card>
    );

  })
  
  export default RecoveryPassword;