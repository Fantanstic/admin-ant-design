export async function query () {
  let menu = [
    {
      id: 1,
      name: '上单管理',
      route: '/main.html',
    },
    {
      id: 2,
      name: '提现管理',
      // route: '/cash.html',
    },
    {
      id: 21,
      bpid: 2,
      mpid: 2,
      name: '提现申请',
      route: '/cash.html',
    },
    {
      id: 22,
      bpid: 2,
      mpid: 2,
      name: '提现规则',
      route: '/credit-cash.html',
    },
    {
        id: 3,
        name: '用户管理',
        // route: '/member.html',
    },
      {
          id: 31,
          bpid: 3,
          mpid: 3,
          name: '用户列表',
          route: '/member.html',
      },

    {
      id: 4,
      name: '数据统计',
      route: '/data-analysis.html',
    },
    {
      id: 5,
      name: '用户信息查询',
      route: '/ip-lookup.html',
    },
      {
        id: 6,
        name: '登录数据异常',
        route: '/exceptionLogin.html',
      },
  ]
  return menu
}
