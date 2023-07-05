import React, { useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import styles from "./styles/UsersInAdmin.module.css"
import AgreeDelete from '../modals/AgreeDelete';
import { fetchCategoriesShop } from '../../http/deviceApi';
import CreateCategoriesShop from '../modals/CreateCategoriesShop';

const CategoriesShopInAdmin = observer(() => {
    const [categories,setCategories] = useState([])
    const [shopVisible, setShopVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deleteShopCategory, setDeleteShopCategory] = useState({
      name: "",
      id: 0,
      type: "shop",
      ru_type: "Категорию на главной"
  
    })

    useEffect( () => {
      fetchCategoriesShop().then( data => {
        setCategories(data)
      })
    }, [])

    const update = () => fetchCategoriesShop().then( data => {
      setCategories(data)
    })

    return (
        <div className = { styles.container }>
          <Button
            onClick={() => setShopVisible(true)}>
              Добавить Категорию на главную страницу
          </Button>
          <div className = {styles.user}>
            {categories.map(category => 
            <div>
              <p>{category.name}</p>
                {category.product.map( (elem,index) => 
                    <p>Товар №{index+1} {elem.name}</p>)}
                  <Button
                  onClick={() => {
                    setDeleteShopCategory({
                      name: category.name,
                      id: category.id,
                      type: "shop",
                      ru_type: "Категорию на главной"
                  
                    })
                    setDeleteVisible(true)
                  }}
                  >Удалить</Button>
              </div>
      
             )}
            </div>
            <CreateCategoriesShop update={update} show={shopVisible} onHide={() => setShopVisible(false)}/>
            <AgreeDelete update={update} show={deleteVisible} onHide={() => setDeleteVisible(false)} props = {deleteShopCategory}/>
        </div>
    );
});

export default CategoriesShopInAdmin;