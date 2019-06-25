/* eslint-disable eol-last */
const TimeUtil = {
  toLocaleString (timestamp) {
    var newDate = new Date()
    newDate.setTime(timestamp)
    return newDate.toLocaleString()
  },
  formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  formatTime (number, format) {
    var formateArr = ['Y', 'M', 'D', 'H', 'm', 's']
    var returnArr = []

    var date = new Date(number)
    returnArr.push(date.getFullYear())
    returnArr.push(TimeUtil.formatNumber(date.getMonth() + 1))
    returnArr.push(TimeUtil.formatNumber(date.getDate()))

    returnArr.push(TimeUtil.formatNumber(date.getHours()))
    returnArr.push(TimeUtil.formatNumber(date.getMinutes()))
    returnArr.push(TimeUtil.formatNumber(date.getSeconds()))
    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i])
    }
    return format
  },
  /**
   * 获取时间
   * @returns {string}
   */
  toGetSimpleDate () {
    var newDate = new Date()
    var year = newDate.getFullYear()
    var month = newDate.getMonth()
    var day = newDate.getDay()
    if (month <= 9) month = '0' + month
    if (day <= 9) day = '0' + day
    return year + '-' + month + '-' + day
  },
  /**
   * 获取分钟
   * @returns {string}
   */
  toGetSimpleTime () {
    var newDate = new Date()
    var hours = newDate.getHours()
    var minutes = newDate.getMinutes()
    console.log({changdu: hours})
    if (hours <= 9) hours = '0' + hours
    if (minutes <= 9) minutes = '0' + minutes
    return hours + ':' + minutes
  }
  // var sjc = 1488481383 console.log(time.formatTime(sjc,'Y/M/D h:m:s')); 使用示例
}
export default TimeUtil
