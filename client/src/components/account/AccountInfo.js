import React, {useContext, useState, useEffect} from 'react';
import {Form, Button} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import styles from "./styles/AccountInfo.module.css";
import {getOne} from "../../http/userApi";


function AccountInfo({change}) {
    const {user} = useContext(Context)
    const [fio, setFIO] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        window.localStorage.removeItem('token')
        navigate(SHOP_ROUTE)
    }

    useEffect(() => {
      getOne(user.user.id).then( data => {
        setFIO(data.second_name + ' ' + data.first_name + ' ' + data.middle_name )
        setPhone(data.phone)
        setEmail(data.email)
      })
    }, [])
    
    return (
      <div className = { styles.container}>
        <Form className = { styles.form__profile }>
          
          <div className = { styles.form_form }>
          <h2 className = { styles.contact_infimation }>Контактная информация</h2>
          <div className = { styles.info__profile }>
            <Form.Label className = { styles.reg__label }>ФИО</Form.Label>
            <Form.Control
              className = { styles.profile__input }
              required = "true"
              value = { fio }
              disabled = {true}
              onChange={e => setFIO(e.target.value)}
              type = "name"
            />
            <Form.Label className = { styles.reg__label }>Номер телефона</Form.Label>
            <Form.Control
              className = { styles.profile__input }
              required = "true"
              value = {phone}
              disabled = {true}
              type = "tel"
            /> 
           <Form.Label className = { styles.reg__label }>E-mail</Form.Label>
            <Form.Control
              className = { styles.profile__input }
              required = "true"
              value = {email}
              disabled = {true}
              type = "email"
            /> 
          </div>
          
          <div style={{display: "flex", justifyContent:"space-between"}}>  
            <Button 
              className = { styles.change_btns }
              variant = { 'custom-login' }
              onClick = { () => {
                change()
              }}
            >
              <span>Изменить</span>
            </Button>                       
          
          <Button 
              className = { styles.leave_btns }
              variant = { 'custom-login' }
              onClick={() => logOut()}
            >
              <span>Выйти</span>
            </Button>  
            </div> 
          </div>
                    
        </Form>
      </div>
    );
  }
  
  export default AccountInfo;