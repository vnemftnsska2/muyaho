import React, { useState, useEffect, useMemo, } from 'react';
import styles from './leading.module.css';
import PageTitle from '../../page_title/page_title';
import { Table, Row, Col, Button, Modal, Form, Input, Select, DatePicker, Upload } from 'antd';
import { PlusCircleOutlined, CloudUploadOutlined, } from '@ant-design/icons';
import _default from 'rc-trigger';

const Leading = () => {
    const [leadingList, setLeadingList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const { Option } = Select;
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
            return result.list.map(stock => {
                stock.key = stock.code;
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

    const handleSaveStock = () => {
        alert('저장되었습니다.');
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
            <Modal
                title="종목 추가"
                visible={isVisible}
                onOk={handleSaveStock}
                onCancel={closeModal}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        // loading={loading}
                        onClick={handleSaveStock}>
                    저장
                    </Button>,
                ]}
            >
                <Form
                    layout="vertical"
                >
                    <Row>
                        <Col span={7}>
                            <Form.Item
                                name={['stock', 'type']}
                                label="타입"
                                rules={[
                                    { required: true }
                                ]}
                            >
                                <Select defaultValue="stock">
                                    <Option value="stock">주식</Option>
                                    <Option value="coin">코인</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={1}/>
                        <Col span={7}>
                            <Form.Item
                                name={['stock', 'strategy']}
                                label="투자전략"
                                rules={[
                                    { required: true }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <Form.Item
                                name={['stock', 'code']}
                                label="Code"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={15} offset={1}>
                            <Form.Item
                                name={['stock', 'name']}
                                label="종목명"
                                rules={[
                                    { required: true, }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <Form.Item
                                name={['stock', 'first_price']}
                                label="1차 가격"
                                rules={[
                                    { required: true, }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={1}/>
                        <Col span={7}>
                            <Form.Item
                                name={['stock', 'second_price']}
                                label="2차 가격"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={1}/>
                        <Col span={7}>
                            <Form.Item
                                name={['stock', 'third_price']}
                                label="3차 가격"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <Form.Item
                                name={['stock', 'lead_date']}
                                label="리딩일"
                                rules={[
                                    { required: true, }
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col span={1}/>
                        <Col span={7}>
                            <Form.Item
                                name={['stock', 'goal_price']}
                                label="목표가"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={1}/>
                        <Col span={7}>
                            <Form.Item
                                name={['stock', 'loss_price']}
                                label="손실가"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={23}>
                            <Form.Item
                            name={['stock', 'bigo']}
                            label="비고">
                                <Input.TextArea
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={23}>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture"
                            maxCount={1}
                        >
                            <Button icon={<CloudUploadOutlined />}>차트 업로드</Button>
                        </Upload>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default Leading;