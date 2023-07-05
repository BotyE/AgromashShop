import { useState, useEffect, useRef } from "react";
import { fetchSlider } from "../../http/deviceApi";
import styles from "./styles/ImageSlider.module.css";
import { Image } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const ImageSlider = observer(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([{name: "default",link: "",img: "rect.png", order: 1}]) 
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);

  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    if(slideIndex > slides.length - 1)
      setCurrentIndex(0);
    else
      setCurrentIndex(slideIndex);
  };

  useEffect( () => {
    fetchSlider().then( data => {
      console.log(data[0].img)
      data.sort()
      setSlides(data)
      goToSlide(1)
    })
  }, [])

  useEffect( () => {
    
    const timer = setInterval( function() { 
      goToNext()
    }, 10000)
    return () => clearInterval(timer);
  }, [currentIndex,])


  return (
    <div className = { styles.slider }>
        <div onClick={goToPrevious} className = { styles.left_arrow }>
          ❰
        </div>

      <div>
      <a href={slides[currentIndex].link} className = { styles.slide} target="blank" > <Image 
                    className = { styles.slide} 
                    src = { process.env.REACT_APP_API_URL + slides[currentIndex].img } /></a>
      <div className = { styles.dotsContainer }>
        {slides.map((slide, slideIndex) => (
          <div
          className = { styles.dot }
            key={slideIndex}
            style={{color: currentIndex === slideIndex ? "#069942" : "#969696"}}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
      </div>
      <div onClick={goToNext} className = { styles.right_arrow }>
          ❱
        </div>
    </div>
  );
});

export default ImageSlider;