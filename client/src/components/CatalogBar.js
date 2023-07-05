import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Image } from 'react-bootstrap';
import menu from "../assets/menu_cat.png"
import dots from "../assets/dots.png"
import styles from "./styles/TypeBar.module.css"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CATALOG_ROUTE } from '../utils/consts';

const CatalogBar = observer((props) => {
    const {device} = useContext(Context)
    const navigate = useNavigate()
    let result = device.categories.filter(category => category.familyId===0)
    result.length = 10;
    return (
        <div className = { styles.type__bar }>
            <Button 
            variant = "castom"
            onClick = { () => {
                    device.setSelectedCategory({id:0})
                    navigate(CATALOG_ROUTE)}}
            className = { styles.menu__category }><Image className = { styles.category__img } src = { menu } /><span>Все категории</span></Button>

            <ListGroup className = { styles.category__ul}>
                {result.map(category =>
                    <Link
                        className = { styles.category__li }
                         active = { category.id === device.selectedCategory.id }
                         onClick = { () => {
                            device.setSelectedCategory(category)
                            device.setPage(1) }}
                        to = { CATALOG_ROUTE + `/` + category.link}
                        key = { category.id }
                    >
                        { category.name }
                    </Link>
                )}
            </ListGroup>
            
            <NavLink to = { CATALOG_ROUTE } className = { styles.category__more }>
                <Image className = { styles.more__img } src = { dots } />
                <span className = { styles.more_more}>Еще</span>
            </NavLink>
        </div>
    );
});

export default CatalogBar;