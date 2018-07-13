/**
 * Created by cly on 26/06/2018.
 */
/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker,Radio, Input, Cascader, Switch } from 'antd'
import city from '../../utils/city'

const { Search } = Input
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
const FormItem = Form.Item

const Filter = ({
                    query,
                    form: {
                        getFieldDecorator,
                        getFieldsValue,
                        setFieldsValue,
                    },
                }) => {
    const optionsState = [
        { label:'全部',value:'all'},
        { label: '已注册', value: 'register' },
        { label: '已做任务', value: 'credit' },
        { label: '已提现', value: 'money' },
    ];

    const dateFormat = 'YYYY-MM-DD';

    const handlerSearch=(e)=>{
        var data = {
            ...getFieldsValue(),
        }
        data.date = data.date.format(dateFormat);
        query(data);
    }
    return (
        <div>
            <Form>
                <FormItem label="状态: ">
                    {
                        getFieldDecorator('state',{
                            initialValue: 'all',
                            rules:[{
                                required: false,
                            }]
                        })
                        (<RadioGroup options={optionsState} />)
                    }
                </FormItem>
                <FormItem label="日期">
                    {
                        getFieldDecorator('date',{
                            initialValue: moment(new Date(),dateFormat),
                            rules:[{
                                required: false,
                            }]
                        })
                        (<DatePicker/>)
                    }
                </FormItem>
                <FormItem>
                    <Button size="large" type="ghost" onClick={(e)=>handlerSearch(e)}>查找</Button>
                </FormItem>
            </Form>

        </div>
    )
}

Filter.propTypes = {
    form: PropTypes.object,
    filter: PropTypes.object,
}

export default Form.create()(Filter)
