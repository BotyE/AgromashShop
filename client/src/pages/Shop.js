import React from 'react';
import styles from "./styles/Shop.module.css"
import TypedCategory from "../components/shop/TypedCategory";
import InfoList from '../components/shop/InfoList';
import ImageSlider from "../components/shop/ImageSlider";
import CatalogBar from '../components/CatalogBar';
import { observer } from 'mobx-react-lite';
import { Container } from 'react-bootstrap';

const Shop = observer(() => {

    return (

            <div className={styles.shop}>
                <div className = { styles.menu}>
                    <CatalogBar className = { styles.type_bar} familyId = {0} />
                    <div className = { styles.slider}>
                      <ImageSlider/>
                    </div>
                </div>
                <InfoList/>
                <TypedCategory/>
            </div>

    );
}) 

export default Shop;