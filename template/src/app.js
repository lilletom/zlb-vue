import Vue from "vue";
import store from './store'
import App from "./app.vue";
{{#router}}
import router from "./router"
{{/router}}

new Vue({
	el: "#app",
	store,
	{{#router}}
	router,
	{{/router}}
	render: h => h(App)
});