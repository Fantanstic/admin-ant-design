/**
 * Created by cly on 15/06/2018.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,DatePicker,Button} from 'antd'
const FormItem = Form.Item
const Confirm = ({
    onOk,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    ...confirmProps
})=>{
    const handleOk=(e)=>
    {
        const data = {
            ...getFieldsValue(),
        }
        var reg = /^[0-9]+.?[0-9]*$/;
        if(reg.test(data.text))
        {
            onOk(data)
        }

    }
    const confirmOpts = {
        ...confirmProps,
        onOk: (e)=>{handleOk(e)},
    }
    return (<Modal {...confirmOpts}>
    <Form>
        <FormItem label='请输入位置'>
            {
                getFieldDecorator('text',{
                    initialValue: '1',
                    rules:[{
                        required: false,
                    }]
                })(<Input style={{width:160}}/>)
            }

        </FormItem>
    </Form>
    </Modal>)
}

Confirm.propTypes = {
    onOk: PropTypes.func,
}

export default Form.create()(Confirm);