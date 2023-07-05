import React, {useContext, useEffect} from 'react';
import DeviceList from "../components/DeviceList";
import CatalogBar from "../components/CatalogBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchDevices} from "../http/deviceApi";
import Pages from "../components/Pages";
import styles from  "./styles/Catalog.module.css"
import CategoryList from '../components/CategoryList';
import { Link, useParams } from 'react-router-dom';
import { CATALOG_ROUTE } from '../utils/consts';
import { Container } from 'react-bootstrap';


const Catalog = observer(() => {
  const {device} = useContext(Context)
  const {id} = useParams()

  useEffect(() => {
     let selectCat = device.categories.find(item => item.link === id)
     device.setSelectedCategory(!!selectCat ? selectCat : {id:0})
      fetchDevices(device.selectedCategory.id, device.page, 2).then(data => {
          device.setDevices(data.rows)
          device.setTotalCount(data.count)
      })
  }, [device.page, device.selectedCategory.id,id])

  const searchCatalogRoute = (categoryRoute,n) => {
    console.log(categoryRoute)
    if(!categoryRoute) categoryRoute= {levelId:-1}  
    console.log(categoryRoute.levelId)
    if(!!categoryRoute){
           return (
        <div style={{display: "flex", alignItems:"baseline"}}>
          {categoryRoute.levelId!==-1 ? searchCatalogRoute(device.categories.find(item => item.id === categoryRoute.familyId), n+1)  : <Link className={styles.tittle} to={CATALOG_ROUTE + '/'}>Каталог</Link> } 
          {categoryRoute.levelId!==-1 && <Link className={styles.category} style={{fontSize:`calc(${5+n}px + 17*((100vw )/1920))`, fontWeight: `calc(${250+n*250})`}} to={CATALOG_ROUTE + '/' + categoryRoute.link}>{categoryRoute.name}</Link>}
         </div>
    )
    }
  }

    return (

        <div className={styles.container}>
            <div className={styles.names}>{searchCatalogRoute(device.categories.find(item => item.link === id), 1)}</div>
            <div className = { styles.catalog_container}>
                <CatalogBar/>
            
            {device.categories.filter(category => category.familyId ===  device.selectedCategory.id ).length !== 0 ?

            <div className = { styles.catalog_list}>
                              <CategoryList/>

            </div>
            :
            <div className = { styles.catalog_list}>
                                        <DeviceList/>
                                        <Pages device={device}/>

                    </div>

          }
          </div>
        </div>

);
});

export default Catalog;