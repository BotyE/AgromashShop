import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CategoryItem from "./CategoryItem";
import { useParams } from 'react-router-dom';
import styles from './styles/CategoryList.module.css'

const CategoryList = observer(() => {
    const {device} = useContext(Context)
    const {id} = useParams()

    const [result, setResult] = useState([])

    useEffect( () => {
        let selectCat = device.categories.find(item => item.link === id) 
        selectCat = !!selectCat ? selectCat : {id:0}
        setResult(device.categories.filter( category => category.familyId === selectCat.id))
    },[device.selectedCategory.id,id])

    return (
        <div className={styles.grid_container}>
            {result.map(category =>
                <CategoryItem className={styles.grid_item} update = {() => {}} key={category.id} category={category}/>                
            )}
        </div>
    );
});

export default CategoryList;