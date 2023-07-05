import React, {useState} from "react";
import styles from './styles/UserElement.module.css'
import AgreeDelete from "./modals/AgreeDelete";
import ChangeUser from "./modals/ChangeUser"
import { Button } from "react-bootstrap";

const UserElement = ({user}) => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [changeVisible, setChangeVisible] = useState(false)
    const [deleteUser, setDeleteUser] = useState({
      name: "",
      id: 0,
      type: "user",
      ru_type: "Пользователя"
  
    })
    const updateDevice = () => {
  
    }
    return (
        <div className = { styles.user }>
            <div className = { styles.user_info }>
                <p>id: {user.id}</p>
                <p className = { styles.profile__input }>
                    ФИО: { user.second_name + ' ' + user.first_name + ' ' + user.middle_name}</p>
                <p className = { styles.profile__input }>
                    Номер телефона: {user.phone}</p>
                <p className = { styles.profile__input }>
                    E-mail: {user.email}</p> 
                <p>Сумма заказов: 126 110 Рублей</p>
                <p>Количество заказов: 12</p>
                <p>Скидка пользователя: {user.discount}%</p>
                <div  style={{display: "flex"}}>
                    <Button onClick={() => setChangeVisible(true)}>Изменить</Button>
                    <Button onClick={() => {
                        setDeleteUser(
                        {
                            name: user.first_name+" " +user.middle_name + " " + user.second_name,
                            id: user.id,
                            type: 'user',
                            ru_type: "Пользователя"}
                        )
                        setDeleteVisible(true)
                    }}>Удалить</Button>
                </div>
            </div>
            <ChangeUser user={user} update = {updateDevice} show={changeVisible} onHide={() => setChangeVisible(false)}/>
            <AgreeDelete show={deleteVisible} onHide={() => setDeleteVisible(false)} props = {deleteUser}/>
      </div>
      )
}

export default UserElement