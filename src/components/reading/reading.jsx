import React, { useState, useEffect, useMemo, } from 'react';
import styles from './reading.module.css';
import PageTitle from '../page_title/page_title';
import Table from '../table/table';


const Reading = () => {
    const [readingList, setReadingList] = useState([]);
    const getReadingList = () => {
        return fetch('/api/reading', {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(result => {
            return result.list
        })
        .catch(err => {
            console.log(err);
            return [];
        });
    };

    useEffect(async () => {
        const data = await getReadingList();
        setReadingList(data);
    }, []);

    const columns = useMemo(() => [
        {
            accessor: 'code',
            Header: 'CODE'
        },
        {
            accessor: 'name',
            Header: '종목명'
        },
        {
            accessor: 'type',
            Header: '투자전략'
        },
        {
            accessor: 'current_price',
            Header: '현재가'
        },
        {
            accessor: 'first_price',
            Header: '1차 가격'
        },
        {
            accessor: 'second_price',
            Header: '2차 가격'
        },
        {
            accessor: 'third_price',
            Header: '3차 가격'
        },
        {
            accessor: 'goal_price',
            Header: '목표가'
        },
        {
            accessor: 'loss_price',
            Header: '손실가'
        },
        {
            accessor: 'read_dt',
            Header: '리딩날짜'
        },
        {
            accessor: 'goal_dt',
            Header: '리딩날짜'
        },
        {
            accessor: 'loss_dt',
            Header: '리딩날짜'
        },
    ], []);

    return (
        <>
            <PageTitle title='READING' />
            <Table columns={columns} data={readingList}/>
        </>
    );
};

export default Reading;