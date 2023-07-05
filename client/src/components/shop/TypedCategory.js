import React, { useState,useEffect } from 'react';
import {Image} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import next from "../../assets/next_rotate.svg"
import styles from "./styles/TypedCategory.module.css"
import { fetchCategoriesShop } from '../../http/deviceApi';
import DeviceItem from '../common/DeviceItem';
import { Link} from 'react-router-dom';
import { CATALOG_ROUTE } from '../../utils/consts';

const TypedCategory = observer(() => {
 
    const [categories,setCategories] = useState([])
    useEffect( () => {
        fetchCategoriesShop().then( data => setCategories(data))
      }, [])
    return (
        <div>
        {categories.map( category => {
            return (
            <div className = { styles.category_container}>
            <Link to = {CATALOG_ROUTE + '/' + category.link} className = {styles.category_name}><Image src = { next } alt = "next"/>{category.name}</Link>
            <div className = { styles.product_list}>
                {category.product.map( device => <DeviceItem device={device}/>)}
            </div>
        </div>
            )
        })}
        </div>
    );
});

export default TypedCategory;