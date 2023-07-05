import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import {Button, Image, Form} from "react-bootstrap";
import styles from "./styles/ProductsInAdmin.module.css"
import CreateDevice from '../modals/CreateDevice';
import AgreeDelete from '../modals/AgreeDelete'
import { fetchDevices, fetchFilter} from '../../http/deviceApi';
import ChangeDevice from '../modals/ChangeDevice'
import Pages from '../Pages';
import { compare } from '../../utils/func';

const ProductsInAdmin = observer(() => {
  const {device} = useContext(Context)
  const [deviceVisible, setDeviceVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [filteredDevice, setFilteredDevice] = useState([])
  const [search,setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [deleteDevice, setDeleteDevice] = useState({
    name: "",
    id: 0,
    type: "device",
    ru_type: "Товар"

  })
  const [changeVisible, setChangeVisible] = useState(false)
  const [changeDevice, setChangeDevice] = useState(device.devices[0])

  function findCategory(id) {
    let result =  device.categories.filter(category => category.id === id )
    return result[0]
  }
  useEffect(() => {
    fetchDevices(filterCategory, device.page).then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
        setFilteredDevice(data.rows)
        device.setPage(1)
    })
}, [filterCategory])

useEffect(() => {
  fetchDevices(filterCategory, device.page).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
      setFilteredDevice(data.rows)
  })
}, [device.page])
const update = () => fetchDevices(filterCategory, 1).then(data => {
  device.setDevices(data.rows)
  device.setTotalCount(data.count)
  setFilteredDevice(data.rows)
})

useEffect(() => {
  fetchFilter(search,device.page).then(data => {
    device.setTotalCount(data.count)
  setFilteredDevice(data.rows) }
    )
  
},[search,device.page])
    return (
        <div className = { styles.container }>
          <Button
            variant='castom'
            className={styles.add_product}
            onClick={() => setDeviceVisible(true)}>
              Добавить Товар
          </Button>
          <Form.Control 
            className={styles.search}
            value={search}
            onChange = { (e) => setSearch(e.target.value)}
            />
            <Form.Select className={styles.select} onClick={ (e) => setFilterCategory(e.target.value)}>
              <option 
              value=""
              >Выберите категорию товара</option>
              {device.categories.map(category => !device.categories.some(item => item.familyId === category.id) &&
                <option 
                value={category.id}
                >{category.name}</option>)}

            </Form.Select>
          <div className = {styles.product_div}>
          {filteredDevice.map(device => {
            return (
            <div key={device.id} className={styles.one_device}>
              <Image 
                    className = { styles.avatar} 
                    src = { process.env.REACT_APP_API_URL + device.img } />
                    <p  className = { styles.tittle}>id: {device.id}</p>  
                <p  className = { styles.title}>Категория: {findCategory(device.categoryId).name}</p>    
                <p  className = { styles.title}>Название: {device.name}</p>
                <div className = { styles.count_and_art}>
                    <p className = { styles.title}>Количество: {device.count}</p>
                    <p className = { styles.title}>Артикул: {device.article}</p>
                </div>
                
                <p className = { styles.title}>Цена: {device.price} Руб./Шт</p>
                <p className = { styles.title}>Старая цена: {device.old_price} Руб./Шт</p>
                <div style={{display: "flex", justifyContent: "space-between"}}> 
                <Button 
                  variant='castom'
                  className={styles.add_product}
                  onClick={() => {
                      setChangeDevice(device)
                      setChangeVisible(true)
                    }
                  }>Изменить</Button>
                <Button  
                  variant='castom'
                  className={styles.add_product}
                onClick={() => {
                  setDeleteDevice(
                    {
                      name: device.name,
                      id: device.id,
                      type: 'device',
                      ru_type: "Товар"}
                    )
                  setDeleteVisible(true)
                  }}>Удалить</Button>
                  </div>
                </div>
          )}
            )}
            
            </div>
            <Pages device={device}/>
            <CreateDevice update={update} show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <AgreeDelete update={update} show={deleteVisible} onHide={() => setDeleteVisible(false)} props = {deleteDevice}/>
            <ChangeDevice update={update} show={changeVisible} onHide={() => setChangeVisible(false)} props = {changeDevice}/>
        </div>
    );
});

export default ProductsInAdmin;