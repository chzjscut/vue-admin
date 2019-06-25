/**
 * Created by mac on 17/12/15.
 */
const ConfigUtil = {
  getMarketingSceneType(){
    var marketingSceneType = {
      MARKETINGSCENETYPE_ACTIVATEUSERCARD:1004,//激活会员卡
      MARKETINGSCENETYPE_BUY:1001,//消费
      MARKETINGSCENETYPE_INVITE:1002,//邀请
      MARKETINGSCENETYPE_NEW:1005,//新客户
      MARKETINGSCENETYPE_SCANQRCODE:1003,//扫码
      MARKETINGSCENETYPE_USECOUPON:1006//扫码
    };
    return [
      { text: '激活会员卡', value: marketingSceneType.MARKETINGSCENETYPE_ACTIVATEUSERCARD },
      { text: '消费', value: marketingSceneType.MARKETINGSCENETYPE_BUY },
      { text: '邀请', value: marketingSceneType.MARKETINGSCENETYPE_INVITE },
      { text: '新客户', value: marketingSceneType.MARKETINGSCENETYPE_NEW },
      { text: '扫码', value: marketingSceneType.MARKETINGSCENETYPE_SCANQRCODE},
      { text: '核销', value: marketingSceneType.MARKETINGSCENETYPE_USECOUPON}]
  },
  getServerDomain(){
    //return 'http://localhost:8080'
    return 'http://swdev.suconnected.com'
    //return 'https://www.suconnected.com'
  },
  toTransformRequestBodyParameters(obj) { //转化http请求的body为可用的格式
    var query = '';
    var name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.toTransformRequestBodyParameters(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          if(subValue==null||subValue===""){
            continue;
          }
          fullSubName = name + '.' + subName + '';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.toTransformRequestBodyParameters(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  }

}
export default ConfigUtil
