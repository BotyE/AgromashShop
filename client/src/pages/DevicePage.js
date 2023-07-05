import React, {useEffect, useState, useContext} from 'react';
import {Button, Image, Row} from "react-bootstrap";
import {Context} from "../index.js";
import avatar from '../assets/avatar.png'
import { Link, useNavigate, useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceApi";
import styles from "./styles/DevicePage.module.css"
import ReviewInDevice from '../components/ReviewInDevice';
import StarRating from '../components/common/StarRating';
import BuyButton from '../components/common/BuyButton';
import FollowButton from '../components/common/FollowButton';
import { CATALOG_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { findCategory } from '../utils/func';
import { observer } from 'mobx-react-lite';
import UnderOrder from '../components/common/UnderOrder.js';

const DevicePage = observer(() => {
    const navigate = useNavigate()
    const {device} = useContext(Context)
    const [devices, setDevice] = useState({info: []})
    const [category,setCategory] = useState({})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => {
            console.log(data.info)
            if(!data)
                navigate(SHOP_ROUTE)
            setCategory(findCategory(data.categoryId,device))
            setDevice(data)})
    }, [id])
    

    return (
        <div className = {styles.container}>
            <div className = { styles.catalog_tittle}>
                <Link className = { styles.catalog_tittle} to={CATALOG_ROUTE + '/'}>Каталог</Link>
                <p>&nbsp; - &nbsp; </p>
                <Link className = { styles.catalog_tittle} to={CATALOG_ROUTE + '/' + category.link}>{category.name}</Link>
            </div>
            <div className={styles.device}>
                <h2 className={styles.device_name}>{devices.name}</h2>
                <div className = { styles.under_photo }>
                    <p className = { styles.articul }>Арт. {devices.article}</p>
                    <div style={{display: "flex", alignItems:"center"}}>
                    <StarRating rate = {devices.rating} disabled={true}/>
                    <div className = { styles.rating }>
                        {devices.rating}
                    </div>
                    </div>
                    <FollowButton device={devices}/>
                </div>
                <div className = { styles.product}>
                    <Image width={300} height={300} src={devices.img ? process.env.REACT_APP_API_URL + devices.img : avatar}/>
                    <div className = {styles.discription}>
                        
                    <h3>Описание:</h3>
                    <p>{devices.description}</p>
                    </div>
                    {devices.count !== 0 ?
                        <div className = { styles.price_container }>
                            {devices.price<devices.old_price ?
                                <div>
                                    <p className = { styles.price }>Старая цена: {devices.old_price} Руб./Шт</p>
                                    <p className = { styles.price }>Скидка {100-Math.round(100*device.price/devices.old_price)}%</p>
                                    <p className = { styles.price }>{devices.price} Руб./Шт</p>
                                </div>
                                :
                                <p className = { styles.price }>{devices.price} Руб./Шт</p>
                            }
                            <BuyButton device={devices}/>
                            <h7 className = { styles.available }>Есть в наличии: {devices.count}</h7>
                        </div>
                        :
                        <div className = { styles.price_container }>
                            <p className = { styles.price }>{devices.price} Руб./Шт</p>
                            <UnderOrder device={devices}/>
                        </div>
                    }
                    
                </div>

            {devices.info.length!==0 && <div style={{marginTop:"50px"}}>
                <h1>Характеристики</h1>
                {devices.info.map((info, index) => 
                    <Row key={info.id} style={{background: index % 2 === 0 ? '#D9D9D9;' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </div>}

                <ReviewInDevice/>
                </div>
        </div>
    );
})

export default DevicePage;