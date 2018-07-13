import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Input } from 'antd'

const Filter = ({
  onMark,
  batchComplete,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {

  return (
    <Row gutter={24}>
      <Col  span= {21}></Col>
      <Col span={3} >

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{padding:10}}>
            <Button size="large" type="ghost" onClick={batchComplete}>全部完成</Button>
            <Button size="large" type="ghost" onClick={onMark}>开始打款</Button>

          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onMark: PropTypes.func,
}

export default Form.create()(Filter)
