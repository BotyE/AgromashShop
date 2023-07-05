import React from 'react';
import {Button, Image} from "react-bootstrap";
import styles from "./styles/ProductItem.module.css"
import basket from '../assets/add-to-cart.svg';

const ProductItem = ({device}) => {

    return (
        <div className = { styles.product}>
            <div>
                <Image 
                    className = { styles.avatar} 
                    src={process.env.REACT_APP_API_URL + device.img} />
                <p  className = { styles.tittle}>{device.name}</p>
                <div className = { styles.count_and_art}>
                    <p className = { styles.countity}>Есть в наличии: {device.count}</p>
                    <p className = { styles.art}>Арт: {device.article}</p>
                </div>
                <p className = { styles.price }>{device.price} Руб./Шт</p>
            </div>
            <div className = { styles.add_product_container }>
                <Button 
                    className = { styles.minus }
                    variant = { 'custom' }
                >
                    -
                </Button>
                <p className = { styles.count }>1</p>
                <Button 
                    className = { styles.plus }
                    variant = { 'custom' }
                >
                    +
                </Button>
                <Button 
                    className = { styles.add_to_cart }
                    variant = { 'custom' }
                >
                    <Image className = { styles.cart } src={basket}/>
                </Button>
            </div>
        </div>
    );
}

export default ProductItem;