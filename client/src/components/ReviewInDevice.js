import React, { useContext, useState, useEffect } from "react";
import {Button, Form} from "react-bootstrap";
import styles from "./styles/ReviewInDevice.module.css"
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { addNewComment, fetchDeviceComments } from "../http/deviceApi";
import { useParams } from "react-router-dom";
import StarRating from "./common/StarRating";

const ReviewInDevice = observer(() => {
  const {user} = useContext(Context)
  const {id} = useParams()
  const [comments,setComments] = useState([])
  const [text,setText] = useState("")
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if(id)
    fetchDeviceComments(id).then( data => {
        setComments(data)
    })
    
}, [id])
const addComment = () => {
  if(rating===0) return alert("Вы не выбрали оценку")
  if(text.length < 10) return alert("Ваш комментарий не соответствует условию.")
  const formData = new FormData()
        formData.append('text', text)
        formData.append('userId', user.user.id)
        formData.append('deviceId', id)
        formData.append('rating', rating)
    addNewComment(formData).then( data => {})
}
    return(
      <div className={styles.review}>
        <p className={styles.tittle}>Отзывы:</p>
      {comments.find(x => x.agreed) ?  comments.map( (comment) => {
        if(comment.agreed)
        {
          return (
            <div className = { styles.review_user}>
            <p className={styles.user_name}>Имя пользователя: {comment.user_name}</p>
            <div className={styles.rating} style={{display:"flex", alignItems:"baseline"}}><p style={{marginRight:"10px"}}>Оценка: </p><StarRating rate={comment.rating} disabled={true}/></div>
            <div className={styles.comment}>
            <p  className={styles.comment_tittle} >Комментарий: </p>
            <p  className={styles.text}>{comment.text}
            </p>
            </div>
          </div>
          )
          }
      })
      :
      <div className={styles.no_review}>Нет отзывов</div>
      }
      { user.isAuth && !comments.find(x => x.userId === user.user.id) &&
        <Form className = { styles.form_review}>
          <Form.Label className={styles.give_review}>Оставить отзыв:</Form.Label>
          <div className={styles.input}>
          <StarRating update={setRating}/>
          <Form.Control
            value={text}
            onChange={e => setText(e.target.value)}
          as="textarea" rows={"5"} style={{resize:"none"}} ></Form.Control>
          <p>Минимум 10 символов. Максимум 300 символов.</p>
          <Button onClick={addComment}>Отправить</Button>
          </div>
        </Form> 
      }
      </div>

    );
  }
)
export default ReviewInDevice;