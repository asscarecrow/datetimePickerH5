<template>
<transition name="slide-right">
<div id="layerWrap" v-show="show"  :class={active:show}>
    <div class="layer-mask" v-show='show' @click='close'></div>
    <div class="layer"><div class="wrap" :class={active:showStore}>
        <form class="form-layer">
            <div class="head">
                <!--<a class="fr" href="javascript:;">重置</a>-->
                <button type='reset' class='reset fr' @click='reset'>重置</button>
                <a href="javascript:;" @click="close">关闭</a>
            </div>
            <div class="body">
               
                <div class="row weui-flex">
                    <div  class="text"><label>厂家</label></div>
                    <input class="weui-flex__item" type="text" v-model='factory_name'>
                </div>
                <div class="row weui-flex">
                    <div  class="text"><label>时间</label></div>
                    <input class="weui-flex__item" type="text" readonly id="datePicker" @click="slide(2)" :value='timeText'>
                </div>
                <button type="button" class="search-btn" @click='search'>搜索</button>

            </div>
        </form>
        <div class="cont-layer">
            <section class="time" v-show="showStore==2">
                <div class="head">
                    <a href="javascript:;" @click="showStore=false">返回</a>
                </div>
                <div class="body">
                    <div class="date startDate">
                        <h2 class="t">开始日期</h2>
                        <date-picker @update-date='onUpdateStart' :end='can_end'></date-picker>
                    </div><div class="date">
                        <h2 class="t">结束日期</h2>
                        <date-picker @update-date='onUpdateEnd' :start='can_start'></date-picker>
                    </div>
                    <button type="button" class="search-btn" @click="confirmTime">确定</button>
                </div>
            </section>
        </div>
    </div></div>
    
</div>
</transition>
</template>
<script>
const datePicker = r => require.ensure([],()=>r(require('components/datetimePickerH5.vue'),'picker'));

    export default{
        
        components:{
            datePicker
        },
        props:{
            show:{
                type:Boolean,
                default:false
            },
            repo:null

        },data(){
            return {
                //showForm:this.show
                
                showStore: false,
                selectTime:{//选择的时间
                    start:'',
                    end:''
                },
                start:'',//确定的时间
                end:'',
                timeText:'',
                factory_name: '',
                can_start:'2015-10-5',
                can_end:'2020-11-9'
            }
        },
        computed:{
            slideLayer(){return this.show},
        },
       
        methods:{
            slide(type){
                if(type==1){
                    //显示选择仓库
                    this.showStore = 1;
                }else if(type==2) {
                    this.showStore = 2;
                }
            },
            reset(){
                this.factory_name= '';
                this.start='';
                this.end='';
            },
            close(){
                this.$emit('close')
            },
            onUpdateStart(val){
                this.selectTime.start=val;
            },
             onUpdateEnd(val){
                this.selectTime.end = val;
            },
            confirmTime(){
                this.start=this.selectTime.start;
                this.end = this.selectTime.end;
                this.timeText=this.start+'~'+this.end;
                this.showStore=false;
                
            },
            search(){
                var _self = this;
                console.log(this.start,this.end);
                this.$emit('close');
            }
        }
       
    }
</script>
<style lang="scss">


#layerWrap {position: fixed;top:0;left: 0;right: 0;bottom:0;z-index:8000;
    .search-btn {position: absolute;bottom:0;left:0;width: 100%;padding: 0.15rem 0; text-align: center;font-size: 0.18rem;color: #fff;background:#1CAF9A;}
   
}
.layer-mask {position: absolute;top:0;left: 0;right: 0;bottom:0;z-index:8000;background: rgba(0,0,0,0.6);}
.layer {position: absolute;top: 0;height: 100%;right: 0;width: 90%;z-index: 9000;background: #fff;overflow: hidden;/*animation: slideRight ease .3s forwards;*/
    .wrap {width: 100%;height: 100%;transition: transform .3s ease-in;
        &.active {transform:translateX(-100%);}
    }
    .head {padding: 0.1rem 0;background: #f2f2f2;
        a {padding: 0 0.2rem;color: #999;font-size: 0.2rem;}
        button.reset {padding: 0 0.2rem;color: #999;background: none;border: none;font-size: 0.2rem;}
    }
    .body {
        padding: 0.2rem 0.25rem;
        .t {padding: 0.05rem;margin-bottom: 0.05rem;font-size: 0.18rem;text-align: center;color: #999;}
    }
}

.form-layer {width: 100%;height: 100%;
    .row {margin-bottom: 0.25rem;
        
        label {font-size: 0.18rem;color: #999;vertical-align: middle;}
        input[type="text"] {width: 100%;font-size: 0.18rem;border: none;border-bottom: 1px solid #ddd;}
        .text {padding-right: 0.1rem;
            //label {margin-right: 0.2rem;}
        }
    
    }
}
.cont-layer {width: 100%;height: 100%;transform:translate(100%,-100%);
    //.time .body {padding-top: 0.05rem;}
    .date {
        &.startDate {margin-bottom: 0.15rem;}
    }
    .repo {position: relative;overflow: hidden;
        li {float: left;padding: 0.1rem 0;width: 50%;text-align: center;
            a {font-size: 0.20rem;}
            a:active {color: #1CAF9A;}
        }
    }
}
// @keyframes slideRight {
//     0% {transform:translate3d(100%,0,0);}
//     to {transform:translate3d(0,0,0);}
// }
// @keyframes slideLeft {
//     0% {transform:translate3d(0,0,0);}
//     to {transform:translate3d(100%,0,0);}
// }

.slide-right-enter-active,
.slide-right-leave-active { transition: all .3s ease-out;}
.slide-right-enter {transform:translate3d(100%,0,0);}
.slide-right-leave-active {transform:translate3d(100%,0,0);}
</style>