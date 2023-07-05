import React, { useState,useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Form, Table} from "react-bootstrap";
import styles from "./styles/OrdersInAdmin.module.css"
import { agreeComment, deleteComment, fetchComments } from '../../http/deviceApi';

const AgreeCommentInAdmin = observer(() => {
    const [comments, setComments] = useState([])

    const [filteredComments, setFilteredComments] = useState([])
    const [search,setSearch] = useState("")
    const [filterComments, setFilterComments] = useState("")

    useEffect(() => {
        fetchComments().then(data => {
          setComments(data)
          setFilteredComments(data) 
        })
    }, [])
 
    const agreeOneComment = (comment) => {
      console.log(comment.agreed)
        agreeComment(comment.id, comment.agreed).then( () => fetchComments().then(data => {
          setFilteredComments(data)
          setComments(data)}))
    }

    const deleteCom = (id) => {
      deleteComment(id).then( () => fetchComments().then(data => {
        setFilteredComments(data)
        setComments(data)}))
  }
    

    useEffect(() => {
      setFilteredComments(comments.filter( (elem => {
        let name =  elem.user_name.toLowerCase()
        let device_name =  elem.device_name.toLowerCase()
        let lowerSearch = search.toLowerCase()
        if((name.includes(lowerSearch) || elem.text.includes(lowerSearch) || device_name.includes(lowerSearch) ) && (elem.rating === filterComments || !filterComments))
          return elem
      }
        )))
    },[search,filterComments])

    return (
        <div className = { styles.container }>
          <Form.Control 
            value={search}
            onChange = { (e) => setSearch(e.target.value)}
            />
            <Form.Select onClick={ (e) => setFilterComments(e.target.value)}>
              <option 
              value=""
              >Выберите оценку комментария</option>
              {[1,2,3,4,5].map( elem =>
                <option 
                value={elem}
                >{elem}</option>)}

            </Form.Select>
          <Table bordered className = { styles.table}>
            <tr className = { styles.first_row_basket }>
              <th className = { styles.number}>№ Комментария</th>
              <th className = { styles.data}>Дата комментария</th>
              <th className = { styles.status}>Комментарий</th>
              <th className = { styles.status}>Оценка</th>
              <th className = { styles.name}>Имя пользователя</th>
              <th className = { styles.summ}>Отзыв на товар</th>
              <th className = { styles.status}>Статус</th>
              <th className = { styles.status}>Изменение</th>
            </tr>
            {filteredComments.map(comment => {
                return (
                    <tr className = { styles.next_row }>
              <td><p>{comment.id}</p></td>
              <td><p>{comment.createdAt}</p></td>
              <td><p>{comment.text}</p></td>
              <td><p>{comment.rating}</p></td>
              <td><p>{comment.user_name}</p></td>
              <td><p>{comment.device_name}</p></td>
              <td><p>{(comment.agreed) ? "Одобрен" : "не одобрен"}</p></td>
              <td><Button variant = { 'custom' } onClick={() => agreeOneComment(comment)}>{!comment.agreed ? "Одобрить" : "Отозвать одобрение"}</Button> 

                
                <Button variant = { 'custom' } onClick={() => deleteCom(comment.id)}>Удалить</Button></td>
            </tr>
                )

            })}


          </Table>
        </div>
    );
});

export default AgreeCommentInAdmin;