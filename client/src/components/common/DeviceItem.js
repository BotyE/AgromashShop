import React from 'react';
import {Button} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {Link} from "react-router-dom"
import {DEVICE_ROUTE} from "../../utils/consts";
import styles from "./styles/ProductItem.module.css";
import BuyButton from './BuyButton';
import UnderOrder from './UnderOrder';

const DeviceItem = ({device}) => {

    return (
        <div className = { styles.product}>
            <Link to={DEVICE_ROUTE + '/' + device.id}>
                <Image alt = "avatar" className = { styles.avatar} src = { process.env.REACT_APP_API_URL + device.img } />
                <div>
                    <p  className = { styles.tittle}>{device.name}</p>
                    <div className = { styles.count_and_art}>
                        <p className = { styles.countity}>Есть в наличии: {device.count}</p>
                        <p className = { styles.art}>Арт: 111111</p>
                    </div>
                    <p className = { styles.price }>{device.price} Руб./Шт</p>
                 </div>
                </Link>
                    {device.count !== 0 ?
                        <BuyButton device={device}/>
                        :
                        <UnderOrder device={device}/>
                    }
                
            </div>
    );
};

export default DeviceItem;
