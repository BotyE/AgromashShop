import React, {useEffect, useState} from 'react'
import { FaStar } from 'react-icons/fa'
import { Form } from 'react-bootstrap'
import styles from "./styles/StarRating.module.css"

const StarRating = ({rate, disabled,update}) => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    useEffect( () => {
        setRating(Math.round(rate))
    },[rate])

    return (
        <div style={{display: "flex"}}>
            {[...Array(5)].map( (star,i) => {
                const ratingValue = i + 1

                return (
                    <Form.Label>
                        <Form.Control
                        className={styles.control}
                        type='radio'
                        name='rating'
                        disabled = {disabled}
                        value={ratingValue}
                        onClick = {() => {
                            if(!disabled) {
                            setRating(ratingValue)
                            update(ratingValue) 
                            }   
                        }}/>
                        <FaStar
                            className = {styles.star}
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#B2B4B0"}
                            cursor= {!disabled ? "pointer" : "unset"}
                            onMouseEnter={() => { if(!disabled) setHover(ratingValue)}}
                            onMouseLeave={() => { if(!disabled) setHover(0)}}/>
                    </Form.Label>
                )
            })}
        </div>
    )
}

export default StarRating