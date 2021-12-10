import React, { useState, useEffect, useMemo, } from 'react';
import styles from './leading.module.css';
import PageTitle from '../../page_title/page_title';
import { Table, Row, Col, Button, Tag, Tooltip, Input, Space} from 'antd';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import _default from 'rc-trigger';
import StockFormModal from '../../stock_form_modal/stock_form_modal';

const Leading = ({stockRepository}) => {
    // 리딩 리스트
    const [allList, setAllList] = useState([]); // 검색 때문에 하나 더 유지
    const [leadingList, setLeadingList] = useState([]);

    // 모달
    const [isVisible, setIsVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(async () => {
        const data = await stockRepository.syncLeadingList();
        setAllList(data);
        setLeadingList(data);
    }, [stockRepository]);

    const showModal = event => {
        const target = event.target;
        const tagName = target.tagName;
        const title = tagName === 'A' ? '수정' : '추가';
        if (tagName === 'A') {
            const key = target.dataset.key;
            const stock = stockRepository.syncLeadingList(key);
            console.log('수정할 데이터', stock);
        } else if (tagName === 'BUTTON') {
            
        }
        setModalTitle(title);
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
                        <Tag color="red">S</Tag>
                        : <Tag color="blue">C</Tag>
                    }
                </>
            ) 
        },
        {
            dataIndex: 'name',
            title: '종목명',
            width: '10%',
            render: (text, record) => <a data-key={ record.key } onClick={showModal}>{text}</a>
        },
        {
            dataIndex: 'strategy',
            title: '투자',
            width: '4%',
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
            title: '리딩날짜',
            width: '8%',
            align: 'center',
            render: (v) => (v ? v.substring(0, 10) : '')
        },
        {
            dataIndex: 'goal_at',
            title: '목표 달성일',
            width: '8%',
            align: 'center',
            render: (v) => (v ? v.substring(0, 10) : '')
        },
        {
            dataIndex: 'loss_at',
            title: '손절날짜',
            width: '8%',
            align: 'center',
            render: (v) => (v ? v.substring(0, 10) : '')
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
                        placeholder="종목명을 입주세요"
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
                isVisible={isVisible}
                submitStockForm={handleSaveStock}
                closeModal={closeModal}
            />
        </>
    );
};

export default Leading;