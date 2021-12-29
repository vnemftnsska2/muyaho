import styles from './leading.module.css';
import React, { useState, useEffect, useMemo, } from 'react';
import PageTitle from '../../page_title/page_title';
import { Table, Row, Col, Button, Tag, Tooltip, Input, } from 'antd';
import { PlusCircleOutlined, ScheduleTwoTone, } from '@ant-design/icons';
import StockFormModal from '../../stock_form_modal/stock_form_modal';
import SelectDateModal from '../../select_date_modal/select_date_modal';

const Leading = ({stockRepository}) => {
    // 리딩 리스트
    const [allList, setAllList] = useState([]); // 검색 때문에 하나 더 유지
    const [leadingList, setLeadingList] = useState([]);

    // Form 모달
    const [isVisible, setIsVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [stockInfo, setStockInfo] = useState(null);

    // Date 모달
    const [isDateVisible, setIsDateVisible] = useState(false);
    
    const getLeadingList = async () => {
        const data = await stockRepository.asyncLeadingList();
        if (!data?.fatal) {
            setAllList(data);
            setLeadingList(data);
        }
    };

    // Init
    useEffect(getLeadingList, [stockRepository]);

    // Form Modal
    const showModal = async event => {
        const target = event.target;
        const tagName = target.tagName;
        const title = tagName === 'A' ? '수정' : '추가';
        if (tagName === 'A') {
            const sid = target.dataset.sid;
            const stock = await stockRepository.asyncLeadingList(sid);
            if (!stock) {
                return alert('요청 실패하였습니다.');
            }
            setStockInfo(stock[0]);
        } else {
            setStockInfo(null);
        }
        setModalTitle(title);
        setIsVisible(true);
    }
    
    const closeModal = () => setIsVisible(false);

    // Date Modal
    const showDateModal = async event => {
        const target = event.target;
        let modalTitle = '';
        let sid = target.dataset.sid;
        let pNode = target.parentNode;
        while(true) {
            if (pNode?.dataset.sid) {
                sid = parseInt(pNode.dataset.sid);
                modalTitle = pNode.dataset.type === 'G' ? '달성일' : '손절일';
                break;
            } else {
                pNode = pNode.parentNode;
            }
        }
        // Get 달성 or 손절 도달한 종목
        const stock = await stockRepository.asyncLeadingList(sid);
        if (stock) {
            setModalTitle(modalTitle);
            setStockInfo(stock[0]);
            setIsDateVisible(true);
        } else {
            alert('선택한 종목을 찾지 못 했습니다.');
        }
    }

    const closeDateModal = () => setIsDateVisible(false);

    // Stock Info Add || Update || Delete
    const handleSaveStock = (formValues) => {
        // Chart Upload 보류
        let apiUrl = '/api/leading';
        const formData = new FormData();
        for (const key in formValues) {
            if (key === 'id' && formValues[key]) {
                apiUrl = `/api/leading/${formValues[key]}`
            } else {
                if ((key === 'code' || key === 'bigo') && !formValues[key]) {
                    formValues[key] = '';
                }
                formData.append(key, formValues[key]);
            }
        }

        // JSON 형태로 데이터만 전송
        return fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues),
        })
        .then(res => res.json())
        .then(({status }) => {
            if (status !== 200) {
                return alert('처리 실패하였습니다.')
            }
            getLeadingList();
            alert('저장되었습니다.');
            closeModal();
        })
        .catch(err => {
            console.log(err);
            return alert('처리 실패하였습니다.')
        });
    }

    const deleteStock = (stockId) => {
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
            closeModal();
        })
        .catch(err => {
            console.log(err);
            return alert('처리 실패하였습니다.');
        });
    }

    const updateGoalOrLossDate = (formValues) => {
        const apiUrl = `/api/leading/finish/${formValues.id}`;
        fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formValues),
        })
        .then(res => res.json())
        .then(({status}) => {
            if (status !== 200) {
                return alert('처리 실패하였습니다.')
            }
            getLeadingList();
            const message = formValues.type === 'G' ?
                '수익 달성 축하드립니다 🤩' : '힘내세요 🙌';
            alert(message);
            closeDateModal();
        })
        .catch(err => {
            console.log(err);
            return alert('처리 실패하였습니다.')
        });
    }

    const handleSearch = event => {
        const searchList = allList
            .filter(stock => stock.name.indexOf(event.target.value) > -1);
        setLeadingList(searchList);
    }

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
            render: (text, record) => <a data-sid={ record.id } onClick={showModal}>{text}</a>
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
            render: (v) => (v ? v.substring(2, 10).replace(/-/gi, '.') : '')
        },
        {
            dataIndex: 'goal_at',
            title: '달성일',
            width: '6%',
            align: 'center',
            render: (v, record) => (v ?
                <Tag color="green" key={record.id}>{v.substring(2, 10).replace(/-/gi, '.')}</Tag>
                : (record.loss_at ? '' : <ScheduleTwoTone data-sid={record.id} data-type="G" twoToneColor="#52c41a" className={styles.twotoneIcon} onClick={showDateModal}/>)
            )
        },
        {
            dataIndex: 'loss_at',
            title: '손절일',
            width: '6%',
            align: 'center',
            render: (v, record) => (v ?
                <Tag color="volcano" key={record.id}>{v.substring(2, 10).replace(/-/gi, '.')}</Tag>
                : (record.goal_at ? '' : <ScheduleTwoTone data-sid={record.id} data-type="L" twoToneColor="#eb2f96" className={styles.twotoneIcon} onClick={showDateModal}/>)
            )
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

            <SelectDateModal
                title={modalTitle}
                stockInfo={stockInfo}
                isDateVisible={isDateVisible}
                closeDateModal={closeDateModal}
                submitUpdateDate={updateGoalOrLossDate}
            />
        </>
    );
};

export default Leading;