import React from 'react';
import {Image} from "react-bootstrap";
import styles from "./styles/InfoList.module.css"
import tools from "../../assets/tools.svg"
import percent from "../../assets/percent.svg"
import warehouse from "../../assets/warehouse.svg"
import handshake from "../../assets/handshake.svg"

const InfoList = () => {
    return (
            <div className = { styles.info}>
                <div className = { styles.row}>
                    <Image alt = "tools" className = { styles.avatar} src = { tools } />
                    <p className = { styles.tittle }>ПРОФЕССИОНАЛЬНОЕ ОБОРУДОВАНИЕ</p>
                    <p className = { styles.disc }>
                        Станки с ЧПУ, возможность вытачивать 
                        собственные запчасти дает нам 
                        возможность предлагать лучшие цены
                    </p>
                </div>
                <div className = { styles.row}>
                    <Image alt = "percent" className = { styles.avatar} src = { percent } />
                    <p className = { styles.tittle }>СКИДКИ ЗА ЗАКАЗ</p>
                    <p className = { styles.disc }>
                        Гибкая система скидок, разрабатывается под каждого клиента.
                    </p>
                </div>
                <div className = { styles.row}>
                    <Image alt = "warehouse" className = { styles.avatar} src = { warehouse } />
                    <p className = { styles.tittle }>ОГРОМНЫЙ РЕМФОНД</p>
                    <p className = { styles.disc }>
                        Наличие на складе дает нам 
                        примемущество в скорости поставок
                    </p>
                </div>
                <div className = { styles.row}>
                    <Image alt = "handshake" className = { styles.avatar} src = { handshake } />
                    <p className = { styles.tittle }>БОЛЕЕ 15 ЛЕТ НА РЫНКЕ</p>
                    <p className = { styles.disc }>
                        Около 1000 капитальных ремонтов 
                        тракторов Т-150К и К 700
                    </p>
                </div>
            </div>
    );
}

export default InfoList;