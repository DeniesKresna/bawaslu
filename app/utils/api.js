import axios from "axios";

export const serverBaseUrl = "http://localhost:8090/api/v1/";
/*
const api = axios.create({
    baseURL: serverBaseUrl
});
api.defaults.timeout = 10000;

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.common["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      let msg = response.data.Message;
      if(msg !== undefined){
        if(msg != "")
          console.log(msg);
      }
      return Promise.resolve(response.data.Data);
    } else {
        console.log("Server Error");
        return ;
    }
  },
error => {
    let msg = error.response.data.Message;
    if(error.response.status === 401){
        console.log("Unauthorized");
    }
    else if(msg !== undefined){
        let msg = error.response.data.Message;
        console.log(msg);
    }
    else if(error.response.status === 500){
        let msg = "Server mengalami permasalahan. Coba restart ulang.";
        console.log(msg);
    }
    else if(error.response.status === 430){
        console.log(error.response.data)
    }
    else{
        console.log(error.response);
    }
    return Promise.reject(error.response);
  }
);
*/
/**
 * Create an Axios Client with defaults
 */

 //const getToken = async () => await AsyncStorage.getItem("access-token")

 let token = localStorage.getItem("token");
 if (token) {
    token = "Bearer " + token;
 }else{
    token = "xxx";
 }

 const api = axios.create({
     baseURL: serverBaseUrl,
 });

 api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if(token != null)
    config.headers.Authorization =  "Bearer " + token;

  return config;
});
 /**
* Request Wrapper with default success/error actions
 *
 * @param  {string} method
 *
 * @param  {string} route
 *
 * @param  {object} body
 *
 * @return {object} Response data
 */
export default function request (method, route, body = null) {

  const onSuccess = function (response) {
      //console.debug('Request Successful!', response);
      return response.data;
  }

  const onError = function (error) {
      console.error('Request Failed:', error.config);

      if (error.response.Message) {
          // Request was made but server responded with something
          // other than 2xx
          console.error(error.response.Message);

      }
      else if (error.response) {
          // Request was made but server responded with something
          // other than 2xx
          console.error(error.response);

      } else {
          // Something else happened while setting up the request
          // triggered the error
          console.error('Error Message:', error.message);
      }

      return Promise.reject(error.response.data);
  }

  return api({
      method,
      url: route,
      data: body
  }).then(onSuccess)
      .catch(onError);
}