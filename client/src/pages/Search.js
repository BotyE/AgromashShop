import React, { useContext,useEffect} from "react";
import Container from "react-bootstrap/Container";
import styles from './styles/Search.module.css'
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchFilter } from "../http/deviceApi";
import { useParams } from "react-router-dom";
import CatalogBar from "../components/CatalogBar";
import Pages from "../components/Pages";
import DeviceItem from "../components/common/DeviceItem";
import { compare } from "../utils/func";
const Search = observer(() => {
    const {id} = useParams()
    const {device} = useContext(Context)
    useEffect( () => {
        console.log(id)
        console.log(device.page)
        if(id!=='' && id.length>=3 )
            fetchFilter(id,device.page).then((data) => { 
                device.setDevices((data.rows).sort(compare))
            device.setTotalCount(data.count)})
        else {
            device.setDevices([])
            device.setTotalCount(0)
        }
    },[id,device.page])

    return (
        <div className={styles.container}>
            <div>
            <CatalogBar />
            </div>
            <div style = {{ display: "flex", flexDirection: "column" }}>
                <div className= {styles.products}>
            { device.devices.map( elem => {
                        return (
                                <DeviceItem key={elem.id} device={elem}/>
                        )
                    })}
                    
                    </div>
                    <Pages device={device}/>
            </div>
        </div>
    );

  })
  
  export default Search;