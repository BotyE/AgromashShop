import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import {Image, Button} from "react-bootstrap";
import styles from "./styles/ProductsInAdmin.module.css"
import AgreeDelete from '../modals/AgreeDelete';
import CreateSlide from '../modals/CreateSlide';
import { fetchSlider } from '../../http/deviceApi';

const SliderInAdmin = observer(() => {
    const [slider,setSlider] = useState([])
    const [sliderVisible, setSliderVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deleteSlider, setDeleteSlider] = useState({
      name: "",
      id: 0,
      type: "slider",
      ru_type: "Слайд"
  
    })

    useEffect( () => {
      fetchSlider().then( data => {
        data.sort()
        setSlider(data)
      })
    }, [])

    const update = () => fetchSlider().then( data => {
      data.sort()
      setSlider(data)
    })

    return (
        <div className = { styles.container }>
          <Button
          variant='castom'
          className={styles.add_product}
          onClick={() => {setSliderVisible(true)}}
          >Добавить слайд</Button>
          <div className = {styles.slider}>
            {slider.map(slide => 
                <div className={styles.one_device}>
                    <Image 
                    className = { styles.avatar} 
                    src = { process.env.REACT_APP_API_URL + slide.img } />
                    <p>Название: {slide.name}</p>
                    <a href={slide.link} target="blank">Ссылка: {slide.link}</a>
                    <p>Очередь {slide.order}</p>
                    <div> 

                      <Button 
                        variant='castom'
                        className={styles.add_product}
                        onClick={ () => {
                          setDeleteSlider({
                            name: slide.name,
                            id: slide.id,
                            type: "slider",
                            ru_type: "Слайд"
                        
                          })
                          setDeleteVisible(true)
                        }}
                      >Удалить</Button>
                    </div>
                </div>)}
            </div>
            <CreateSlide update={update} show={sliderVisible} onHide={() => setSliderVisible(false)}/>
            <AgreeDelete update={update} show={deleteVisible} onHide={() => setDeleteVisible(false)} props = {deleteSlider}/>
        </div>
    );
});

export default SliderInAdmin;