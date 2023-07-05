import React, {useContext, useState} from 'react';
import styles from './styles/commonStyles.module.css'
import { Button, Image } from 'react-bootstrap';
import basket from '../../assets/add-to-cart.svg';
import { addItemBasket } from '../../http/deviceApi';
import { Context } from '../../index.js';

const BuyButton = ({device}) => { 
    const [count,setCount] = useState(1)
    const {user} = useContext(Context)
    const addItem = () => {
        if(device.count>=count+1)
            setCount(count+1)
    }
    const minusItem = () => {
        if(count-1!==0)
            setCount(count-1)
    }

    const addToBasket = () => {
        if(user.isAuth) {
            addItemBasket(device.id, user.user.id,count).then(data => {})
        }
        else {
            let basketStorage = JSON.parse(localStorage.getItem('basket'))
            device['basket_count'] = count;
             if(basketStorage)
            {
                if(basketStorage.some( elem => elem.id === device.id))
                    {
                        const pos = basketStorage.map(e => e.id).indexOf(device.id);
                        basketStorage[pos].basket_count= basketStorage[pos].basket_count+count<device.count ? basketStorage[pos].basket_count+count : device.count;
                        window.localStorage.setItem('basket', JSON.stringify([...basketStorage]))
                    }
                else
                    window.localStorage.setItem('basket', JSON.stringify([...basketStorage,device]))

            }
            else window.localStorage.setItem('basket', JSON.stringify([device]))
        }
    }

    return (
        <div className = { styles.add_product_container }>
            <Button 
                className = { styles.minus }
                variant = { 'custom' }
                onClick = {minusItem}
            >-</Button>
            <p className = { styles.count }>{count}</p>
            <Button 
                className = { styles.plus }
                variant = { 'custom' }
                onClick = {addItem}
            >+</Button>
            <Button 
                className = { styles.add_to_cart }
                variant = { 'custom' }
                onClick = {addToBasket}
            ><Image alt = "basket" className = { styles.cart } src={basket}/></Button>
        </div>        
    )
}

export default BuyButton