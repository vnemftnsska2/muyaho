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
        return fetch('/api/leading', {
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

    const handleSaveStock = (formValues, formReset) => {
        // Chart Upload 보류
        const formData = new FormData();
        for (const key in formValues) {
                formData.append(key, formValues[key]);
        }

        // JSON 형태로 데이터만 전송
        return fetch('/api/leading', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
            // body: formData,
        })
        .then(res => res.json())
        .then(({status, }) => {
            if (status !== 200) {
                return alert('처리 실패하였습니다.');
            }
            alert('저장되었습니다.');
            // formReset();
        })
        .catch(err => {
            console.log(err);
            return alert('처리 실패하였습니다.');
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
            dataIndex: 'lead_at',
            title: '리딩날짜'
        },
        {
            dataIndex: 'goal_at',
            title: '목표달성일'
        },
        {
            dataIndex: 'loss_at',
            title: '손절날짜'
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