import React from 'react';
import {Image} from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import logo from '../assets/logo.svg'
import whatsapp from '../assets/whatsapp.svg'
import vk from '../assets/vk.svg'
import telegram from '../assets/telegram.svg'
import youtube from '../assets/youtube.svg'
import instagram from '../assets/instagram.svg'
import styles from './styles/Footer.module.css'
import { ABOUT_ROUTE, ACCOUNT_ROUTE, CATALOG_ROUTE, CONTACTS_ROUTE, DELIVERY_ROUTE, FEEDBACK_ROUTE, PAY_ROUTE, PPO_ROUTE, USER_AGREEMENT_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';



const Footer = observer(() => {
    return (
                <div className = { styles.Footer } >
                    <div className = {styles.footer_left}>
                        <div className = { styles.footer_logo }>
                        <Image alt = "logo" className = { styles.footer_img } src = { logo } />
                            <div className = { styles.footer_ph} >
                                <a href="tel:+7(4852)66-26-59" className = { styles.footer_phone }>+7(4852)66-26-59</a>
                                <a href="tel:+7(960)531-78-18" className = { styles.footer_phone }>+7(960)531-78-18</a>
                            </div>
                        </div>
                        <ul className = { styles.contacts_list }>
                            <li className = { styles.list_item }>
                                <a href="https://api.whatsapp.com/send?phone=79066333191" target="blank">
                                    <Image alt = "whatsapp" className = { styles.whatsapp + ' ' +  styles.img } src = { whatsapp }/>
                                </a>
                            </li>
                            <li className = { styles.list_item }>
                                <a href="https://vk.com/club181604680" target="blank">
                                    <Image alt = "vk" className = { styles.vk + ' ' +  styles.img } src = { vk }/>
                                </a>
                            </li>
                            <li className = { styles.list_item } target="blank">
                                <a href="https://t.me/traktora76" className = { styles.list_link } target="blank" >
                                    <Image alt = "telegram" className = { styles.telegram + ' ' +  styles.img} src = { telegram }/>
                                </a>
                            </li>
                            <li className = { styles.list_item }>
                                <a href="https://youtube.com/channel/UCFWI473FFnm0Nrx5AK-ED8A" target="blank">
                                    <Image alt = "youtube" className = { styles.youtube + ' ' +  styles.img} src={ youtube }/>
                                    </a>
                            </li>
                            <li className = { styles.list_item}>
                                <a href ="https://instagram.com/agromashkomplekt" target="blank">
                                    <Image alt = "instagram" className = { styles.instagram + ' ' +  styles.img} src = { instagram }/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className = { styles.footer_info }>
                        <div className = { styles.footer_ul }>
                            <h1 className = { styles.footer_header }>О магазине</h1>
                            <NavLink to = { CATALOG_ROUTE } className = { styles.footer_li }>Каталог</NavLink>
                            <NavLink to = { ABOUT_ROUTE } className = { styles.footer_li }>О компании</NavLink>
                            <NavLink to = { CONTACTS_ROUTE } className = { styles.footer_li }>Контакты</NavLink>
                            <NavLink to = { DELIVERY_ROUTE } className = { styles.footer_li }>Доставка</NavLink>
                            <NavLink to = { PAY_ROUTE } className = { styles.footer_li }>Оплата</NavLink>
                        </div>
                        <div className = { styles.footer_ul }>
                            <h1 className = { styles.footer_header }>Клиентам</h1>
                            <NavLink to = { ACCOUNT_ROUTE } className = { styles.footer_li }>Личный кабинет</NavLink>
                            <NavLink to = { FEEDBACK_ROUTE } className = { styles.footer_li }>Обратная связь</NavLink>
                        </div>
                        <div className = { styles.footer_ul }>
                            <h1 className = { styles.footer_header }>Информация</h1>
                            <NavLink to = { USER_AGREEMENT_ROUTE } className = { styles.footer_li }>Пользовательское соглашение</NavLink>
                            <NavLink to = { PPO_ROUTE } className = { styles.footer_li }>Политика конфиденциальности и оферта</NavLink>
                        </div>
                    </div>
                </div>

    );
});

export default Footer;