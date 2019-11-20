/**
  * article模块接口列表
  */

 import base from './base'; // 导入接口域名列表
 import axios from '@/utils/http'; // 导入http中创建的axios实例
 //import qs from 'qs'; // 根据需求是否导入qs模块
 
 const article = {
     // 新闻列表
    articleList () {
        return axios.get(`${base.baseUrl}/topics`);
    },
     // 新闻详情,演示
    articleDetail (id, params) {
        return axios.get(`${base.baseUrl}/topic/${id}`, {
            params: params
        });
    },
     // post提交
    userLogin (params) { //用户登录
         return axios.post(`${base.baseUrl}/user/login`, params);
    },

 }
 
 export default article;