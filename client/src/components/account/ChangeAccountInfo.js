import React, {useContext, useState, useEffect} from 'react';
import {Form, Button} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import styles from "./styles/ChangeAccountInfo.module.css";
import {changeUser, getOne} from "../../http/userApi";


function ChangeAccountInfo({change}) {
    const {user} = useContext(Context)
    const [first_name, setFirstName] = useState("")
    const [middle_name, setMiddleName] = useState("")
    const [second_name, setSecondName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(SHOP_ROUTE)
    }
  
    const changeParams = async() => {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('first_name', first_name)
      formData.append('second_name', second_name)
      formData.append('middle_name', middle_name)
      formData.append('phone', phone)
      try {
        const data = await changeUser(user.user.id,formData)  
        change()

      } catch (e) {
        alert(e.response.data.message)
      }
    }
    useEffect(() => {
      getOne(user.user.id).then( data => {
        setFirstName(data.first_name)
        setMiddleName(data.middle_name)
        setSecondName(data.second_name)
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
            <Form.Label className = { styles.reg__label }>Имя</Form.Label>
            <Form.Control
              className = { styles.profile__input }
              required = "true"
              value = { first_name }
              onChange={e => setFirstName(e.target.value)}
              type = "first_name"
            />
            <Form.Label className = { styles.reg__label }>Отчество</Form.Label>
            <Form.Control
              className = { styles.profile__input }
              required = "true"
              value = { middle_name }
              onChange={e => setMiddleName(e.target.value)}
              type = "second_name"
            />
            <Form.Label className = { styles.reg__label }>Фамилия</Form.Label>
            <Form.Control
              className = { styles.profile__input }
              required = "true"
              value = { second_name }
              onChange={e => setSecondName(e.target.value)}
              type = "name"
            />
            <Form.Label className = { styles.reg__label }>Номер телефона</Form.Label>
            <Form.Control
              className = { styles.profile__input }
              required = "true"
              value = {phone}
              onChange={e => setPhone(e.target.value)}
              type = "phone"
            /> 
           <Form.Label className = { styles.reg__label }>E-mail</Form.Label>
            <Form.Control
              className = { styles.profile__input }
              required = "true"
              value = {email}
              onChange={e => setEmail(e.target.value)}
              type = "email"
            />
            <Form.Label className = { styles.reg__label }>Введите пароль для подтверждения</Form.Label>
            <Form.Control
              className = { styles.profile__input }
              required = "true"
              value = {password}
              onChange={e => setPassword(e.target.value)}
              type = "password"
            />
          </div>
          <div style={{display: "flex", justifyContent:"space-between"}}>  
            <Button 
              className = { styles.change_btns }
              variant = { 'custom-login' }
              onClick = { () => {
                changeParams()
              }}
            >
              <span>Сохранить</span>
            </Button>
            <Button 
              className = { styles.leave_btns }
              variant = { 'custom-login' }
              onClick = { () => {
                change()
              }}
            >
              <span>Отменить</span>
            </Button>                         
          </div>
          </div>
                    
        </Form>
      </div>
    );
  }
  
  export default ChangeAccountInfo;