import React, {useEffect, } from 'react'
import styles from './select_date_modal.module.css'
import {Modal, Form, Row, Col, Button, Input, DatePicker, } from 'antd'
import {InfoCircleOutlined, } from '@ant-design/icons';
import moment from 'moment'

const SelectDateModal = ({title, stockInfo, isDateVisible, closeDateModal, submitUpdateDate}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (stockInfo) {
      form.setFieldsValue({
        id: stockInfo.id || '',
        name: stockInfo.name || '',
        bigo: stockInfo.bigo || '',
      });
    }
  }, [stockInfo]);
  
  const leadAtAfterDate = (current) => {
    return stockInfo && moment(stockInfo.lead_at).subtract(1, 'days') > current
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const type = title === '달성일' ? 'G' : 'L';
    const dateValues = { type, ...values };
    submitUpdateDate(dateValues);
  }

  return (
    <Modal
      title={title}
      visible={isDateVisible}
      onOk={handleSubmit}
      onCancel={closeDateModal}
      footer={[
        <Button key="cancel" onClick={closeDateModal}>취소</Button>,
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
          goal_at: moment(),
          loss_at: moment(),
        }}
      >
        <Row>
          <Form.Item name="id">
            <Input type="hidden" />
          </Form.Item>
          <Col span={15}>
            <Form.Item
              name="name"
              label="종목명"
              rules={[ { required: true, } ]}
            >
              <Input className={styles.stockName} readOnly/>
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name={title === '달성일' ? 'goal_at' : 'loss_at'}
              label={title}
              tooltip={{
                title: `제거 시 ${title}이 삭제됩니다.`,
                icon: <InfoCircleOutlined />,
              }}
            >
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={leadAtAfterDate}
              />
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
      </Form>
    </Modal>
  );
};

export default SelectDateModal;