import React, {useContext, useState, useEffect} from 'react';
import {Table, Button} from "react-bootstrap";
import {Context} from "../index";
import styles from "./styles/Account.module.css";
import AccountInfo from '../components/account/AccountInfo';
import ChangeAccountInfo from '../components/account/ChangeAccountInfo';
import { fetchUserOrders } from '../http/deviceApi';
import { sqlToJsDate } from '../utils/func';
import AgreeDeleteOrder from '../components/modals/AgreeDeleteOrder';

function Account() {
    const {user} = useContext(Context)
    const [disabled, setDisabled] = useState(true)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deleteOrder, setDeleteOrder] = useState({})
    const [orders,setOrders] = useState([])

    const changeParams = () => {
      setDisabled(!disabled)
    }
    
    useEffect(() => {
      fetchUserOrders(user.user.id).then( data => setOrders(data))
    },[user.user.id])

    return (
      <div className = { styles.container}>
        <h1 className={styles.title}>Профиль</h1>
        <div>{disabled ? <AccountInfo change = {changeParams}/> : <ChangeAccountInfo change = {changeParams}/>}</div>
        <div className = { styles.buys_container }>
          <h2 className = { styles.boths }>Заказы</h2>
          <Table bordered className = { styles.table}>
            <tr className = { styles.first_row_basket }>
              <th className = { styles.first}>№ заказа</th>
              <th className = { styles.first}>Дата заказа</th>
              <th className = { styles.first}>Статус</th>
              <th className = { styles.first}>Товары в заказе</th>
              <th className = { styles.first}>Сумма заказа</th>
            </tr>
            {orders.map(order => 
            <tr className = { styles.next_row }>
              <td><p  className={styles.text}>{order.id}</p></td>
              <td><p  className={styles.text}>{sqlToJsDate(order.createdAt)}</p></td>
              <td>
                <p  className={styles.text}>{order.status}</p>
                {order.status === 'Создан' && 
                <Button 
                  variant='castom'
                  className={styles.delete}
                  onClick={( ) => {
                    setDeleteOrder(order)
                    setDeleteVisible(true)
                  }}
                  >Отменить</Button>}
              </td>
              <td>{order.device_list.map(device => <div style={{display:"flex", flexWrap:"wrap"}}>
                <p className={styles.text}>{device.name}&emsp;</p>
                <p className={styles.text}>x{device.basket_count}&emsp;</p>
                <p className={styles.text}>{device.price}р.</p>
              </div>
              )}</td>
              <td><p className={styles.text}>{order.sum} Рублей</p></td>
            </tr>
            )}
          </Table>
          <AgreeDeleteOrder show={deleteVisible} onHide={() => setDeleteVisible(false)} order = {deleteOrder}/>
        </div>
      </div>
    );
  }
  
  export default Account;