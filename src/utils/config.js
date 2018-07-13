const APIV1 = '/admin/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: 'OFFER WALL Admin',
  prefix: '',
  footerText: 'Created by adolph © 2017',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login.html'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    //userLogin: `${APIV1}/user/login`,
    userLogin: `${APIV1}/user/qqlogin`,
    userInfo: `${APIV1}/user/detail`,
    user: `${APIV1}/user/detail`,

    OrderSetting: `${APIV1}/order`,
    OrderSettingOption: `${APIV1}/order/:id`,
    OrderSettingNew: `${APIV1}/order/:id/only-new`,
    OrderSettingPause: `${APIV1}/order/:id/pause`,
    OrderSettingReleaseTask: `${APIV1}/order/:id/release`,
    OrderSettingRankTop: `${APIV1}/order/:id/rank-top`,
    OrderQueryIDFA:`${APIV1}/order/:id/IDFA`,

    Cash: `${APIV1}/cash`,
    CashOption: `${APIV1}/cash/:id`,
    CashCompleteAll:`${APIV1}/cash/completeAll`,

    Member: `${APIV1}/member`,
    MemberOption: `${APIV1}/member/:id`,
    MemberDataAnalysis: `${APIV1}/member/dataAnalysis`,

    CreditCash: `${APIV1}/credit_cash`,
    CreditCashOption: `${APIV1}/credit_cash/:id`,

      ipCheck: `${APIV1}/user_detail/ipcheck`,
      UserDetail: `${APIV1}/user_detail/detail`,
      markCashApply: `${APIV1}/cash/markcashapply`,
    ExceptionLogin:`${APIV1}/exception/login`,
    ExceptionOfferwall:`${APIV1}/exception/offer-wall`,
  },
}
