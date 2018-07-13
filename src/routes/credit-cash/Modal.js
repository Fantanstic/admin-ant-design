import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,DatePicker} from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item
const Option = Select.Option;

import moment from 'moment';


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const handleChange = (e)=>{}

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="金额" hasFeedback {...formItemLayout}>
          {getFieldDecorator('money', {
            initialValue: item.money,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber max={50} min={2}    style={{ width: 120 }} />)}
        </FormItem>
        <FormItem label="积分" hasFeedback {...formItemLayout}>
          {getFieldDecorator('credit', {
            initialValue: item.credit,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber max={50000} min={2000}  style={{ width: 120 }} />)}
        </FormItem>
          <FormItem label="火热中" hasFeedback {...formItemLayout}>
              {getFieldDecorator('hot', {
                  initialValue: item.hot,
              })( <Select
                  //  labelInValue
                   defaultlValue= {{key:"1"}}
                  style={{ width: 120 }}
                  onChange={handleChange}
              >
                  <Option value="0">否</Option>
                  <Option value="1" >是</Option>

              </Select>)}
          </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
