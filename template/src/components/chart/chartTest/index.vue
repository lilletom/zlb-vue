<template>
	<!-- 图表内容区域，必须给Echarts容器本身指定高度。不然它会使用默认高度 -->
	<div class="chart">
		<div id="echarts" style="width: 100%; height: 3rem;"></div>
	</div>
</template>

<script>
import lodash from 'lodash'
export default{
	data(){
		return{
			chart: { 
				target: null,
                data: [],
				option: {
				  tooltip : {
			        trigger: 'axis',
			        formatter: function (params) {
			            var res = params[0].seriesName + ' ' + params[0].name;
			            res += '<br/>  开盘 : ' + params[0].value[0] + '  最高 : ' + params[0].value[3];
			            res += '<br/>  收盘 : ' + params[0].value[1] + '  最低 : ' + params[0].value[2];
			            return res;
			        }
			      },
			      dataZoom : {
			        show : true,
			        realtime: true,
			        start : 50,
			        end : 100
			      },
				  xAxis : [
			        {
			            type : 'category',
			            boundaryGap : true,
			            axisTick: {onGap:false},
			            splitLine: {show:false},
			            data : [
			                "2013/1/24", "2013/1/25", "2013/1/28", "2013/1/29", "2013/1/30"
			            ]
			        }
			      ],
				  yAxis : [
			        {
			            type : 'value',
			            scale:true,
			            boundaryGap: [0.01, 0.01]
			        }
				  ],
				  series : [
				    {
				            type:'k',
				            data:[ // 开盘，收盘，最低，最高

				            ]
				        }
    				]
				}
			},
		}
	},
	props: {
        chartData: Array
    },
    watch: {
        chartData(){
            if(this.chartData.length){
            	return this.chart.data = this.chartData
            }
        },
        'chart.data'(){
            this.draw()
        }
    },
	mounted(){
		//初始化EChart实例，不能在created生命周期内初始化，因为那时候DOM还没有渲染，是找不到元素的
		this.$nextTick(() => {
            this.initChart();
        })
	},
	methods: {
		initChart(){
			//基于准备好的dom，初始化echarts实例，移动端建议使用svg模式
			//this.chart = echarts.init(document.getElementById('echarts'))
			if(!this.chart.target){
				this.chart.target = echarts.init(document.getElementById('echarts'), 'light', {renderer: 'svg'})
			}
			this.chart.target.setOption(this.chart.option)

			//图标根据窗口大小自动缩放
			//window.addEventListener("resize", this.chart.resize);
		},
		splitData(rawData) {//处理数据
			let categoryData = [];
			let values = [];
			for (let i = 0; i < rawData.length; i++){
				categoryData.push(rawData[i].slice(0,1)[0]);
				values.push(rawData[i].slice(1,5))
			}
			return {
				categoryData: categoryData,
				values: values
			};
		},
		draw(){
			
			let lineData = this.splitData(this.chartData);
			console.log(lineData.categoryData)
			console.log(lineData.values)
			let option = {
                xAxis: {
                    data: lineData.categoryData
                },
                series: {
                	data: lineData.values
                }
            }
			lodash.defaultsDeep(option, this.chart.option)
    		//this.initChart();
            this.chart.target.setOption(option);
		},
	},
	beforeDestroy() {
		//组件销毁前先销毁ECharts实例
		/*if(!this.chart) {return}
		this.chart.dispose()
		this.chart = null*/
        //this.websock.close() //离开路由之后断开websocket连接
    },
}
</script>



    // methods:{
    //     barGo(index){
	// 		this.barIndex = index;
	// 		this.over();
	// 		if(index == 1){
	// 			this.websocket('330_KLINE_1D_ETH_USDT',7);
	// 		}else if(index == 2){
	// 			this.websocket('330_KLINE_1D_ETH_USDT',30);
	// 		}else {
	// 			this.websocket('330_KLINE_1H_ETH_USDT',10);
	// 		}
	// 	},

    //     websocket(type,size){
	// 		let ws = new WebSocket("wss://kline.zbg.com/websocket")
	// 		ws.onopen = () => {
	// 			//webSocket已连接上，使用send()方法发送数据
	// 			let actions = {
	// 				"dataType": type,
	// 				"dataSize": size,
	// 				"action": "ADD"
	// 			}
	// 			ws.send(JSON.stringify(actions))
	// 		}
	// 		ws.onmessage = (e) => {
	// 			let redata = JSON.parse(e.data);
	// 			console.log(redata)
	// 			if(redata[0].length > 1){
	// 				this.trData = redata;
	// 			}else {
	// 				this.trData[0] = redata;
	// 			}
	// 			this.cutData();
	// 			this.chartData = this.sliceData(this.trData).reverse();
	// 			//console.log(this.chartData)
	// 		}
	// 		ws.onclose = function () {
	// 			//关闭 websocket
	// 		}
	// 		// 组件销毁时调用，中断websocket链接
	//         this.over = () => {
	//             ws.close()
	//         }
	// 	},
    //     cutData() {//切割成页面需要的数据
	// 		let rawData = this.sliceData(this.trData)
	// 		this.cutInfo = {
	// 			USDT: rawData[0].slice(2,3)[0],
	// 			CNY: (this.rate * rawData[0].slice(2,3)[0]).toFixed(2)
	// 		}
	// 	},
	// 	sliceData(sData){//接收的数据处理成需要的样子
	// 		let newData = [];
	// 		let sliceData = [];
	// 		let jData = [];
	// 		if(this.barIndex == 0){
	// 			for (let i = 0; i < sData.length; i++){
	// 				for (let j = 0; j < 1; j++){
	// 					sliceData = jData.concat(kSF(sData[i][3]),sData[i][4],sData[i][7],sData[i][5],sData[i][6])
	// 					this.rate = sData[i][10]
	// 				}
	// 				newData.push(sliceData)
	// 			}
	// 		}else{
	// 			for (let i = 0; i < sData.length; i++){
	// 				for (let j = 0; j < 1; j++){
	// 					sliceData = jData.concat(kNYR(sData[i][3]),sData[i][4],sData[i][7],sData[i][5],sData[i][6])
	// 					this.rate = sData[i][10]
	// 				}
	// 				newData.push(sliceData)
	// 			}
	// 		}
			
	// 		return newData
	// 	},
    // },

    // beforeDestroy () {
    //     this.over()
    // }