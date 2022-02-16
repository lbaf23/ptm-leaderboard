import moment from 'moment'
//import 'moment/locale/zh-cn'

//moment.locale('zh-cn')

function TimeFilter(time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}


export default {
  TimeFilter
}
