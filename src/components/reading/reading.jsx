import React, { useState, useEffect, } from 'react';

const Reading = () => {
    const [readingList, setReadingList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reading', {
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => console.log(res));
    }, [readingList]);

    return (
        <h1>READING</h1>
    );
};

export default Reading;