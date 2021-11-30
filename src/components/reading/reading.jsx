import React, { useState, useEffect, } from 'react';
import styles from './reading.module.css';
import PageTitle from '../page_title/page_title';


const Reading = () => {
    const [readingList, setReadingList] = useState([]);

    useEffect(() => {
        fetch('/api/reading', {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(console.log)
            .catch(console.log);
    }, [readingList]);

    return (
        <>
            <PageTitle title='READING' />
        </>
    );
};

export default Reading;