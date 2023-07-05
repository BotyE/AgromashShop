import React, {useContext, useState} from 'react';
import {Container, Form, Image} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link, useLocation, useNavigate } from "react-router-dom";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, RECOVERY_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import styles from "./styles/Auth.module.css";
import google from "../assets/google.png";
import vklogin from "../assets/vklogin.png";
import { validateEmail, validatePhone } from '../utils/func';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE || location.pathname === ACCOUNT_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [second_name, setSecondName] = useState('')
    const [middle_name, setMiddleName] = useState('')
    const [phone, setPhone] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                if(!validateEmail(email))
                    return alert('Почта указана неправильно')
                if(!validatePhone(phone))
                    return alert('Телефон указан неправильно')
                if(password.length<=7)
                    return alert('Длина пароля меньше 8 символов')

                data = await registration(email, password, first_name, second_name, middle_name, phone);
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(ACCOUNT_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <div
            className = "d-flex justify-content-center align-items-center"
        >
            <Card style={{border:"none"}} >
            {isLogin ?
            <div>
                <h2 className = { styles.reg__tittle }>Личный кабинет</h2>
                <Form className = "d-flex flex-column">

                    <Form.Label className = { styles.reg__label }>E-mail</Form.Label>
                    <Form.Control
                        className = { styles.reg__input }
                        required = "true"
                        value = { email }
                        onChange = { e => setEmail(e.target.value) }
                        type = "email"
                    />
                    <Form.Label className = { styles.reg__label }>Пароль <Link to={RECOVERY_ROUTE}>Забыл пароль?</Link></Form.Label>
                    <Form.Control
                        className = { styles.reg__input }
                        required = "true"
                        value = { password }
                        onChange = { e => setPassword(e.target.value) }
                        type = "password"
                    /> 
                    <div className = { styles.login_bnts }>
                        
                        <Button 
                            variant = { 'custom-login' }
                            className={styles.btn_custom_login}
                            onClick = { click }
                        >
                            <span>Войти</span>
                        </Button>
                            <Button 
                                variant = { "custom-reg" }
                                className={styles.btn_custom_reg}
                                onClick = { () => navigate(REGISTRATION_ROUTE) }
                            >
                                <span>Регистрация</span>
                            </Button>              
                    </div>
                </Form>
                </div>
                    :
                    <div>
                        <h2 className = { styles.reg__tittle }>Регистрация</h2>
                <Form className = "d-flex flex-column">
                    <Form.Label className = { styles.reg__label }>E-mail</Form.Label>
                    <Form.Control
                        required = "true"
                        className = { styles.reg__input }
                        value = { email }
                        onChange = { e => setEmail(e.target.value) }
                        type = "email"
                    />
                    <Form.Label className = { styles.reg__label }>Пароль</Form.Label>
                    <Form.Control
                        required = "true"
                        className = { styles.reg__input }
                        value = { password }
                        onChange = { e => setPassword(e.target.value) }
                        type = "password"
                    /> 
                    <Form.Label className = { styles.reg__label }>Имя</Form.Label>
                    <Form.Control
                        required = "true"
                        className = { styles.reg__input }
                        value={ first_name}
                        onChange = { e => setFirstName(e.target.value) }
                        type = "name"
                    /> 
                    <Form.Label className = { styles.reg__label }>Отчество</Form.Label>
                    <Form.Control
                        required = "true"
                        className = { styles.reg__input }
                        value={ middle_name}
                        onChange = { e => setMiddleName(e.target.value) }
                        type = "name"
                    /> 
                    <Form.Label className = { styles.reg__label }>Фамилия</Form.Label>
                    <Form.Control
                        required = "true"
                        className = { styles.reg__input }
                        value={ second_name}
                        onChange = { e => setSecondName(e.target.value) }
                        type = "name"
                    /> 
                    <Form.Label className = { styles.reg__label }>Номер телефона</Form.Label>
                    <Form.Control
                        required = "true"
                        className = { styles.reg__input }
                        value = { phone }
                        onChange = { e => setPhone(e.target.value) }
                        type = "phone"
                    /> 
                    <div className = { styles.login_bnts }>
                        
                        <Button 
                            variant = { 'custom-login' }
                            className={styles.btn_custom_login}
                            onClick = { click }
                        >
                            <span>Регистрация</span>
                        </Button>
                        <div style={{marginTop: "30px",display: 'flex', flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                            <p>Уже есть Аккаунт?</p>
                            <Button 
                                style={{marginTop: "0px"}}
                                variant = {"custom-reg"}
                                className={styles.btn_custom_reg}
                                onClick = {() => navigate(LOGIN_ROUTE)}
                            >
                                <span>Вход</span>
                            </Button>    
                        </div>          
                    </div>
                </Form>
                </div>
}
            </Card>
        </div>
    );
});

export default Auth;