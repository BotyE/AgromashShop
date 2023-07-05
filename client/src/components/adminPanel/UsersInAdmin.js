import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Form} from "react-bootstrap";
import styles from "./styles/UsersInAdmin.module.css"
import { getAll } from '../../http/userApi';
import UserElement from '../UserElement';

const UsersInAdmin = observer(() => {
    const [users,setUsers] = useState([])
    const [search,setSearch] = useState("")
    const [filterUsers, setFilterUsers] = useState([])
  

    useEffect( () => {
      getAll().then( data => {
        setFilterUsers(data)
        setUsers(data)
      })
    }, [])

    const update = () => getAll().then( data => {
      setUsers(data)
    })


    useEffect(() => {
      setFilterUsers(users.filter( (elem => {
        let name = elem.second_name + " " + elem.first_name + " " + elem.middle_name
        if((name.toLowerCase()).includes(search.toLowerCase()) || (elem.phone.toLowerCase()).includes(search.toLowerCase()) || (elem.email.toLowerCase()).includes(search.toLowerCase())) 
          return elem
      } )))
    },[search])

    return (
        <div className = { styles.container }>
          <Form.Control 
            className={styles.search}
            value={search}
            onChange = { (e) => setSearch(e.target.value)}
            />
          <div className = {styles.user}>
            {filterUsers.map(user => <UserElement update={update} user={user}/>)}
            </div>
        </div>
    );
});

export default UsersInAdmin;