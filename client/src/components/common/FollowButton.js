import React, {useContext, useEffect, useState} from 'react';
import { FaHeart } from 'react-icons/fa'
import styles from './styles/commonStyles.module.css'
import { addNewFollow, deleteOneFollow, fetchOneFollow } from '../../http/deviceApi';
import { Context } from '../../index.js';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const FollowButton = observer(({update,device}) => { 
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const [follow, setFollow] = useState()

    useEffect(() => {
        if(user.isAuth && device.id) {
            fetchOneFollow(user.user.id,device.id).then(data => {
                setFollow(data)
            })
        }
    }, [follow,device])

    const addToFollow = () => {
        if(user.isAuth) {
            if(!follow){

                const formData = new FormData()
                formData.append('userId', user.user.id)
                formData.append('deviceId', device.id)
                addNewFollow(formData).then(data => {
                    setFollow(data)
                    update()
                })
            }
            else {
                deleteOneFollow(user.user.id, device.id).then(data => {
                    setFollow(data)
                    update()
                })
            }
        }
        else {
            navigate(LOGIN_ROUTE)
        }
    }

    return (
        <FaHeart
            className = {styles.star}
            onClick={addToFollow}
            color={follow ? "#FF00AE" : "#D9D9D9"}
            cursor= "pointer"/>      
    )
})

export default FollowButton