import {$authHost, $host, $adminHost} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, first_name, second_name, middle_name, phone) => {
    const {data} = await $host.post('api/user/registration', {email, password, first_name, second_name, middle_name, phone, role: 'USER'})
    localStorage.setItem('token', data.token)
    
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getOne = async (id) => {
    const {data} = await $authHost.get('api/user/getOne/' + id )
    return data
}

export const getAll = async () => {
    const {data} = await $authHost.get('api/user/getAll' )
    return data
}

export const changeUser = async (id,user) => {
    const {data} = await $authHost.put('api/user/changeOne/' + id, user)
    return data
}

export const changeUserInAdmin = async (id,email, first_name, second_name, middle_name, phone, discount) => {
    const {data} = await $authHost.put('api/user/changeUserInAdmin/' + id, {params: {email, first_name, second_name, middle_name, phone, discount} })
    return data
}

export const recoveryUser = async (email) => {
    const {data} = await $host.post('api/user/recovery', {email})
    return data
}

export const recoveryConfirm = async (password, id) => {
    const {data} = await $host.put('api/user/recovery', {password, id})
    return data
}