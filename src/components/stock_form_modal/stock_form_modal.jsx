import React, { useRef } from 'react';
// import styles from './stock_form.module.css';
import {Modal, Form, Row, Col, Button, Input, Select, DatePicker, Upload} from 'antd';
import { CloudUploadOutlined, } from '@ant-design/icons';
import moment from 'moment';

const StockForm = ({isVisible, closeModal, submitStockForm, }) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const handleSubmit = () => {
        submitStockForm();
        form.resetFields();
    };

    return (
        <Modal
            title="종목 추가"
            visible={isVisible}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        submitStockForm(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed: ', info);
                    });
            }}
            onCancel={closeModal}
            okText="저장"
            cancelText="취소"
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    type: 'stock'
                }}
            >
                <Row>
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
                            <Input />
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
                                { required: true, }
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
                            name="lead_date"
                            label="리딩일"
                            rules={[
                                { required: true, }
                            ]}
                        >
                            <DatePicker defaultValue={moment()}/>
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
                    <Upload
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        name="upload"                    
                        listType="picture"
                        maxCount={1}
                    >
                        <Button icon={<CloudUploadOutlined />}>차트 업로드</Button>
                    </Upload>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default StockForm;