const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true,},
    phone: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    first_name: {type: DataTypes.STRING, allowNull: false},
    middle_name: {type: DataTypes.STRING, allowNull: false},
    second_name: {type: DataTypes.STRING, allowNull: false},
    discount: {type: DataTypes.INTEGER, allowNull: false},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, defaultValue: "Создан"},
    sum: {type: DataTypes.INTEGER, allowNull: false},
    individual: {type: DataTypes.JSON, allowNull: false},
    type_pay: {type: DataTypes.STRING, allowNull: false},
    type_delivery: {type: DataTypes.STRING, allowNull: false},
    device_list: {type: DataTypes.ARRAY(DataTypes.JSON), allowNull: false},
    company: {type: DataTypes.JSON, allowNull: false},
})

const Follow = sequelize.define('follow', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const FollowDevice = sequelize.define('follow_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Slider = sequelize.define('slider', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false},
    order: {type: DataTypes.INTEGER, defaultValue: 0},
})

const CategoryShop = sequelize.define('category_shop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false},
    levelId: {type: DataTypes.INTEGER, defaultValue: 0},
    familyId: {type: DataTypes.INTEGER, allowNull: false}
})


const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, defaultValue: ""},
    rating: {type: DataTypes.INTEGER, allowNull: false},
    agreed: {type: DataTypes.BOOLEAN, defaultValue: false },
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, allowNull: false}
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.DOUBLE, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    article: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.INTEGER, defaultValue: 0},
    old_price: {type: DataTypes.INTEGER, defaultValue: 0},
    description: {type: DataTypes.STRING, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Recovery = sequelize.define('recovery', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    link: {type: DataTypes.STRING, unique: true, allowNull: false}
})

User.hasOne(Recovery)
Recovery.belongsTo(User)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Follow)
Follow.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Category.hasMany(CategoryShop)
CategoryShop.belongsTo(Category)

Device.hasMany(FollowDevice)
FollowDevice.belongsTo(Device)

Follow.hasMany(FollowDevice)
FollowDevice.belongsTo(Follow)

Category.hasMany(Device)
Device.belongsTo(Category)

Device.hasMany(Comment)
Comment.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)


Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)


module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    DeviceInfo,
    Category,
    Order,
    Slider,
    Follow,
    Comment,
    FollowDevice,
    CategoryShop,
    Recovery
}