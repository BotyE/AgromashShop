import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const changeOneCategory = async (id,category) => {
    const {data} = await $authHost.put('api/category/'+ id, category)
    return data
}

export const fetchCategories = async (id) => {
    const {data} = await $host.get('api/category', {params: {id}})
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost.delete('api/category/' + id)
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const changeOneDevice = async (id,device) => {
    const {data} = await $authHost.put('api/device/'+ id, device)
    return data
}


export const fetchDevices = async (categoryId, page, limit) => {
    const {data} = await $host.get('api/device', {params: {
            categoryId, page, limit
        }})
    return data
}

export const fetchFilter = async (text,page) => {
    const {data} = await $host.get('api/filter', {params: {text,page}})
    return data
}

export const fetchFollowDevices = async (id) => {
    const {data} = await $authHost.get('api/device/follow/'+id)
    return data
}

export const deleteOneItem = async (id,item) => {
    const {data} = await $authHost.delete(`api/${item}/` + id)
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}


export const fetchFollow = async (id) => {
    const {data} = await $authHost.get('api/follow/' + id)
    return data
}

export const fetchOneFollow = async (userId,deviceId) => {
    const {data} = await $authHost.get('api/follow', {params: {
        userId, deviceId
    }})
    return data
}


export const addNewFollow = async (follow) => {
    const {data} = await $authHost.post('api/follow/',follow)
    return data
}


export const deleteOneFollow = async (userId,deviceId) => {
    const {data} = await $authHost.delete('api/follow/', {params: {
        userId, deviceId
    }})
    return data
}


export const addItemBasket = async (id,userId,count) => {
    const {data} = await $authHost.post('api/basket/' + id, {params: {userId,count}})
    return data
}

export const addBasketStorage = async (userId,basket) => {
    const {data} = await $authHost.post('api/basket/', {params: {userId,basket}})
    return data
}

export const deleteItemBasket = async (id,userId) => {
    const {data} = await $authHost.delete('api/basket/' + id, {params: {userId}})
    return data
}
export const clearBasket = async (id) => {
    const {data} = await $authHost.delete('api/basket/' + id)
    return data
}

export const updateCount = async (id) => {
    const {data} = await $authHost.delete('api/basket/' + id)
    return data
}

export const fetchBasket = async (id) => {
    const {data} = await $authHost.get('api/basket/' + id)
    return data
}


export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/order/', order)
    return data
}


export const changeOrder = async (id, order) => {
    const {data} = await $authHost.put('api/order/' + id , order)
    return data
}


export const deleteOrder = async (id) => {
    const {data} = await $authHost.delete('api/order/' + id)
    return data
}

export const fetchOrders = async () => {
    const {data} = await $authHost.get('api/order/')
    return data
}

export const fetchUserOrders = async (id) => {
    const {data} = await $authHost.get('api/order/user/' + id)
    return data
}

export const fetchOneOrders = async (id) => {
    const {data} = await $authHost.get('api/order/' + id)
    return data
}


export const fetchDeviceComments = async (id) => {
    const {data} = await $host.get('api/comments/' + id)
    return data
}

export const addNewComment = async (comment) => {
    const {data} = await $authHost.post('api/comments/' ,comment)
    return data
}

export const deleteComment = async (id) => {
    const {data} = await $authHost.delete('api/comments/'+ id)
    return data
}

export const agreeComment = async (id,agreed) => {
    const {data} = await $authHost.put('api/comments/' + id, {params: {agreed}})
    return data
}

export const fetchComments = async () => {
    const {data} = await $authHost.get('api/comments/')
    return data
}

export const createSlide = async (slide) => {
    const {data} = await $authHost.post('api/slider/',slide)
    return data
}

export const fetchSlider = async () => {
    const {data} = await $host.get('api/slider/')
    return data
}

export const fetchCategoriesShop = async () => {
    const {data} = await $host.get('api/shop/')
    return data
}

export const createCategoryShop = async (category) => {
    const {data} = await $authHost.post('api/shop/',category)
    return data
}

export const addExcel = async (file) => {
    const {data} = await $authHost.post('api/excel/',file)
    return data
}

export const sendFeedbackMail = async (feedback) => {
    const {data} = await $host.post('api/feedback/',feedback)
    return data
}

export const sendUnderOrder = async (feedback) => {
    const {data} = await $authHost.post('api/feedback/product/',feedback)
    return data
}