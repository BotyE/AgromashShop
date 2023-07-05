import React, { useContext } from "react";
import { Image} from "react-bootstrap";
import styles from './styles/ProductInFollow.module.css'
import {useNavigate} from "react-router-dom"
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {DEVICE_ROUTE} from "../utils/consts";
import BuyButton from "./common/BuyButton";
import FollowButton from "./common/FollowButton";
import UnderOrder from "./common/UnderOrder";

const ProductInFollow = observer(({update,oneDevice,num}) => {
    const navigate = useNavigate()
    let {device} = useContext(Context)
    const category = findCategory(oneDevice.categoryId)
    function findCategory(id) {
        let result =  device.categories.filter(category => category.id === id )
        return result[0]
      }


    return(
        <div  className = { styles.product }>
            <p className = { styles.number }>{num+1}</p>
            <Image onClick={() => navigate(DEVICE_ROUTE + '/' + oneDevice.id)} alt = "avatar" className = { styles.avatar__product } src = { process.env.REACT_APP_API_URL + oneDevice.img }/>
            <div className = { styles.name_product }>
                <h6 onClick={() => navigate(DEVICE_ROUTE + '/' + oneDevice.id)} className = { styles.category_product }>{category.name}</h6>
                <p onClick={() => navigate(DEVICE_ROUTE + '/' + oneDevice.id)} className = { styles.tittle_product }>{oneDevice.name}</p>
                <div className = { styles.code_and_heart }>
                    <h7 className = { styles.code_product }>Код товара: {oneDevice.article}</h7>
                    <FollowButton update={update} device={oneDevice} />
                </div>
            </div>
            <div className = { styles.price_container }>
                <p className = { styles.price }>
                    {oneDevice.price} Руб./Шт</p>
                { oneDevice.count!== 0 ?
                <BuyButton device={oneDevice}/>
                :
                <UnderOrder device={oneDevice}/>
                }
                <h7 className = { styles.available }>Есть в наличии: {oneDevice.count}</h7>
            </div>
        </div>
    );
  })

  export default ProductInFollow;