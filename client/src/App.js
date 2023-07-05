import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Container, Spinner} from "react-bootstrap";
import styles from './components/styles/App.module.css'
import { fetchCategories } from './http/deviceApi';
import { compare } from './utils/func';

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const {device} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => device.setCategories(data.sort(compare)))
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            console.log(data.role)
            user.setIsAdmin(data.role === "ADMIN")
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <div style={{margin: "0 auto",padding: "0px"}}>
                <NavBar />
                <AppRouter />
                <Footer />
            </div>
        </BrowserRouter>
    );
});

export default App;