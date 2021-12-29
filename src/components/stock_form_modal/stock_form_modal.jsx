import React, {useEffect, } from 'react';
import styles from './stock_form_modal.module.css';
import {Modal, Form, Row, Col, Button, Input, Select, DatePicker, Upload} from 'antd';
import { CloudUploadOutlined, } from '@ant-design/icons';
import moment from 'moment';

const StockForm = ({ title, stockInfo, isVisible, closeModal, submitStockForm, deleteStock, }) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    useEffect(() => {
        if (stockInfo) {
            form.setFieldsValue({
                id: stockInfo.id,
                strategy: stockInfo.strategy || '',
                code: stockInfo.code || '',
                name: stockInfo.name,
                first_price: stockInfo.first_price,
                second_price: stockInfo.second_price,
                third_price: stockInfo.third_price,
                goal_price: stockInfo.goal_price,
                loss_price: stockInfo.loss_price,
                bigo: stockInfo.bigo,
                lead_at: moment(stockInfo.lead_at),
            });
        } else {
            form.resetFields();
        }
    });

    const isNumberAndPositive = (value) => {
        const numberRegEx = new RegExp(/\d*(\.?\d*)$/);
        console.log('v:', value)
        if (value && (value < 0 || value > 0 && !numberRegEx.test(value))) {
            console.log('false')
            return false;
        }
        console.log('true')
        return true;
    }

    const handleSubmit = () => {
        const formData = form.getFieldsValue();
        if (Object.keys(formData).find(k => k.includes('_price') && !isNumberAndPositive(formData[k]))) {
            alert('1~3차 가격, 목표가, 손실가 필드는 숫자만 가능합니다.');
        }
        // console.log('이상무!')
        // return;
        form.validateFields()
            .then(values => {
                submitStockForm(values, form.resetFields);
            })
            .catch(info => {
                console.log('Validate Failed: ', info);
            });
    };

    const handleDelete = () => {
        deleteStock(form.getFieldValue('id'));
    };

    return (
        <Modal
            title={`종목 ${title}`}
            visible={isVisible}
            onOk={handleSubmit}
            onCancel={closeModal}
            footer={[
                <Button key="cancel" onClick={closeModal}>취소</Button>,
                <Button
                    key="delete"
                    type="danger"
                    onClick={handleDelete}
                    className={stockInfo ? '' : styles.hide}
                >삭제</Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>저장</Button>,
            ]}
            okText="저장"
            cancelText="취소"
        >
            <Form
                form={form}
                name="control-hooks"
                layout="vertical"
                initialValues={{
                    type: 'stock',
                    lead_at: moment(),
                    first_price: 0,
                    second_price: 0,
                    third_price: 0,
                    loss_price: 0,
                }}
            >
                <Row>
                    <Form.Item
                        name="id"
                    >
                        <Input type="hidden" />
                    </Form.Item>
                    <Col span={7}>
                        <Form.Item
                            name="type"
                            label="타입"
                            rules={[
                                { required: true }
                            ]}
                        >
                            <Select>
                                <Option value="stock">주식</Option>
                                <Option value="coin">코인</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={1}/>
                    <Col span={7}>
                        <Form.Item
                            name="strategy"
                            label="투자전략"
                            rules={[
                                { required: true }
                            ]}
                        >
                            <Select>
                                <Option value="단기">단기</Option>
                                <Option value="농사">농사</Option>
                                <Option value="스윙">스윙</Option>
                                <Option value="중기">중기</Option>
                                <Option value="장기">장기</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={7}>
                        <Form.Item
                            name="code"
                            label="Code"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={15} offset={1}>
                        <Form.Item
                            name="name"
                            label="종목명"
                            rules={[
                                { required: true, }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={7}>
                        <Form.Item
                            name="first_price"
                            label="1차 가격"
                            rules={[
                                { required: true, },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={1}/>
                    <Col span={7}>
                        <Form.Item
                            name="second_price"
                            label="2차 가격"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={1}/>
                    <Col span={7}>
                        <Form.Item
                            name="third_price"
                            label="3차 가격"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={7}>
                        <Form.Item
                            name="lead_at"
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
                            name="goal_price"
                            label="목표가"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={1}/>
                    <Col span={7}>
                        <Form.Item
                            name="loss_price"
                            label="손실가"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={23}>
                        <Form.Item
                        name="bigo"
                        label="비고">
                            <Input.TextArea
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={23}>
                        <Form.Item
                            name="upload"
                            valuePropName="fileList"
                            getValueFromEvent={e => {
                                if (Array.isArray(e)) {
                                    return e;
                                }
                                return e && e.fileList;
                            }}
                        >
                            <Upload
                                listType="picture"
                                maxCount={1}
                            >
                                <Button icon={<CloudUploadOutlined />}>차트 업로드</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default StockForm;