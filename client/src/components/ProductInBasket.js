import React, { useState,useContext, useEffect } from "react";
import {Button, Image} from "react-bootstrap";
import styles from './styles/ProductInBasket.module.css'
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { addItemBasket, deleteItemBasket } from "../http/deviceApi";
import {useNavigate} from "react-router-dom"
import { DEVICE_ROUTE } from "../utils/consts";
import FollowButton from "./common/FollowButton";

const ProductInBasket = observer(({basket, num,userBasket, create,update}) => {
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [count, setCount] = useState(basket.basket_count)
    
    useEffect( () => setCount(basket.basket_count),[basket])
    function findCategory(id) {
        let result =  device.categories.filter(category => category.id === id )
        return result[0]
      }

    const addItem = () => {
        if(basket.count>=count+1)
        {
            if(user.isAuth){
            setCount(count+1)
            addItemBasket(basket.id, user.user.id,1).then(data => {update()})
            }
            else {
                let basketStorage = JSON.parse(localStorage.getItem('basket'))
                const pos = basketStorage.map(e => e.id).indexOf(basket.id);
                basketStorage[pos].basket_count= count+1;
                window.localStorage.setItem('basket', JSON.stringify([...basketStorage]))
                update()
            }


        }
    }
    const minusItem = () => {
        if(count-1!==0)
        {
            if(user.isAuth){
            setCount(count-1)
            addItemBasket(basket.id, user.user.id,-1).then(data => {update()})
            }
            else {
                let basketStorage = JSON.parse(localStorage.getItem('basket'))
                const pos = basketStorage.map(e => e.id).indexOf(basket.id);
                basketStorage[pos].basket_count= count-1;
                window.localStorage.setItem('basket', JSON.stringify([...basketStorage]))
                update()
            }

        }
        else {
            if(user.isAuth)
                deleteItemBasket(basket.id,user.user.id).then(data => {update()})
            else {
                let basketStorage = JSON.parse(localStorage.getItem('basket'))
                const pos = basketStorage.map(e => e.id).indexOf(basket.id);
                basketStorage.splice(pos,1)
                window.localStorage.setItem('basket', JSON.stringify([...basketStorage]))
                update()
            }

        }
    }

    return(
            <tr className = { styles.product_in_basket }>
                <td><p className = { styles.number }>{num+1}</p></td>
                <td><Image onClick={() => navigate(DEVICE_ROUTE + '/' + basket.id)} alt = "avatar" className = { styles.avatar__product } src = {process.env.REACT_APP_API_URL + basket.img}/></td>
                <td className = { styles.name_product }>
                    <div className = { styles.name_product }>
                        <h6 onClick={() => navigate(DEVICE_ROUTE + '/' + basket.id)} className = { styles.category_product }>{findCategory(basket.categoryId).name}</h6>
                        <p onClick={() => navigate(DEVICE_ROUTE + '/' + basket.id)} className = { styles.title_product }>{basket.name}</p>
                        <div className = { styles.code_and_heart }>
                            <h7 className = { styles.code_product }>Код товара: {basket.article}</h7>
                            <FollowButton device={basket}/>
                        </div>
                    </div>
                </td>
              <td className = {styles.price_td}>
                    <div className = { styles.price_container }>
                        <div className = { styles.add_product_container }>
                            <Button 
                                onClick={minusItem}
                                className = { styles.minus }
                                variant = { 'custom' }
                            >-</Button>
                            <p className = { styles.count }>{count}</p>
                            <Button 
                                onClick={addItem}
                                className = { styles.plus }
                                variant = { 'custom' }
                            >+</Button>
                        </div>
                        <h7 className = { styles.available }>Есть в наличии: {basket.count}</h7>    
                    </div>
                    <p className = { styles.price }>{(basket.price>=basket.old_price) ? Math.round((basket.price*basket.basket_count*((100-userBasket.discount)/100))) : basket.price*basket.basket_count} Руб.</p>
                </td>
              </tr>

    );
    })
export default ProductInBasket;