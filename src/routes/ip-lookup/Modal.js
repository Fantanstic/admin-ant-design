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
  keywordVisible,
  starVisible,
  onChange,
  confirmLoading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = (e) => {
    
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
    confirmLoading:confirmLoading,
    onOk: (e)=>{handleOk(e)},
  }

  const handleChange = (e)=>{
      onChange(e)
  }

  const controlWidth=160

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="訂單類型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: String(item.type),
          })( <Select
              //  labelInValue
              //  defaultlValue= {{key:"1"}}
                style={{ width: controlWidth }}
                onChange={(e)=>handleChange(e)}
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
          })(<Input   style={{ width: controlWidth }} />)}
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
          })(<InputNumber max={9999} min={1}   style={{ width: controlWidth }} />)}
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
          })(<InputNumber   style={{ width: controlWidth }} />)}
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
                style={{ width: controlWidth }}
                initialValue="1"
              >
                <Option value="508">508</Option>
                <Option value="608">608</Option>
                <Option value="708">708</Option>
              </Select>)}
        </FormItem>
        <FormItem label="关键词" style={{ display: keywordVisible?'':'none' }} hasFeedback {...formItemLayout}>
          {getFieldDecorator('keyword', {
            initialValue: item.keyword,
            rules: [
              {
                required: keywordVisible? true:false,
              },
            ],
          })(<Input   style={{ width: controlWidth }} />)}
        </FormItem>
        <FormItem label="星级" style={{ display: starVisible?'':'none' }}  hasFeedback {...formItemLayout}>
          {getFieldDecorator('star', {
            initialValue: item.star,
            rules: [
              {
                required: starVisible? true:false,
              },
            ],
          })(<InputNumber max={5} min={1} initialValue={5}    style={{ width: controlWidth }}/>)}
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
                style={{ width: controlWidth }}
                initialValue="US"
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
