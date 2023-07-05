import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./common/DeviceItem";
import styles from './styles/DeviceList.module.css'

const DeviceList = observer(() => {
    const {device} = useContext(Context)

    return (
        <div className={styles.grid_container}>
            {device.devices.map(device =>{
                return (
                <DeviceItem className={styles.grid_item} key={device.id} device={device}/> )}
            )}
        </div>
    );
});

export default DeviceList;