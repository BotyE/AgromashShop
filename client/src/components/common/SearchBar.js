import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/NavBar.module.css'
import { Button, Form, Image } from 'react-bootstrap';
import { fetchFilter } from '../../http/deviceApi';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE, SEARCH_ROUTE } from '../../utils/consts';
import search from '../../assets/search.svg'
import BuyButton from './BuyButton';
import UnderOrder from './UnderOrder';
import { Context } from '../..';

const SearchBar = () => {
 
    const navigate = useNavigate()
    const [searchText, setSearch] = useState("")
    const [catalogVisible, setCatalogVisible] = useState(false)
    const [device, setDevice] = useState([])
    const [newStyle, setNewStyle] = useState("none")
    const {devices}= useContext(Context)
    useEffect( () => {
        if(searchText!=='' && searchText.length>=3 )
            fetchFilter(searchText,1).then(data => {
                setDevice(data.rows)
                setNewStyle("block")
            })
        else {
            setNewStyle("none")
            setDevice([])
        }
    },[searchText])

    const setStyle = (text) => {
        if(text.length>2)
            setNewStyle("block")
        else setNewStyle("none")
    }

    const setNewSearch = (text) => {
        setSearch(text)
    }

    const update = (elem)=> {
        navigate(DEVICE_ROUTE + '/' + elem.id)
        setSearch("")
        setDevice([])
        devices.setPage(1)
    }
    return (
        <div className = { styles.form }>
        <Form className = { styles.search_form }>
                        <Button
                            variant = 'castom'
                            className = { styles.search_btn }
                            onClick={() => {
                                if(searchText.length>=3) {
                                    navigate(SEARCH_ROUTE+ '/' + searchText)
                                    setSearch("")
                                }
                            }}
                            >
                                <Image src = { search } alt = 'search' className = { styles.search_img }/>
                        </Button>
                        <Form.Control
                            type = 'text'
                            placeholder = 'Поиск'
                            variant = 'castom'
                            value={searchText}
                            onClick = { () => setStyle(searchText)}
                            onBlur  = {(e) => {
                                setTimeout(() => {setNewStyle("none")},1000)
                                }}
                            onChange={e => setNewSearch(e.target.value)}
                            className = { styles.search_input }
                        />
        
                    </Form>
                    <ol className={styles.device_list} style = {{display: newStyle}}>
                    { device.map( elem => {
                        return (
                            <div
                                onClick={() => update(elem)}  
                                className={styles.search_device}>
                                <Image  width={100} height={100} src={process.env.REACT_APP_API_URL + elem.img}></Image>
                                <p>{elem.name} ава </p>
                                {elem.count !== 0 ?
                                    <BuyButton device={elem}/>
                                    :
                                    <UnderOrder device={elem}/>

                                }
                            </div>
                        )
                    })}
                    </ol>
                    </div>
    );
};

export default SearchBar;