# 基于vue2.0 的h5 时间滑动选择组件


## 组件属性说明

| Property      | Type          | Default  | Description |
| ------------- |:-------------:| -------:|------------:|
|itemHeight|Number|34|每一行的高度|
|itemNum|Number|1|显示器上下有多少个日期可见|
|start|String||开始时间限制，格式yyyy-MM-dd，目前只能限制到年|
|end|String||结束时间限制,格式yyyy-MM-dd，目前只能限制到年|
|range|Number|5|如果没有定义start跟end 的 year 日期范围默认当前年份的前后5年|


| Methods|Args|Required|Description|
| ------ |:--:|-------:|----------:|
|update-date|date|yes|回传选择的日期|

## 特点
1. 基于vue2.0开发，不支持1.0
2. 不依赖zepto库
