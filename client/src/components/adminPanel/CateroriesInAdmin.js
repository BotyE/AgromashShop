import React, {useContext, useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Table, Button,Image, Form} from "react-bootstrap";
import styles from "./styles/CategoriesInAdmin.module.css"
import CreateCategory from '../modals/CreateCategory';
import { fetchCategories } from '../../http/deviceApi';
import ChangeCategory from '../modals/ChangeCategory';
import AgreeDelete from '../modals/AgreeDelete'

const CategoriesInAdmin = observer(() => {
    const {device} = useContext(Context)
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [changeVisible, changeCategoryVisible] = useState(false)
    const [filteredCategory, setFilteredCategory] = useState([])
    const [search,setSearch] = useState("")
    const [changeCategory, setChangeCategory] = useState({
      name: "",
      familyId:0

    })
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deleteCategory, setDeleteCategory] = useState({
      name: "",
      id: 0,
      type: "category",
      ru_type: "Категорию"

    })
    
    const update = () => {
      fetchCategories().then(data => {
        device.setCategories(data)
      })
    }

    useEffect(() => {
      setFilteredCategory(device.categories)
    }, [device.categories])
    
    useEffect(() => {
      setFilteredCategory(device.categories.filter( (elem => {
        let name =  elem.name.toLowerCase()
        let lowerSearch = search.toLowerCase()
        if(name.includes(lowerSearch))
          return elem
      })))
    },[search])

    return (
        <div className = { styles.container }>
          <Button
            variant='castom'
            className={styles.add_category}
            onClick={() => setCategoryVisible(true)}>
              Добавить Категорию
          </Button>
          <Form.Control 
            className={styles.search}
            value={search}
            onChange = { (e) => setSearch(e.target.value)}
            />
          <div className = { styles.table}>
            {filteredCategory.map(category =>
              <div className = { styles.collumn }>
                <Image alt = "avatar" className = { styles.avatar} src = { process.env.REACT_APP_API_URL + category.img } />
                <p>id: {category.id}</p>
                <p>Название: {category.name}</p>
                  <div  style={{display: "flex", justifyContent:"space-between"}}>
                    <Button 
                      variant='castom'
                      className={styles.add_category}
                      onClick={() => {
                        changeCategoryVisible(true)
                        setChangeCategory(category)
                        }}  
                    >Изменить</Button>
                    <Button 
                      variant='castom'
                      className={styles.add_category}
                      onClick={() => {
                        setDeleteCategory({
                            name: category.name,
                            id: category.id,
                            type: 'category',
                            ru_type: "Товар"
                          })
                        setDeleteVisible(true) 
                    }}>Удалить</Button>
                  </div>
                  </div>
            )}
          </div>
          <CreateCategory update={update} show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
          <ChangeCategory update={update} show={changeVisible} props = {changeCategory} onHide={() => changeCategoryVisible(false)} />
          <AgreeDelete update={update} show={deleteVisible} onHide={() => setDeleteVisible(false)} props = {deleteCategory}/>
        </div>
    );
});

export default CategoriesInAdmin;