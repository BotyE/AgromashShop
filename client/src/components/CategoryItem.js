import React , {useContext} from 'react';
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {CATALOG_ROUTE} from "../utils/consts";
import styles from "./styles/ProductItem.module.css"
import { observer } from 'mobx-react-lite';
import {Context} from "../index";

const CategoryItem = observer(({update,category}) => {
    let {device} = useContext(Context)
    const navigate = useNavigate()

    return (
        <div className = { styles.product} onClick={() => {
            navigate(CATALOG_ROUTE + "/" + category.link)
            device.setSelectedCategory(category)
            device.setPage(1)
            update()
        }}>
            <Image alt = "avatar" className = { styles.avatar_cat} src = { process.env.REACT_APP_API_URL + category.img } />
            <p>{category.name}</p>   
        </div>
    );
});

export default CategoryItem;
