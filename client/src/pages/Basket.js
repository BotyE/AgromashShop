import React, {useContext, useState, useEffect} from "react";
import {Button, Form, Table,Tab,Tabs} from "react-bootstrap";
import ProductInBasket from "../components/ProductInBasket";
import styles from'./styles/Basket.module.css'
import { observer } from "mobx-react-lite";
import { fetchBasket, createOrder, addBasketStorage } from "../http/deviceApi";
import { Context } from "../index";
import { getOne } from "../http/userApi";
import IndividualInfo from "../components/basket/IndividualInfo";
import CompanyInfo from "../components/basket/CompanyInfo";
import { validateEmail, validatePhone } from "../utils/func";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

const Basket = observer(() => {
  const {device} = useContext(Context)
  const {user} = useContext(Context)
  const [userBasket, setUserBasket] = useState([])
  const [baskets, setBaskets] = useState([])
  const [typeDelivery, setTypeDelivery] = useState("Самовывоз")
  const [typeDeliveryCompany, setTypeDeliveryCompany] = useState("СДЭК")
  const [typePay, setTypePay] = useState("Перевод на банковскую карту")
  const [key, setKey] = useState('individual');
  const [individual, setIndividual] = useState({
    fio: "",
    phone: "",
    email: ""
  })
  const [company, setCompany] = useState({
    name: "",
    inn: "",
    kpp: "",
    adress: "",
    bik: "",
    payacc: ""
  })
  const updateCompany = (name, inn, kpp, adress, bik, payacc) => {
    setCompany({
      name: name,
      inn: inn,
      kpp: kpp,
      adress: adress,
      bik: bik,
      payacc: payacc
    })
  }

  const updateIndividual = (fio, phone, email) => {
    setIndividual({
      fio: fio,
      phone: phone,
      email: email
    })
  }

  let [sum, setSum] = useState()

  function findCategory(id) {
    let result =  device.categories.filter(category => category.id === id )
    return result[0]
  }

  useEffect(() => {
    if(user.isAuth)
    {
      addBasketStorage(user.user.id, window.localStorage.getItem('basket')).then( (data) => {
        window.localStorage.removeItem('basket')
        fetchBasket(user.user.id).then( data => {
          if(data)
            setBaskets(data)
        
        getOne(user.user.id).then( dataUser => {
          setIndividual({
            fio: dataUser.second_name + ' ' + dataUser.first_name + ' ' + dataUser.middle_name,
            phone: dataUser.phone,
            email: dataUser.email
          })
          setUserBasket(dataUser)
          setSum(data.reduce((sum,elem) => (sum + (elem.price>elem.old_price) ? sum +Math.round((elem.price*elem.basket_count*((100-dataUser.discount)/100))) : sum +elem.price*elem.basket_count) ,0))
        })
      })
      })
    }
    else {
      setBaskets(JSON.parse(window.localStorage.getItem('basket')))
    }
    
}, [user.isAuth,user.user.id])
const updateCount = () => {
  if(user.isAuth)
    {
      fetchBasket(user.user.id).then( data => {
        setBaskets(data)
        setSum(data.reduce((sum,elem) => {
          return (elem.price>=elem.old_price) ? sum + Math.round((elem.price*elem.basket_count*((100-userBasket.discount)/100))) : sum + elem.price*elem.basket_count }
          ,0))
      })
    }
    else {
      setBaskets(JSON.parse(window.localStorage.getItem('basket')))
      setSum((JSON.parse(window.localStorage.getItem('basket'))).reduce((sum,elem) => sum+(elem.price*elem.basket_count),0))
    }
}
const getOrder = () => {
    if(individual.fio.length <= 5)
      return alert("Не правильно заполнено ФИО")

    if(!validateEmail(individual.email))
      return alert("Не правильно указана почта")

    if(!validatePhone(individual.phone))
      return alert("Не правильно указан номер телефона")

    if(!typeDelivery)
      return alert("Не выбран способ доставки")

    if(!typeDeliveryCompany && typeDelivery === "Доставка транспортной компанией")
      return alert("Не выбрана транспортная компания")

    if(!typePay)
      return alert("Не выбран способ оплаты")


    if((!company.adress || !company.inn || !company.bik || !company.name || !company.payacc || !company.kpp) && key === 'company')
      return alert("Не правильно указаны данные для Юр. лица")

      const formData = new FormData()
      formData.append('userId', user.user.id)
      formData.append('devices', JSON.stringify(baskets))
      formData.append('individual', JSON.stringify(individual))
      formData.append('company', JSON.stringify(key==='company' ? company : {}))
      formData.append('typePay', typePay)
      formData.append('typeDelivery', typeDelivery)
      formData.append('typeDeliveryCompany', typeDelivery === "Доставка транспортной компанией" ? typeDeliveryCompany : '')
      formData.append('sum', sum)
      createOrder(formData).then(data => {if(data>0) {
        setSum(0)
        setBaskets([])}})
}

    return (
      <div className = { styles.container}>
        <h1>Корзина</h1>
        {baskets && baskets.length !== 0 ?
        <div>
          <div>
           <Table>
            {
              baskets.map((basket,num) => 
              <ProductInBasket update={updateCount}  num = {num} userBasket={userBasket} basket={basket}/>)
            }
            </Table> 
          </div>
          
        
        <div className = {styles.basket_price}>Стоимость заказа: {sum} Руб.</div>
        {user.isAuth ? 
        <div>
        <Form className = {styles.basket_form}>
        <div>
        <h2 className = { styles.contact_infimation }>Контактная информация</h2>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => {
            if(typePay === "Оплата по расчетному счету" && k === "individual")
              setTypePay("Перевод на банковскую карту")
            setKey(k)}}
          justify
        >
          <Tab eventKey="individual" title="Физ. Лицо">
            <IndividualInfo individual={individual} update = {updateIndividual}/>
          </Tab>
          <Tab eventKey="company" title="Юр. Лицо">
            <CompanyInfo  
              individual={individual} 
              company={company}  
              updateIndividual = {updateIndividual} 
              updateCompany = {updateCompany}/>
          </Tab>
        </Tabs>
        </div>
        <div key={`radio0`} className = {styles.form_paragraph}>
        <Form.Label className = { styles.form_tittle  }>Доставка</Form.Label>
          <Form.Check
            className = { styles.form_tittle_li }
            label="Самовывоз"
            defaultChecked
            name="group1"
            type="radio"
            id={`radio-1`}
            onClick = { () => {setTypeDelivery("Самовывоз")}}
          />
          <Form.Check
            className = { styles.form_tittle_li }
            label="Доставка по Ярославлю"
            name="group1"
            type="radio"
            id={`radio-2`}
            onClick = { () => {setTypeDelivery("Доставка по Ярославлю")}}
          />
          <Form.Check
            className = { styles.form_tittle_li }
            label="Доставка транспортной компанией"
            name="group1"
            type="radio"
            id={`radio-3`}
            onClick = { () => {
              if(typePay === "Наличными при получении" || typePay === "Банковской картой при получении")
                setTypePay("Перевод на банковскую карту")
              setTypeDelivery("Доставка транспортной компанией")}}
          />
          {typeDelivery==='Доставка транспортной компанией' &&
          <div>
          <Form.Check
            className = { styles.delivery_radio }
            label="СДЭК"
            checked = {typeDeliveryCompany === "СДЭК"}
            name="group2"
            type="radio"
            id={`radio-4`}
            onClick = { () => {setTypeDeliveryCompany("СДЭК")}}
          />
          <Form.Check
            className = { styles.delivery_radio }
            label="Деловые линии"
            checked = {typeDeliveryCompany === "Деловые линии"}
            name="group2"
            type="radio"
            id={`radio-5`}
            onClick = { () => {setTypeDeliveryCompany("Деловые линии")}}
          />
          <Form.Check
            className = { styles.delivery_radio }
            label="КИТ"
            checked = {typeDeliveryCompany === "КИТ"}
            name="group2"
            type="radio"
            id={`radio-6`}
            onClick = { () => {setTypeDeliveryCompany("КИТ")}}
          />
          <Form.Check
            className = { styles.delivery_radio }
            label="Энергия"
            checked = {typeDeliveryCompany === "Энергия"}
            name="group2"
            type="radio"
            id={`radio-7`}
            onClick = { () => {setTypeDeliveryCompany("Энергия")}}
          />
          <Form.Check
            className = { styles.delivery_radio }
            label="Байкал сервис"
            checked = {typeDeliveryCompany === "Байкал сервис"}
            name="group2"
            type="radio"
            id={`radio-8`}
            onClick = { () => {setTypeDeliveryCompany("Байкал сервис")}}
          />
           </div>
          }
        </div>

        <div key={`radio`}  className = {styles.form_paragraph}>
        <Form.Label className = { styles.form_tittle }>Способ оплаты</Form.Label>
        { (typeDelivery === "Самовывоз" || typeDelivery === "Доставка по Ярославлю") &&
          <div>
          <Form.Check
            className = { styles.form_tittle_li }
            label="Наличными при получении"
            checked = {typePay === "Наличными при получении"}
            name="group3"
            type="radio"
            id={`radio-11`}
            onClick = { () => {setTypePay("Наличными при получении")}}
          />
          <Form.Check
            className = { styles.form_tittle_li }
            label="Банковской картой при получении"
            name="group3"
            checked = {typePay === "Банковской картой при получении"}
            type="radio"
            id={`radio-12`}
            onClick = { () => {setTypePay("Банковской картой при получении")}}
          />
          </div>
        }
          <Form.Check
            className = { styles.form_tittle_li }
            label="Перевод на банковскую карту"
            name="group3"
            type="radio"
            checked = {typePay === "Перевод на банковскую карту"}
            id={`radio-13`}
            onClick = { () => {setTypePay("Перевод на банковскую карту")}}
          />
          { key === "company" &&
          <Form.Check
            className = { styles.form_tittle_li }
            label="Оплата по расчетному счету"
            name="group3"
            type="radio"
            checked = {typePay === "Оплата по расчетному счету"}
            id={`radio-14`}
            onClick = { () => {setTypePay("Оплата по расчетному счету")}}
          />}
        </div>
        <Button
        variant="castom"
        className={styles.add_order}
        disabled = {baskets.length === 0}
         onClick={()=> {getOrder()}}>Оформить заказ</Button>
        </Form>
         </div>
         :
         <Link to={LOGIN_ROUTE} >Для оформления заказа необходима авторизация</Link>
      }
         </div>
         :
         <div>Корзина пустая</div>
           }
      </div>
    );
  })
  
  export default Basket;