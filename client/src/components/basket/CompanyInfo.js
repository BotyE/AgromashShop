import React from 'react';
import { Form } from 'react-bootstrap';
import styles from "./styles/CompanyInfo.module.css"

const CompanyInfo = ({individual, company, updateIndividual,updateCompany}) => {

    return (
        <div className = { styles.info__profile }>
        <Form.Label className = { styles.reg__label }>ФИО</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          placeholder="Иванов Иван Иванович"
          value = { individual.fio }
          onChange={e => updateIndividual(e.target.value, individual.phone, individual.email)}
          type = "name"
        />
        <Form.Label className = { styles.reg__label }>Номер телефона</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          placeholder="+79999999999"
          value = {individual.phone}
          onChange={e => updateIndividual(individual.fio, e.target.value, individual.email)}
          type = "tel"
        /> 
       <Form.Label className = { styles.reg__label }>E-mail</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          value = { individual.email}
          placeholder="name@example.com"
          onChange={e => updateIndividual(individual.fio, individual.phone, e.target.value)}
          type = "email"
        /> 
        <Form.Label className = { styles.reg__label }>Название компании</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          value = { company.name}
          onChange={e => updateCompany(e.target.value, company.inn, company.kpp, company.adress, company.bik, company.payacc)}
          type = "name"
        />
        <Form.Label className = { styles.reg__label }>ИНН</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          value = { company.inn}
          onChange={e => updateCompany(company.name, e.target.value, company.kpp, company.adress, company.bik, company.payacc)}
          type = "number"
        /> 
        <Form.Label className = { styles.reg__label }>КПП</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          value = { company.kpp }
          onChange={e => updateCompany(company.name, company.inn, e.target.value, company.adress, company.bik, company.payacc)}
          type = "email"
        /> 
        <Form.Label className = { styles.reg__label }>Юридический адрес</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          value = { company.adress}
          onChange={e => updateCompany(company.name, company.inn, company.kpp, e.target.value, company.bik, company.payacc)}
          type = "email"
        /> 
        <Form.Label className = { styles.reg__label }>БИК</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          value = { company.bik}
          onChange={e => updateCompany(company.name, company.inn, company.kpp, company.adress, e.target.value, company.payacc)}
          type = "email"
        /> 
        <Form.Label className = { styles.reg__label }>Расчетный счет</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          value = { company.payacc}
          onChange={e => updateCompany(company.name, company.inn, company.kpp, company.adress, company.bik, e.target.value)}
          type = "email"
        /> 
      </div> 
    );
}

export default CompanyInfo;