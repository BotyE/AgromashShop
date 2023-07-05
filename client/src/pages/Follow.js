import React, { useContext,useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import ProductInFollow from "../components/ProductInFollow";
import styles from "./styles/Follow.module.css"
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchFollowDevices } from "../http/deviceApi";
const Follow = observer(() => {
  const {user} = useContext(Context)
  const [device,setDevice] = useState([])

  useEffect(() => {
    if(user.isAuth)
    {
      fetchFollowDevices(user.user.id).then( data => setDevice(data))
    }
    
}, [user.user.id,user.isAuth])

const updateFollow = () => {
    fetchFollowDevices(user.user.id).then( data => setDevice(data))
}

    return (
      <div className={styles.follow}>
        <h1 className={styles.tittle}>Избранное</h1>
        <div>
          {device.map((item,num) => {
            return (
              <ProductInFollow update={updateFollow} num={num} oneDevice={item}/>
              )
            }
            )}
        </div>
      </div>
    );
  })
  
  export default Follow;