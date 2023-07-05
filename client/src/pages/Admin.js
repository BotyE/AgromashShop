import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import OrdersInAdmin from "../components/adminPanel/OrdersInAdmin";
import ProductsInAdmin from "../components/adminPanel/ProductsInAdmin";
import styles from "./styles/Admin.module.css"
import CategoriesInAdmin from '../components/adminPanel/CateroriesInAdmin';
import UsersInAdmin from '../components/adminPanel/UsersInAdmin';
import AgreeCommentInAdmin from '../components/adminPanel/AgreeCommentInAdmin';
import CategoriesShopInAdmin from '../components/adminPanel/CategoriesShopInAdmin';
import SliderInAdmin from '../components/adminPanel/SliderInAdmin';
import ExcelButton from '../components/common/ExcelButton';

const Admin = () => {
    const [view, setView] = useState("Товары")
    const switchView = () => {
        switch(view) {
            case "Товары":
                return <ProductsInAdmin/>
            case "Заказы":
                return <OrdersInAdmin/>
            case "Категории":
                return <CategoriesInAdmin/>
            case "Пользователи":
                return <UsersInAdmin/>
            case "Отзывы":
                return <AgreeCommentInAdmin/>
            case "Категории на главной":
                return <CategoriesShopInAdmin/>
            case "Слайдер":
                return <SliderInAdmin/>
            default: 
                return <ProductsInAdmin/>
        }
    }


    return (
        <div className = {styles.container} >
            <div className={styles.butns}>
            <ExcelButton/>
            <Button
                variant='castom'
                style={{
                    backgroundColor: view === "Заказы" ? "#069942" : "#D9D9D9",
                    color: view === "Заказы" ? "white" : "black",
            }}
                className = { styles.admin_select }
                onClick = { () => {setView("Заказы")}}
            >
                Заказы
            </Button>
            <Button
                variant='castom'
                style={{
                    backgroundColor: view === "Товары" ? "#069942" : "#D9D9D9",
                    color: view === "Товары" ? "white" : "black",
                }}
                className = { styles.admin_select }
                onClick = { () => {setView("Товары")}}
            >
                Товары
            </Button>
            <Button
                variant='castom'
                style={{
                    backgroundColor: view === "Пользователи" ? "#069942" : "#D9D9D9",
                    color: view === "Пользователи" ? "white" : "black",
                }}
                className = { styles.admin_select }
                onClick = { () => {setView("Пользователи")}}
            >
                Пользователи
            </Button>
            <Button
                variant='castom'
                style={{
                    backgroundColor: view === "Категории" ? "#069942" : "#D9D9D9",
                    color: view === "Категории" ? "white" : "black",
                }}
                className = { styles.admin_select }
                onClick = { () => {setView("Категории")}}
            >
                Категории
            </Button>
            <Button
                variant='castom'
                style={{
                    backgroundColor: view === "Отзывы" ? "#069942" : "#D9D9D9",
                    color: view === "Отзывы" ? "white" : "black",
                }}
                className = { styles.admin_select }
                onClick = { () => {setView("Отзывы")}}
            >
                Отзывы
            </Button>
            <Button
                variant='castom'
                style={{
                    backgroundColor: view === "Слайдер" ? "#069942" : "#D9D9D9",
                    color: view === "Слайдер" ? "white" : "black",
                }}
                className = { styles.admin_select }
                onClick = { () => {setView("Слайдер")}}
            >
                Слайдер
            </Button>
            <Button
                variant='castom'
                style={{
                    backgroundColor: view === "Категории на главной" ? "#069942" : "#D9D9D9",
                    color: view === "Категории на главной" ? "white" : "black",
                }}
                className = { styles.admin_select }
                onClick = { () => {setView("Категории на главной")}}
            >
                Категории на главной
            </Button>
            </div>
            <div>
                
                {switchView()}
            </div>
        </div>
    );
};

export default Admin;