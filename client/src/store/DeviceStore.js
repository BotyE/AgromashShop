import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._categories = []
        this._devices = []
        this._selectedCategory= {id:0}
        this._selectedDevice = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 12
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setCategories(categories) {
        this._categories = categories
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedCategory(category) {
        this._selectedCategory = category
    }
    setSelectedDevice(device) {
        this._selectedDevice = device
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get categories() {
        return this._categories
    }
    get devices() {
        return this._devices
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get selectedDevice() {
        return this._selectedDevice
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}