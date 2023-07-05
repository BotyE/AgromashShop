import React, {useContext, useState} from 'react';
import styles from './styles/commonStyles.module.css'
import { Button, Image } from 'react-bootstrap';
import { addItemBasket, sendUnderOrder } from '../../http/deviceApi';
import { Context } from '../../index.js';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { getOne } from '../../http/userApi';

const UnderOrder = ({device}) => { 
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const addUnderOrder = () => {
        if(user.isAuth) {
            getOne(user.user.id).then( data => {
                
            const formData = new FormData()
            formData.append('phone', data.phone)
            formData.append('email', data.email)
            formData.append('fio', data.second_name + ' ' + data.first_name + ' ' + data.middle_name)
            formData.append('product', device.name)
            sendUnderOrder(formData).then(data => alert("Спасибо за обращение."))
              })
        }
        else {
            navigate(LOGIN_ROUTE)
        }
       // sendUnderOrder()
    }

    return (
        <div>
            <Button 
                className = { styles.under_order }
                variant = { 'custom' }
                onClick = {addUnderOrder}
            >Товар под заказ</Button>
        </div>        
    )
}

export default UnderOrder