/* 组件全局注册 */
import Vue from 'vue'

import AppSearch from './layout/AppSearch';//搜索栏
import TableMixin from './layout/TableMixin';//表格区

// 组件库
const Components = [
    AppSearch,
    TableMixin
]

// 注册全局组件
Components.map((com) => {
    Vue.component(com.name, com)
})

export default Vue