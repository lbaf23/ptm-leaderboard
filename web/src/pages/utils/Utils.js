import moment from 'moment'
//import 'moment/locale/zh-cn'

//moment.locale('zh-cn')

function TimeFilter(time) {
  if (time === '0001-01-01T00:00:00Z') {
    return "---"
  }
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}


export default {
  TimeFilter
}
