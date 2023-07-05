import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import { Context } from '../../index';
import Modal from "react-bootstrap/Modal";
import styles from "./styles/OpenCatalog.module.css"
import "./styles/OpenCatalog.css"
import CategoryItem from '../CategoryItem';

const OpenCatalog = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    return (
        <Modal
            centered
            className = { styles.modal_window }
            show={show}
            onHide={onHide}
        >
            <Modal.Body className = {styles.modal_body}>

                {device.categories.map(category => { 
                    if(category.levelId === 0)
                        return (
                            <CategoryItem update={onHide} category={category}/>
                        )   
                })}
            </Modal.Body>
        </Modal>
    );
})

export default OpenCatalog;