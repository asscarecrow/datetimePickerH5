<template>
    <div class="datetimepicker" ref="wrap">
        <section class="section year">
            <ul class="list" ref="yearList" data-ref="yearList">
                <li v-for="year in days.year" :data-val="year">{{year}}</li>
            </ul>
            <div class="mask"></div>
            <div class="indicator" ref="indicator" >年</div>
        </section>
        <section class="section month">
            <ul class="list" ref="monthList" data-ref="monthList">
                <li v-for="month in days.month" :data-val="month">{{month}}</li>
            </ul>
            <div class="mask"></div>
            <div class="indicator" >月</div>
        </section>
        <section class="section day">
            <ul class="list" ref="dayList" data-ref="dayList">
                <li v-for="day in days.day" :data-val="day">{{day}}</li>
            </ul>
            <div class="mask"></div>
            <div class="indicator" >日</div>
        </section>
    </div>
</template>
<style lang="scss" scoped>
    .datetimepicker {position: relative;display: flex;width: 100%;height: 102px;overflow: hidden;
        .section {position: relative;flex:1;height: 100%;
            &.year .indicator {padding-right: 0.05rem;}
            &.month .indicator {padding-right: 0.15rem;}
            &.day .indicator {padding-right: 0.15rem;}
        }
        .list {position: absolute;top:0;left:0;width: 100%;font-size: 16px;
            li {height: 34px;line-height: 34px;text-align: center;}
        }
        .mask {position: absolute;left:0;top: 0;width: 100%;height: 100%;z-index: 3;background:-webkit-linear-gradient(top,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),-webkit-linear-gradient(bottom,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
            background: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
            background-position: top,bottom;background-size: 100% 31px;background-repeat: no-repeat;
            }
        .indicator {box-sizing: border-box;position: absolute;left:0;top: 34px;width: 100%;height: 34px;line-height: 34px;text-align: right;border-top: 1px solid #e5e5e5;border-bottom: 1px solid #e5e5e5;color: #999;
        
        }
        
    }
</style>
<script>
//获取过去十年的年份
const years = (function(){
    var now = new Date().getFullYear();
    var attr =[];
    for(var i=now-10;i<=now;i++){
        attr.push(i);
    };
    return attr;
})();
let startY,startT,diff,points=[];

export default {
    props:{
        format:{
            type:String,
            default:'yyyy-mm-dd'
        },
        itemHeight:{//每一行的高度
            type:Number,
            default:34
        },
        itemNum:{//上下有多少个item
            type:Number,
            default: 1
        },
        start:{
            type:String,
            default:''
        },
        end:{
            type:String,
            default: ''
        },
        range:{//如果没有定义start跟end 的 year 日期范围默认当前年份的前后5年
            type:Number,
            default: 5
        }
    },
    data() {
        return {
            days:{
                year:[],
                month:"",
                day:""
            },
            currDate: '',
            isTouchable: 'ontouchstart' in window,
            tra_v:{//年月日的偏移量的值
                year:"",
                month:'',
                day:'',
            },scroll:{
                y_scroll_h:'',//年月日的可滚动距离
                m_scroll_h:'',
                d_scroll_h:'',
            }
        }
    },
    computed:{
        currDateObj(){
            return {
                year: this.currDate.getFullYear(),
                month: this.currDate.getMonth(),
                day: this.currDate.getDate(),
                text:this.currDate.getFullYear()+'-'+(this.currDate.getMonth()+1)+'-'+this.currDate.getDate(),
                tra_v:[this.tra_v.year,this.tra_v.month,this.tra_v.day]
            }
        },
        scroll_max(){return this.itemHeight * this.itemNum},
        indicator_ot(){return  this.itemHeight * this.itemNum}//中间选中指示器部分的offsetTop
        
    },
    updated(){
        var $yearList = this.$refs.yearList;
        var $monthList = this.$refs.monthList;
        var $dayList = this.$refs.dayList;
        
        this.scroll.y_scroll_h = -($yearList.children.length*this.itemHeight-this.scroll_max-this.itemHeight);
        this.scroll.m_scroll_h = -($monthList.children.length*this.itemHeight-this.scroll_max-this.itemHeight);
        this.scroll.d_scroll_h = -($dayList.children.length*this.itemHeight-this.scroll_max-this.itemHeight);

       
    },
    mounted(){
        this.currDate = this.parse(new Date());
        this.regEvent();
    },
    watch: {
        currDate() {
            this.getDate()
        }
    },
    methods: {
        getDate(){
            //获取日期数据列表；
            /* const time = {
                year: this.currDate.getFullYear(),
                month: this.currDate.getMonth(),
                day: this.currDate.getDate()
            };*/
            const time = this.currDateObj;
            var i = 0;
            //获取开始年份列表
            if(this.start!==""){
                let valueStart = this.getDayObj(this.start);
                
                if(valueStart.year<=time.year){
                    for(var s = valueStart.year;s<time.year;s++,i++){
                        this.days.year.push(s);
                    }
                }
            }else {
                for(var s = time.year-this.range;s<time.year;s++,i++){
                    this.days.year.push(s);
                }
            }
            //获取结束年份列表
            if(this.end!==""){
                let valueEnd = this.getDayObj(this.end);
                if(valueEnd.year>time.year){
                    for(var s = time.year;s<=valueEnd.year;s++){
                        this.days.year.push(s);
                    }
                }
            }else {
                for(var e = time.year+this.range,s = time.year;s<=e;s++){
                    this.days.year.push(s);
                }
            }

            this.days.month= 12;
            this.days.day = this.getDayCount(time.year,time.month);

            //初始化选中当前日期
            //var $indicator = this.$refs.indicator;
            var $yearList = this.$refs.yearList;
            var $monthList = this.$refs.monthList;
            var $dayList = this.$refs.dayList;
          
            var h = i*this.itemHeight;
            this.tra_v.year = this.indicator_ot-h;
            this.tra_v.month = this.indicator_ot - (10-time.month)*this.itemHeight;
            this.tra_v.day = this.indicator_ot - (time.day-1)*this.itemHeight;

            // $yearList.style.cssText = `-webkit-transform:translate3d(0,${this.tra_v.year}px,0);transform:translate3d(0,${this.tra_v.year}px,0)`;
            // $monthList.style.cssText = `-webkit-transform:translate3d(0,${this.tra_v.month}px,0);transform:translate3d(0,${this.tra_v.month}px,0)`;
            // $dayList.style.cssText = `-webkit-transform:translate3d(0,${this.tra_v.day}px,0);transform:translate3d(0,${this.tra_v.day}px,0)`;
            this.transform($yearList,this.tra_v.year);
            this.transform($monthList,this.tra_v.month);
            this.transform($dayList,this.tra_v.day);
            let selected = time.year+'-'+(time.month+1)+'-'+time.day;
            this.$emit('update-date',selected);
        },
        regEvent(){
            const $wrap = this.$refs.wrap;
            var childs = $wrap.querySelectorAll(".section");
            const _ = this.isTouchable
            const eventList = [
                { name: _ ? 'touchstart' : 'mousedown', handler: this.handleStart },
                { name: _ ? 'touchmove' : 'mousemove', handler: this.handleMove },
                { name: _ ? 'touchend' : 'mouseup', handler: this.handleEnd },
                { name: _ ? 'touchcancel' : 'mouseleave', handler: this.handleCancel }
            ]
            
            eventList.forEach((item,index)=>{
                $wrap.addEventListener(item.name,item.handler,false);
            })
            
        },
        handleStart(e){
            
             startY = this.getEvent(e).pageY;
             startT = new Date().getTime();
        },
        handleMove(e){
            let moveY = this.getEvent(e).pageY;
            let $dom = e.target.previousElementSibling;
            let moveT = new Date().getTime();
            let $this = this;
            diff = moveY - startY;
            let point = {Y:moveY,T:moveT}
            points.push(point);
            if(points.length>40){
                points.unshift();
            }
            setTimeout(function(){
                //$this.transition($dom,0);  
                $dom.style.transition=`all 0 ease`;
                              
                $this.translate($dom,diff);
            },0);
             e.preventDefault();
        },
        handleEnd(e){
            if(!startY) return;
            let $dom = e.target.previousElementSibling;
            let endY = this.getEvent(e).pageY;
            let endT = new Date().getTime();
            let diff = endY-startY;
    
            if(endT-startT>100){
                //大于100ms没有滑动
                this.stop($dom,endY-startY);
            }else {
                //计算最后100ms以内距离终点最近的一个起点
                const endP = points.length-1;
                let starP = endP;
                for(let i =endP;i>0&&startT-points[i].T<100;i++){
                    startP = i;
                }
                let s = points[endP].Y-points[startP].Y;
                let t = points[endP].T-points[startP].T;
                let v = s/t;
                diff =v*150+diff;
                this.stop($dom,diff);
            }
            
            
           // this.translate($dom,diff);
           
           startY=null;
        },
        handleCancel(){},
        translate($dom,diff){
            let new_t;
            switch($dom.getAttribute('data-ref')){
                case 'yearList':
                    new_t = this.tra_v.year+diff;
                    break;
                case 'monthList':
                    new_t = this.tra_v.month+diff;
                    break;
                case 'dayList':
                    new_t = this.tra_v.day+diff;
                    break;
            }
            this.transform($dom,new_t);
        },
        transition($dom,s){
            //move 的时候不需要动画
            //stop 的时候需要动画，看起来会流畅一点
            $dom.style.transition=`all ${s} ease`;
        },
        transform($dom,new_t){
            $dom.style.transform=`translate3d(0,${new_t}px,0)`;
        },
        getEvent(e){
            const _ = this.isTouchable
            if(_){
                return e.changedTouches[0];
            }else {
                e
            }
        },
        stop($dom,diff){
            let new_t;//new_translate
            switch($dom.getAttribute('data-ref')){
                case 'yearList':
                    new_t = this.tra_v.year+diff;
                    new_t = Math.round(new_t / this.itemHeight) * this.itemHeight;
                    if(new_t>this.scroll_max){
                        new_t=this.scroll_max
                    }else if(new_t<this.scroll.y_scroll_h){
                        new_t = this.scroll.y_scroll_h
                    }
                    this.tra_v.year=new_t;
                    break;
                case 'monthList':
                    new_t = this.tra_v.month+diff;
                    new_t = Math.round(new_t / this.itemHeight) * this.itemHeight;
                    if(new_t>this.scroll_max){
                        new_t=this.scroll_max
                    }else if(new_t<this.scroll.m_scroll_h){
                        new_t = this.scroll.m_scroll_h
                    }
                    this.tra_v.month=new_t;       
                    break;
                case 'dayList':
                    new_t = this.tra_v.day+diff;
                    new_t = Math.round(new_t / this.itemHeight) * this.itemHeight;
                    if(new_t>this.scroll_max){
                        new_t=this.scroll_max
                    }else if(new_t<this.scroll.d_scroll_h){
                        new_t = this.scroll.d_scroll_h
                    }
                    this.tra_v.day=new_t;
                    break;
            }
            //diff+=default_translate;
            this.transition($dom,'.2s');
            this.transform($dom,new_t);
            this.updateSelected($dom);
        },
        updateSelected($dom){
            let h =this.itemHeight;
            let scroll_m = this.scroll_max;
            let dateObj=[];
            let selected;
            var $yearList = this.$refs.yearList;
            var $monthList = this.$refs.monthList;
            var $dayList = this.$refs.dayList;

            this.currDateObj.tra_v.forEach((item)=>{
                if(item<0){
                    dateObj.push(this.itemNum+Math.round(-item/h)); 
                }else {
                    dateObj.push(this.itemNum-Math.round(item/h)); 
                }
               
            });
            
            let year = $yearList.children[dateObj[0]].getAttribute('data-val');
            let month = $monthList.children[dateObj[1]].getAttribute('data-val');

            let day = $dayList.children[dateObj[2]].getAttribute('data-val');
            if($dom.getAttribute('data-ref')=='yearList'||$dom.getAttribute('data-ref')=='monthList'){
                this.days.day = this.getDayCount(year,month-1);
                if(day>this.days.day){
                    day=this.days.day;
                }//防止日期大于当月的最大日期
                this.tra_v.day = this.indicator_ot - (day-1)*this.itemHeight;
                this.transform(this.$refs.dayList,this.tra_v.day);
            }
            selected = year+'-'+month+'-'+day;
            this.currDateObj.text=selected;
            this.currDateObj.year = year;
            this.currDateObj.month = month;
            this.currDateObj.day = day;

            this.$emit('update-date',selected);
            
        },
        parse(str) {
            let date
            if (str.length === 10 && (this.format === 'yyyy-mm-dd' || this.format === 'yyyy/mm/dd')) {
                date = new Date(str.substring(0, 4), str.substring(5, 7)-1 , str.substring(8, 10));
            } else {
                date = new Date(str)
            }
            return isNaN(date.getFullYear()) ? new Date() : date
        },
        getDayObj(str){
            let obj = {};
            let date = this.parse(str);
            obj.year= date.getFullYear();
            obj.month = date.getMonth();
            obj.day = date.getDate();
            return obj;
        },
        getDayCount(year, month) {
            const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            if (month === 1) {
                if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
                    return 29
                }
            }
            return dict[month]
        },

    }
}
</script>
