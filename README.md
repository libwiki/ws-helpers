# ws-helpers

## 安装

```
npm install --save ws-helpers
```

## 方法

```
/**
 * md5加密
 * @param {String} str  加密字符串
 * @param {String} charset 编码 默认：utf8
 * @return {String}
 */
md5(str,charset='utf8')
```

```
/**
 * 路径存在
 * @param {String} filePath 路径地址
 * @return {Boolean}
 */
isExist(filePath)
```

```
/**
 * 是否文件
 * @param {String} filePath 文件路径
 * @return {Boolean}
 */
isFile(filePath)
```

```
/**
 * 是否目录
 * @param {String} filePath 目录路径
 * @return {Boolean}
 */
isDir(filePath)
```

```
/**
 * 是否对象
 * @param {Mixed} obj 查询对象
 * @return {Boolean}
 */
isObject(obj)
```

```
/**
 * 遍历文件目录
 * @param {String} filePath 目录路径
 * @param {Boolean} isClutter file directory 混合返回 默认：true
 * @return [fileName,directoryName] isClutter==true
 * @return {fileName,file,dir} isClutter==false
 */
async readdir(filePath, isClutter = true)
```

```
/**
 * readdir() 的同步方法
 */
readdirSync(filePath, isClutter = true)
```

```
/**
 * 获取IP地址
 * @param {Number} type  4 || 6 || any (非4、6返回所有信息)
 * @param {Boolean} onlyIp 是否仅仅返回ip地址
 * @return string onlyIp==true
 * @return {mac,address,netmask,cidr}
 */
ip(type=4,onlyIp=true)
```

```
/**
 * html代码编译
 * @param {String} str html片段 
 */
escapeHtml(str)
```

```
/**
 * 去除字符串首尾空格
 * @param {String} str  
 * @param {Boolean} clearEnter  是否去除回车换行 默认：true
 */
trim(str,clearEnter=true)
```

```
/**
 * 前置补 '0' 操作
 * @param  {Number|String} num|string 数值
 * @param  {Number} length 总长度
 * @param  {String} char   补值
 * @return {String}        
 */
prefixInteger(num, length,char='0')
```

```
/**
 * 日期格式化 
 * @param  {Array|String} date  由date()函数获得的时间数组、时间、时间戳(int)
 * @param  {String} format    格式 默认：'Y-m-d H:i:s'
 * @return {String}           
 */
dateFormat(date,format='Y-m-d H:i:s')
```

```
/**
 * 由日期获取 获取时间戳
 * @param  {Number|String} val 默认为当前时间
 * @param  {Boolean} type 是否进行转化 默认：false
 * @return {int}       
 */
time(val=null,type=false)
```

```
/**
 * 获取日期信息的数组
 * @param  {Number|String} val 默认为当前时间
 * @param  {mixed} isGetWeek 如果希望获取当前月一号的星期数可传 !true
 * @return {Array}     
 */
date(val=null,isGetWeek=null)
```

```
/**
 * 来源：https://github.com/koajs/compose/blob/master/index.js
 * @param {Array} middleware
 * @return {Function}
 */
compose(middleware)
```

