import React from 'react';
import {Form} from "react-bootstrap";
import styles from "./styles/IndividualInfo.module.css"


const IndividualInfo = ({individual, update}) => {
    return (
        <div className = { styles.info__profile }>
        <Form.Label className = { styles.reg__label }>ФИО</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          placeholder="Иванов Иван Иванович"
          value = { individual.fio }
          onChange={e => update(e.target.value, individual.phone, individual.email)}
          type = "name"
        />
        <Form.Label className = { styles.reg__label }>Номер телефона</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          placeholder="+79999999999"
          value = {individual.phone}
          onChange={e => update(individual.fio, e.target.value, individual.email)}
          type = "tel"
        /> 
       <Form.Label className = { styles.reg__label }>E-mail</Form.Label>
        <Form.Control
          className = { styles.profile__input }
          required = "true"
          placeholder="name@example.com"
          value = { individual.email}
          onChange={e => update(individual.fio, individual.phone, e.target.value)}
          type = "email"
        /> 
      </div>
    );
}

export default IndividualInfo;