import React, { Component } from "react";
import {Button, Image} from "react-bootstrap";
import styles from './styles/ProductInBasket.module.css'
import avatar from '../assets/avatar.png'
import heart from '../assets/heart.svg'

export default class OrderInAccount extends Component {
  render() {
    return(
            <tr className = { styles.product_in_basket }>
                <td><p className = { styles.number }>1</p></td>
                <td><Image alt = "avatar" className = { styles.avatar__product } src = { avatar }/></td>
                <td>
                    <div className = { styles.name_product }>
                        <h6 className = { styles.category_product }>Категория товара</h6>
                        <p className = { styles.tittle_product }>Товар №32323131</p>
                        <div className = { styles.code_and_heart }>
                            <h7 className = { styles.code_product }>Код товара: 111222</h7>
                            <Image alt = "heart" className = { styles.follow_heart } src = { heart }/>
                        </div>
                    </div>
                </td>
              <td className = {styles.price_td}>
                    <div className = { styles.price_container }>
                        <div className = { styles.add_product_container }>
                            <Button 
                                className = { styles.minus }
                                variant = { 'custom' }
                            >-</Button>
                            <p className = { styles.count }>1</p>
                            <Button 
                                className = { styles.plus }
                                variant = { 'custom' }
                            >+</Button>
                        </div>
                        <h7 className = { styles.available }>Есть в наличии: 10</h7>    
                    </div>
                    
                </td>
                <td>
                <p className = { styles.price }>159999 Руб./Шт</p>
                </td>
              </tr>

    );
  }
}