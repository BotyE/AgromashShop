import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Navbar, Nav, Button, Form, Image, Container, Col, Row } from "react-bootstrap";
import {NavLink, useNavigate } from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE, ACCOUNT_ROUTE, FOLLOW_ROUTE, DEVICE_ROUTE, SEARCH_ROUTE, ABOUT_ROUTE, PAY_ROUTE, DELIVERY_ROUTE, CONTACTS_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import logo from '../assets/logo.svg'
import search from '../assets/search.svg'
import menu from '../assets/menu.svg'
import heart from '../assets/heart.svg'
import account from '../assets/user.svg'
import basket from '../assets/basket.svg'
import styles from './styles/NavBar.module.css'
import OpenCatalog from './modals/OpenCatalog';
import { fetchFilter } from '../http/deviceApi';
import SearchBar from './common/SearchBar';


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [catalogVisible, setCatalogVisible] = useState(false)
    
    return (
        <Navbar className = { styles.navbar_container} style = {{ display: "block" }}>
            <div className= {styles.container}>
                <Navbar.Brand 
                    href={ SHOP_ROUTE }
                    className = { styles.logo }>
                    <div
                        style = {{ background: `url(${logo}) no-repeat center center`, width:120, height: 80, backgroundSize: 'contain', fontSize:64 }}
                    >
                    </div>
                </Navbar.Brand>
                <Button 
                    variant = 'castom'
                    onClick={() => setCatalogVisible(true)}
                    className = { styles.catalog_menu }
                    >
                        <Image alt = "menu" className = { styles.menu_img } src = { menu }/>
                        <p className = { styles.menu_text }>Каталог</p>
                </Button>
                <div className = { styles.form }>
                    <SearchBar/>
                </div>
                <div className = { styles.btns }>
                    {user.isAuth ?
                        <Nav>
                            <Button 
                                className = { styles.basket_btn } 
                                onClick = {() => navigate(FOLLOW_ROUTE)}
                                variant = 'custom'
                                >
                                    <Image alt = "heart" className = { styles.login_img} src = {heart}/>
                            </Button>
                            <Button 
                                className = { styles.basket_btn } 
                                onClick={() => navigate(ACCOUNT_ROUTE)}
                                variant = 'custom'
                                >
                                    <Image alt = "account" className = { styles.login_img} src = {account}/>
                                    <p  className = { styles.name }>Аккаунт</p>
                            </Button>
                            
                            <Button 
                                className = { styles.basket_btn } 
                                onClick={() => navigate(BASKET_ROUTE)}
                                variant = 'custom'
                                >
                                    <Image alt = "basket" className = { styles.login_img} src = {basket}/>
                                    <p className = { styles.name }>Корзина</p>
                            </Button>
                        </Nav>
                        :
                        <Nav className = { styles.login } >
                            <Button 
                                className = { styles.basket_btn } 
                                onClick = {() => navigate(LOGIN_ROUTE)}
                                variant = 'custom'
                                >
                                    <Image alt = "heart" className = { styles.login_img} src = {heart}/>
                            </Button>
                            
                            <Button 
                                className = { styles.basket_btn } 
                                onClick={() => navigate(LOGIN_ROUTE)}
                                variant = 'custom'
                                >
                                    <Image alt = "account" className = { styles.login_img} src = {account}/>
                                    <p  className = { styles.name }>Аккаунт</p>
                            </Button>
                            
                            <Button 
                                className = { styles.basket_btn } 
                                onClick={() => navigate(BASKET_ROUTE)}
                                variant = 'custom'
                                >
                                    <Image alt = "basket" className = { styles.login_img} src = {basket}/>
                                    <p  className = { styles.name }>Корзина</p>
                            </Button>
                        </Nav>
                    }
              </div>
            </div>
            <div className = { styles.navbar_info }>
                <ul className = { styles.navbar_info_ul }>
                            <li className = { styles.info_list }>
                                <NavLink to={ABOUT_ROUTE} className = { styles.info_link }>О нас</NavLink>
                            </li>
                            <li className = { styles.info_list }>
                                <NavLink to={PAY_ROUTE} className = { styles.info_link }>Оплата</NavLink>
                            </li>
                            <li className = { styles.info_list }>
                                <NavLink to={DELIVERY_ROUTE} className = { styles.info_link }>Доставка</NavLink>
                            </li>
                            <li className = { styles.info_list }>
                                <NavLink to={CONTACTS_ROUTE} className = { styles.info_link }>Контакты</NavLink>
                            </li>
                        </ul>
                </div>
            <OpenCatalog show={catalogVisible} onHide={() => setCatalogVisible(false)}/>
        </Navbar>

    );
});

export default NavBar;