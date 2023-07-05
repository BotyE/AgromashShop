import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import styles from "./styles/Pages.css"
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {device} = useContext(Context)
    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []
    const [startElipse, setStartElipse] = useState(true)
    const [endElipse, setEndElipse] = useState(false)
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className={styles.page_limit}>
            <Pagination.Item
            style={{display: pages.length!==0 ? "none" : 'block'}}
            disabled = {device.page === 1}
            onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto'
                  });
                device.setPage(1)
            }}
            >
                &laquo;
            </Pagination.Item>
            <Pagination.Item
            style={{display: pages.length!==0 ? "none" : 'block'}}
            disabled = {device.page === 1}
            onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto'
                  });
                device.setPage(device.page-1)
            }}
            >
                &#8249;
            </Pagination.Item>
            {pages.length>1 && pages.map((page, i) => {
                
                if(Math.abs(device.page-page)<5) return (        
                <Pagination.Item
                    activeLabel = ""
                    key={page}
                    active={device.page === page}
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'auto'
                          });
                        device.setPage(page)
                    }}
                >
                    {page}
                </Pagination.Item>)
            else if(startElipse) {
                setStartElipse(false)
                console.log(1)
                return (
                    <Pagination.Ellipsis />
                )
            }
                })}
            <Pagination.Item
            style={{display: pages.length!==0 ? "none" : 'block'}}
            disabled = {device.page === pages.length}
            onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto'
                  });
                device.setPage(device.page+1)
            }}
            >
                &#8250;
            </Pagination.Item>
            <Pagination.Item
            style={{display: pages.length!==0 ? "none" : 'block'}}
            disabled = {device.page === pages.length}
            onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto'
                  });
                device.setPage(pages.length)
            }}
            >
                &raquo;
            </Pagination.Item>
        </Pagination>
                );
});

export default Pages;