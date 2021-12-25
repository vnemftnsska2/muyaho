import React, { useState, useEffect, useMemo, } from 'react';
import styles from './leading.module.css';
import PageTitle from '../../page_title/page_title';
import { Table, Row, Col, Button, Tag, Tooltip, Input, } from 'antd';
import { PlusCircleOutlined, } from '@ant-design/icons';
import StockFormModal from '../../stock_form_modal/stock_form_modal';

const Leading = ({stockRepository}) => {
    // 리딩 리스트
    const [allList, setAllList] = useState([]); // 검색 때문에 하나 더 유지
    const [leadingList, setLeadingList] = useState([]);

    // 모달
    const [isVisible, setIsVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [stockInfo, setStockInfo] = useState(null);
    
    const getLeadingList = async () => {
        const data = await stockRepository.syncLeadingList();
        if (!data?.fatal) {
            setAllList(data);
            setLeadingList(data);
        }
    }

    // Init
    useEffect(getLeadingList, [stockRepository]);

    const showModal = async event => {
        const target = event.target;
        const tagName = target.tagName;
        const title = tagName === 'A' ? '수정' : '추가';
        if (tagName === 'A') {
            const key = target.dataset.key;
            const stock = await stockRepository.syncLeadingList(key);
            if (!stock) {
                return alert('요청 실패하였습니다.');
            }
            setStockInfo(stock[0]);
        } else {
            setStockInfo(null);
        }
        
        setModalTitle(title);
        setIsVisible(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    }

    const handleSaveStock = (formValues, formReset) => {
        // Chart Upload 보류
        let apiUrl = '/api/leading';
        const formData = new FormData();
        for (const key in formValues) {
            if (key === 'id' && formValues[key]) {
                apiUrl = `/api/leading/${formValues[key]}`
            } else {
                formData.append(key, formValues[key]);
            }
        }

        // JSON 형태로 데이터만 전송
        return fetch(apiUrl, {
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
            getLeadingList();
            alert('저장되었습니다.');
            closeModal();
            formReset();
        })
        .catch(err => {
            console.log(err);
            return alert('처리 실패하였습니다.');
        });
    }

    const deleteStock = (stockId, formReset) => {
        if (stockId === undefined) {
            return alert('삭제할 데이터가 존재하지 않습니다.');
        }

        // JSON 형태로 데이터만 전송
        return fetch(`/api/leading/delete/${stockId}`, {
            method: 'POST',
        })
        .then(res => res.json())
        .then(({status, }) => {
            if (status !== 200) {
                return alert('처리 실패하였습니다.');
            }
            alert('종목이 삭제되었습니다.');
            getLeadingList();
            formReset();
            closeModal();
        })
        .catch(err => {
            console.log(err);
            return alert('처리 실패하였습니다.');
        });
    }

    const handleSearch = event => {
        const searchList = allList
            .filter(stock => stock.name.indexOf(event.target.value) > -1);
        setLeadingList(searchList);
    };

    const columns = useMemo(() => [
        {
            dataIndex: 'type',
            width: '3%',
            align: 'center',
            filters: [
                { text: '주식', value: 'stock' },
                { text: '코인', value: 'coin' },
            ],
            onFilter: (value, record) => record.type.includes(value),
            render: (v) => (
                <> 
                    { v === 'stock' ?
                        <Tag color="red">S</Tag> : <Tag color="blue">C</Tag>
                    }
                </>
            ) 
        },
        {
            dataIndex: 'name',
            title: '종목명',
            width: '10%',
            render: (text, record) => <a data-key={ record.id } onClick={showModal}>{text}</a>
        },
        {
            dataIndex: 'strategy',
            title: '투자',
            width: '5%',
            align: 'center',
            filters: [
                { text: '단기', value: '단기' },
                { text: '농사', value: '농사' },
                { text: '스윙', value: '스윙' },
                { text: '중기', value: '중기' },
                { text: '장기', value: '장기' },
            ],
            onFilter: (value, record) => record.strategy.includes(value),
        },
        {
            dataIndex: 'current_price',
            title: '현재가',
            align: 'right',
            render: v => v.toLocaleString('ko-KR')
        },
        {
            dataIndex: 'first_price',
            title: '1차 가격',
            align: 'right',
            render: v => v.toLocaleString('ko-KR')
        },
        {
            dataIndex: 'second_price',
            title: '2차 가격',
            align: 'right',
            render: v => v.toLocaleString('ko-KR')
        },
        {
            dataIndex: 'third_price',
            title: '3차 가격',
            align: 'right',
            render: v => v.toLocaleString('ko-KR')
        },
        {
            dataIndex: 'goal_price',
            title: '목표가',
            align: 'right',
            render: v => `${v}%` 
        },
        {
            dataIndex: 'loss_price',
            title: '손실가',
            align: 'right',
            render: v => v.toLocaleString('ko-KR')
        },
        {
            dataIndex: 'bigo',
            title: '비고',
            width: '15%',
            ellipsis: {
                showTitle: false,
            },
            render: v => (
                v && v.length < 20 ? v : 
                <Tooltip placement="topLeft" title={v}>
                    {v}
                </Tooltip>
            )
        },
        {
            dataIndex: 'lead_at',
            title: '리딩일',
            width: '6%',
            align: 'center',
            render: (v) => (v ? v.substring(2, 10) : '')
        },
        {
            dataIndex: 'goal_at',
            title: '달성일',
            width: '6%',
            align: 'center',
            render: (v) => (v ? v.substring(2, 10) : '')
        },
        {
            dataIndex: 'loss_at',
            title: '손절일',
            width: '6%',
            align: 'center',
            render: (v) => (v ? v.substring(2, 10) : '')
        },
    ], []);

    return (
        <>
            <PageTitle title='LEADING' />
            <Row justify="start">
                <Col span={18}>
                    <Button
                        className={styles.addButton}
                        type="primary"
                        danger
                        onClick={showModal}
                    >
                        <PlusCircleOutlined />추가
                    </Button>
                </Col>
                <Col span={6}>
                    <Input.Search
                        addonBefore="종목명"
                        placeholder="종목명을 입력해주세요"
                        allowClear
                        enterButton
                        onChange={handleSearch}
                    />
                </Col>
            </Row>
            <Row>
                <Table
                    className={styles.table}
                    bordered
                    size="small"
                    columns={columns}
                    dataSource={leadingList}
                    rowKey={record => record.id}
                    pagination={{ pageSize: 50 }}
                    scroll={{ y: 600 }}
                />
            </Row>
            <StockFormModal
                title={modalTitle}
                stockInfo={stockInfo}
                isVisible={isVisible}
                submitStockForm={handleSaveStock}
                closeModal={closeModal}
                deleteStock={deleteStock}
            />
        </>
    );
};

export default Leading;