import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page} from 'components'
import queryString from 'query-string'
import MainPage from './MainPage'
import { Form, Input,Button,Tag,Table } from 'antd'
const FormItem = Form.Item


const IpLookup = ({ location, dispatch, ipLookup, loading,...others }) => {
    console.log(others);
  location.query = queryString.parse(location.search)
  const { ipaddress,userData } = ipLookup

  const mainPageProps = {
    Address:ipaddress,
      userData:userData,
    onIpLookup (data) {
        console.log(data);
      dispatch({
        type: 'ipLookup/lookup',
        payload: data,
      })
    },
      getContent()
      {
          return "hello world";
      },
      initFromUrl(url,data)
      {
          console.log(data);
          console.log(url);
          //console.log(data.user.id);
          let num = url.indexOf('?')
          if(num == -1)
              return;
          let str = url.substr(num+1);
          let ar = str.split('=');
          if(ar[0] == 'user_id' &&(data == null || ar[1] != data.user.id))
          {
              setTimeout(()=>{
                  dispatch({type:'ipLookup/lookup',
                      payload:{userId:ar[1],ipaddress:''}
                  });
              },500);
          }


      }
      ,

      testDataFun(data)
      {
          let colums = [
              {
                  title: '类型',
                  dataIndex: 'comment',
                  key: 'comment',
              },
              {
                  title: '积分',
                  dataIndex: 'amount',
                  key: 'amount',
              },
              {
                  title: 'AppId',
                  dataIndex: 'task_id',
                  key: 'task_id',
              },
              {
                  title: '时间',
                  dataIndex: 'created_at',
                  key: 'created_at',
              },
              {
                  title: '好友ID',
                  dataIndex: 'invite_id',
                  key: 'invite_id',
              },
              {
                  title: '提现ID',
                  dataIndex: 'cash_apply_id',
                  key: 'cash_apply_id',
              }];
          let columsNone = [
              {
                  title:'',
                  dataIndex:'key',
                  key:'key',
              },
              {
                  title:'',
                  dataIndex:'value',
                  key:'value',
              }
          ];

          let cashApplyColums = [
              {
                  title:'ID',
                  dataIndex:'id',
                  key:'id',
              },
              {
                  title:'邮箱',
                  dataIndex:'account_name',
                  key:'account_name',
              },
              {
                  title:'积分',
                  dataIndex:'credit',
                  key:'credit',
              },
              {
                  title:'美元',
                  dataIndex:'money',
                  key:'money',
              },
              {
                  title:'状态',
                  dataIndex:'status',
                  key:'status',
                  render(text)
                  {
                      switch (text)
                      {
                          case 0:
                              return <span>正在打款</span>
                              break;
                          case 1:
                              return <span style={{color:'#00ff00'}}>打款成功</span>
                              break;
                          case 2:
                              return <span style={{color:'#ff0000'}}>打款失败</span>
                                break;
                          case 3:
                              return <span>等待打款</span>
                                break;
                      }
                  }
              },

              {
                  title:'申请时间',
                  dataIndex:'created_at',
                  key:'created_at',
              },
              {
                  title:'更新时间',
                  dataIndex:'updated_at',
                  key:'updated_at',
              },
          ];
          if(data)
          {
              console.log(data);
              let details = [];
              ([['user_id','用户ID'],['ip','ip'],['created_at','创建时间'],['updated_at','上次登录'],
                  ['language','语言'],['region','区域'],['timezone','时区'],['app_version','版本']]).forEach((k)=>
              {
                  details.push({key:k[1],value:data.device[k[0]]});
              });
              [['credit_balance','积分'],['credit_frozen','冻结积分'],['phone','手机']].forEach((k)=>{
                  details.push({key:k[1],value:data.user[k[0]]})
               });
              details.push({key:"收入",value:(data.income / 1000 + '$')});
              let index = 1;
              data.mails.forEach((v)=>{
                  details.push({key:"邮箱"+index,value:v.name});
                  index ++;
               });

              return (<div>
                  <p>基本信息</p>
                  <Table columns={columsNone} dataSource={details} pagination={false} />
                  <p>提款记录</p>
                  <Table columns={cashApplyColums} dataSource={data.cashApply} />
                  <p>积分记录</p>
                  <Table columns={colums} showHeader="false" bordered dataSource={data.credit_record} />

              </div>)
          }
          else
          {
              return (

                  <span>no data</span>
              );
          }

      },
  }

  return (
    <Page inner>
      <MainPage {...mainPageProps} />
    </Page>
  )
}

IpLookup.propTypes = {
  ipLookup: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ ipLookup, loading }) => ({ ipLookup, loading }))(IpLookup )
