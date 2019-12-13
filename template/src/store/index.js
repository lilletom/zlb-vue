import Vue from 'vue' //引用vue
import Vuex from 'vuex' //引用vuex
//使用vuex
Vue.use(Vuex)

//创建Vuex实例
const store = new Vuex.Store({
    // 调用this.$store.state.count
    state: {
        count: 1
    },
    // 调用this.$store.getters.getStateCount
    getters: {
        getStateCount:function(state) { //上面的state
            return state.count+1;
        }
    },
    // 调用函数,this.$store.commit("add/reduction")
    mutations: {
        add(state){ //上面的state
            state.count = state.count+1;
        },
        reduction(state,n){ //上面的state
            state.count = state.count-n;
        }
    },
    // 调用函数,this.$store.dispatch("addFun/reductionFun")
    actions: { //注册actions，类似vue里的mothods
        addFun(context){ // 接收一个与store实例具有相同方法属性的context对象
            context.commit("add");
        },
        reductionFun(context,n){ // 接收一个与store实例具有相同方法属性的context对象
            context.commit("reduction",n);
        }
    }
})

export default store //导出store