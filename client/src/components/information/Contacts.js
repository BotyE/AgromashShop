import React from 'react';
import { Container } from 'react-bootstrap';


const Contacts = () => {
 
    return (
        <Container style={{maxWidth: "1000px"}}>
            <h1>Контакты</h1>
            <div>
                <p>
                    Телефон:
                    +7(4852)66-26-59
                    +7(960)531-78-18
                    E-mail:
                    amk-yar@mail.ru
                    Адрес: 
                    г. Ярославль, промышленное шоссе 5
                </p>
            </div>
        </Container>
    );
};

export default Contacts;