import React, {useRef} from 'react'
import { Button, Form } from 'react-bootstrap';
import { addExcel } from '../../http/deviceApi';
import styles from "./styles/commonStyles.module.css"

const ExcelButton = () => {
  const fileInputRef=useRef();
  
  
  const addProductFromExcel = e => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    addExcel(formData)
}

  return(
    <div className={styles.admin_select}>
      <Button 
      variant='castom'
      className={styles.excel_btn}
      onClick={()=>fileInputRef.current.click()}>
        Добавить Excel
      </Button>
      <Form.Control onChange={addProductFromExcel} multiple={false} ref={fileInputRef} type='file' hidden/>
    </div>
  )
}

export default ExcelButton;