import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Form, Table} from "react-bootstrap";
import styles from "./styles/OrdersInAdmin.module.css"
import { fetchOrders } from '../../http/deviceApi';
import { sqlToJsDate } from '../../utils/func';
import AgreeDelete from '../modals/AgreeDelete';
import ChangeOrder from '../modals/ChangeOrder';

const OrdersInAdmin = observer(() => {
    const [orders,setOrders] = useState([])
    const [changeVisible, setChangeVisible] = useState(false)
    const [changeOrder, setChangeOrder] = useState({})
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deleteOrder, setDeleteOrder] = useState({
      name: "",
      id: 0,
      type: "order",
      ru_type: "Заказ"
  
    })

    const [filteredOrders,setFilteredOrders] = useState([])
    const [search,setSearch] = useState("")
    const [status,setStatus] = useState("")
    useEffect( () => {
      fetchOrders().then( data => {
        setOrders(data)
        setFilteredOrders(data)
      })
    },[])
    useEffect( () => {
      setFilteredOrders(orders.filter(elem => {
        let name =  elem.individual.fio.toLowerCase()
        let lowerSearch = search.toLowerCase()
        if(name.includes(lowerSearch) && elem.status.includes(status)) 
          return elem
      }))
    },[search,status])

    const update = () => fetchOrders().then( data => {
      setOrders(data)
      setFilteredOrders(data)
    })

    return (
        <div className = { styles.container }>
          <div>
            <Form.Control 
            value={search}
            onChange = { (e) => setSearch(e.target.value)}
            />
            <Form.Select onClick={ (e) => setStatus(e.target.value)}>
              <option 
              value=""
              >Выберите статус заказа</option>
              <option 
              value="Создан"
              >Создан</option>
              <option 
              value="Ожидает отправки"
              >Ожидает отправки</option>
              <option 
              value="Отправлен"
              >Отправлен</option>
              <option 
              value ="Выполнен"
              >Выполнен</option>

            </Form.Select>
            
          </div>
          <Table bordered className = { styles.table}>
            <tr className = { styles.first_row_basket }>
              <th className = { styles.number}>№ заказа</th>
              <th className = { styles.data}>Дата заказа</th>
              <th className = { styles.status}>id Покупателя</th>
              <th className = { styles.status}>ФИО</th>
              <th className = { styles.status}>Юр.лицо</th>
              <th className = { styles.status}>Способ оплаты</th>
              <th className = { styles.status}>Способ доставки</th>
              <th className = { styles.name}>Товары в заказе</th>
              <th className = { styles.summ}>Сумма заказа</th>
              <th className = { styles.status}>Статус</th>
              <th className = { styles.status}>Изменить</th>
            </tr>
            {filteredOrders.map(order => 
            <tr className = { styles.next_row }>
              <td><p>{order.id}</p></td>
              <td><p>{sqlToJsDate(order.createdAt)}</p></td>
              <td><p>{order.userId}</p></td>
              <td><p>{order.individual.fio}</p></td>
              <td><p>{Object.keys(order.company).length !== 0 ? order.company.name : "Не юр.лицо"}</p></td>
              <td><p>{order.type_pay}</p></td>
              <td><p>{order.type_delivery}</p></td>
              <td>{order.device_list.map(device => <div>
                <p>{device.name}</p>
                <p>x{device.basket_count}</p>
                <p>{device.price}</p>
              </div>
              )}</td>
              <td><p>{order.sum} Рублей</p></td>
              <td><p>{order.status}</p></td>
              <td>
                <Button onClick={() => {
                      setChangeOrder(order)
                      setChangeVisible(true)
                    }
                  }>
                  Изменить
                </Button>
                <Button
                onClick={ () => {
                  setDeleteOrder({ 
                    name: `заказ пользователя ${order.individual.fio}`,
                    id: order.id,
                    type: "order",
                    ru_type: "Заказ"
                  })
                  setDeleteVisible(true)
                }}>
                  Удалить
                </Button>

              </td>
            </tr>
            )}
          </Table>
          <AgreeDelete update={update} show={deleteVisible} onHide={() => setDeleteVisible(false)} props = {deleteOrder}/>
          <ChangeOrder update={update} show={changeVisible} onHide={() => setChangeVisible(false)} order = {changeOrder}/>
        </div>
    );
});

export default OrdersInAdmin;