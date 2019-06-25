import axios from 'axios'
//import { Message } from 'element-ui'
import configUtil from '@/utils/ConfigUtil'
import cacheCookies from '@/utils/auth'

export default async function request (options) {
  if (options.headers) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  } else {
    options.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
  }
  options.type = 'json';
  options.method = 'POST';
  //options.url = configUtil.getServerDomain() +"/" + options.url;
  options.url = process.env.BASE_API +"/api/" + options.url;
  if(!options.data) {
    options.data = {};
  }
  options.data.token = cacheCookies.getToken(); //"48db9de3e71111e49b64752a9224684c";
  options.data = configUtil.toTransformRequestBodyParameters(options.data);
  const response = await axios(options);
  /*if (response.data.status !== 1){
    Message({
      message:'出错了！',
      type:'error',
      duration: 3 * 1000,
      customClass: 'message-tip-level'
    });
  }*/
  return response.data
}



