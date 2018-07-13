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
        <FormItem label="訂單類型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: String(item.type),
          })( <Select
              //  labelInValue
              //  defaultlValue= {{key:"1"}}
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="1" >ASO任务</Option>
                <Option value="2">用户评论任务</Option>
                <Option value="3">系统评论任务</Option>
              </Select>)}
        </FormItem>
        <FormItem label="應用ID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('store_id', {
            initialValue: item.store_id,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="需求量" hasFeedback {...formItemLayout}>
          {getFieldDecorator('total', {
            initialValue: item.total,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber max={9999} min={1}/>)}
        </FormItem>
        <FormItem label="釋放量" hasFeedback {...formItemLayout}>
          {getFieldDecorator('release', {
            initialValue: item.release,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber />)}
        </FormItem>
        <FormItem label="積分獎勵" hasFeedback {...formItemLayout}>
          {getFieldDecorator('credit', {
            initialValue: item.credit,
            rules: [
              {
                required: true,
              },
            ],
          })(<Select
                style={{ width: 120 }}
                initialValue="1"
                onChange={handleChange}
              >
                <Option value="508">508</Option>
                <Option value="608">608</Option>
                <Option value="708">708</Option>
              </Select>)}
        </FormItem>
        <FormItem label="关键词" hasFeedback {...formItemLayout}>
          {getFieldDecorator('keyword', {
            initialValue: item.keyword,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="星级" hasFeedback {...formItemLayout}>
          {getFieldDecorator('star', {
            initialValue: item.star,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber max={5} min={1} initialValue={5} />)}
        </FormItem>
        <FormItem label="国家" hasFeedback {...formItemLayout}>
          {getFieldDecorator('country', {
            initialValue: item.country,
            rules: [
              {
                required: true,
              },
            ],
          })(<Select
                style={{ width: 120 }}
                initialValue="US"
                onChange={handleChange}
              >
              <Option value="US">US</Option>
              </Select>)}
        </FormItem>
        <FormItem label="任务开始時間" hasFeedback {...formItemLayout}>
          {getFieldDecorator('begin_at', {
            initialValue: moment(item.begin_at, 'YYYY-MM-DD HH:mm:ss'),
            rules: [
              {
                required: true,
              },
            ],
          })( <DatePicker onChange={handleChange} initialValue={moment(item.begin_at, 'YYYY-MM-DD HH:mm:ss')} />)}
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
