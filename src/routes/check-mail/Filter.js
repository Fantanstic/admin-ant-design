import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Input } from 'antd'

const Filter = ({
  onAdd,
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
            <Button size="large" type="ghost" onClick={onAdd}>創建訂單</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
}

export default Form.create()(Filter)
