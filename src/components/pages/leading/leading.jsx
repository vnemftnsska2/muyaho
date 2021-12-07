import React, { useState, useEffect, useMemo, } from 'react';
import styles from './leading.module.css';
import PageTitle from '../../page_title/page_title';
import { Table, Row, Col, Button, } from 'antd';
import { PlusCircleOutlined, } from '@ant-design/icons';
import _default from 'rc-trigger';
import StockFormModal from '../../stock_form_modal/stock_form_modal';

const Leading = () => {
    const [leadingList, setLeadingList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    
    const getLeadingList = () => {
        return fetch('/api/reading', {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(result => {
            return result.map(stock => {
                stock.key = stock.id;
                return stock;
            });
        })
        .catch(err => {
            console.log(err);
            return [];
        });
    };

    useEffect(async () => {
        const data = await getLeadingList();
        setLeadingList(data);
    }, []);

    const showModal = () => {
        setIsVisible(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    }

    const handleSaveStock = async (formValues) => {
        console.log(formValues);
        return await fetch('/api/reading', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            alert('저장되었습니다.');
        })
        .catch(err => {
            console.log(err);
            return [];
        });
    }

    const columns = useMemo(() => [
        {
            dataIndex: 'code',
            title: 'CODE'
        },
        {
            dataIndex: 'name',
            title: '종목명'
        },
        {
            dataIndex: 'type',
            title: '투자전략'
        },
        {
            dataIndex: 'current_price',
            title: '현재가'
        },
        {
            dataIndex: 'first_price',
            title: '1차 가격'
        },
        {
            dataIndex: 'second_price',
            title: '2차 가격'
        },
        {
            dataIndex: 'third_price',
            title: '3차 가격'
        },
        {
            dataIndex: 'goal_price',
            title: '목표가'
        },
        {
            dataIndex: 'loss_price',
            title: '손실가'
        },
        {
            dataIndex: 'read_dt',
            title: '리딩날짜'
        },
        {
            dataIndex: 'goal_dt',
            title: '리딩날짜'
        },
        {
            dataIndex: 'loss_dt',
            title: '리딩날짜'
        },
    ], []);

    return (
        <>
            <PageTitle title='LEADING' />
            <Row justify="end">
                <Col span={32}>
                    <Button
                        className={styles.addButton}
                        type="primary"
                        danger
                        onClick={showModal}    
                    >
                    <PlusCircleOutlined />추가
                    </Button>
                </Col>
            </Row>
            <Row>
                <Table
                    className={styles.table}
                    bordered
                    size="small"
                    columns={columns}
                    dataSource={leadingList}
                    pagination={{ pageSize: 50 }}
                    scroll={{ y: 600 }}
                />
            </Row>
            <StockFormModal
                isVisible={isVisible}
                submitStockForm={handleSaveStock}
                closeModal={closeModal}
            />
        </>
    );
};

export default Leading;