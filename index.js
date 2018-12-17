const os = require('os');
const fs=require('fs')
const util=require('util')
const path=require('path')
const crypto = require('crypto');

module.exports={
    logger(level='info',...argv){
        let l=new Set(['info','error'])
        if(l.has(level)){
            console.log(...argv)
        }else{
            console.log(level,...argv)
        }
    },
    /**
     * md5加密
     * @param {String} str  加密字符串
     * @param {String} charset 编码 默认：utf8
     * @return {String}
     */
    md5(str,charset='utf8'){
        return crypto.createHash('md5').update(str + '', charset).digest('hex');
    },
    /**
     * 路径存在
     * @param {String} filePath 路径地址
     * @return {Boolean}
     */
    isExist(filePath){
        try {
            return fs.existsSync(filePath);
        }catch(e){
            return false;
        }
    },
    /**
     * 是否文件
     * @param {String} filePath 文件路径
     * @return {Boolean}
     */
    isFile(filePath){
        if (!this.isExist(filePath)) return false;
        try {
            return fs.statSync(filePath).isFile();
        } catch (e) {
            return false;
        }
    },
    /**
     * 是否目录
     * @param {String} filePath 目录路径
     * @return {Boolean}
     */
    isDir(filePath){
        if (!this.isExist(filePath)) return false;
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (e) {
            return false;
        }
    },
    /**
     * 是否对象
     * @param {Mixed} obj 查询对象
     * @return {Boolean}
     */
    isObject(obj){
        return toString.call(obj) === '[object Object]';
    },
    /**
     * 遍历文件目录
     * @param {String} filePath 目录路径
     * @param {Boolean} isClutter file directory 混合返回 默认：true
     * @return [fileName,directoryName] isClutter==true
     * @return {fileName,file,dir} isClutter==false
     */
    async readdir(filePath, isClutter = true){
        try {
            let files=await util.promisify(fs.readdir)(filePath);
            if(isClutter)return files;
            let res={ filePath };
            files.forEach(file=>{
                let filename=path.join(filePath,file)
                if(this.isFile(filename)){
                    res.file?res.file.push(file):res.file=[file];
                }else{
                    res.dir?res.dir.push(file):res.dir=[file];
                }
            });
            
            return res;
        } catch (e) {
            return e;
        }
        
    },
    /**
     * readdir() 的同步方法
     */
    readdirSync(filePath, isClutter = true){
        try {
            let files = fs.readdirSync(filePath);
            if (isClutter) return files;
            let res = { filePath };
            files.forEach(file => {
                let filename = path.join(filePath, file)
                if (this.isFile(filename)) {
                    res.file ? res.file.push(file) : res.file = [file];
                } else {
                    res.dir ? res.dir.push(file) : res.dir = [file];
                }
            });

            return res;
        } catch (e) {
            return e;
        }
    },
    /**
     * 获取IP地址
     * @param {Number} type  4 || 6 || any (非4、6返回所有信息)
     * @param {Boolean} onlyIp 是否仅仅返回ip地址
     * @return string onlyIp==true
     * @return {mac,address,netmask,cidr}
     */
    ip(type=4,onlyIp=true){
        let networkInterfaces=os.networkInterfaces();
        let res={
            ip4:{
                mac:[],
                address:[],
                netmask:[],
                cidr:[],
            },
            ip6:{
                mac:[],
                address:[],
                netmask:[],
                cidr:[],
            },
        };
        Object.values(networkInterfaces).forEach(item=>{
            for(let v of item){
                if(v.family==='IPv4'){
                    res.ip4.mac.push(v.mac)
                    res.ip4.address.push(v.address)
                    res.ip4.netmask.push(v.netmask)
                    res.ip4.cidr.push(v.cidr)
                }else if(v.family==='IPv6'){
                    res.ip6.mac.push(v.mac)
                    res.ip6.address.push(v.address)
                    res.ip6.netmask.push(v.netmask)
                    res.ip6.cidr.push(v.cidr)
                }
            }
        })
        if(type==4){
            let rs=res.ip4;
            return onlyIp?rs.address[0]:rs;
        }else if(type==6){
            let rs=res.ip6;
            return onlyIp?rs.address[0]:rs;
        }
        res.hostname=os.hostname();
        return res;
    },
    /**
     * html代码编译
     * @param {String} str html片段 
     */
    escapeHtml(str){
        return (str + '').replace(/[<>'"]/g, a => {
            switch (a) {
                case '<':
                return '&lt;';
                case '>':
                return '&gt;';
                case '"':
                return '&quote;';
                case '\'':
                return '&#39;';
            }
        });
    },
    /**
     * 去除字符串首尾空格
     * @param {String} str  
     * @param {Boolean} clearEnter  是否去除回车换行 默认：true
     */
    trim(str,clearEnter=true) {
        if(typeof str!=='string'){
          return str;
        }
        let resultStr = str.replace(/(^\s*)|(\s*$)/g,""); //去掉空格
        if(clearEnter)resultStr = resultStr.replace(/(^[\r\n]*)|([\r\n]*$)/g,""); //去掉回车换行
        return resultStr;
    },
    /**
     * 前置补 '0' 操作
     * @param  {Number|String} num|string 数值
     * @param  {Number} length 总长度
     * @param  {String} char   补值
     * @return {String}        
     */
    prefixInteger(num, length,char='0') {
        return(Array(length).join(char)+num).slice(-length);
    },
    /**
     * 日期格式化 
     * @param  {Array|String} date  由date()函数获得的时间数组、时间、时间戳(int)
     * @param  {String} format    格式
     * @return {String}           
     */
    dateFormat(date,format='Y-m-d H:i:s'){
        let defaultVal=date;
        if(date===null||typeof date!=='object'){
            date=this.date(date);
        }
        let o={
            Y:0,
            y:0,
            m:11,
            d:2,
            H:3,
            h:3,
            i:4,
            s:5,
        };
        Object.keys(o).forEach(key=>{
            format=format.replace(key,date[o[key]]);
        });
        if(format.indexOf('NaN')===-1){
            return format;
        }
        return defaultVal;
    },
    /**
     * 由日期获取 获取时间戳
     * @param  {Number|String} val 默认为当前时间
     * @param  {Boolean} type 是否进行转化
     * @return {int}       
     */
    time(val=null,type=false){
        if(val===0)return 0;
        if(val===null){
            return Date.now();
        }
        if(typeof val === 'number'){
            return val;
        }else if(typeof val === 'string'){
            val=val+' ';
        }
        let date=new Date(val),time=date.getTime();
        return Number.isNaN(time)?0:time;
    },
    /**
     * 获取日期信息的数组
     * @param  {Number|String} val 默认为当前时间
     * @param  {mixed} isGetWeek 如果希望获取当前月一号的星期数可传 !true
     * @return {Array}     
     */
    date(val=null,isGetWeek=null){
        if(val===null){
            val=Date.now();
        }else if(typeof val === 'string'){ //这里指时间格式的字符串 例：2018-08-08
            val=val+' '; 
        }
        let date=new Date(val);
        // 防止多次递归调用
        if(isGetWeek){
            return date.getDay();
        }
        let dayNums=[31,28,31,30,31,30,31,31,30,31,30,31],
        dateArray=[
            date.getFullYear(),//0. 年份(4位)
            this.prefixInteger(date.getMonth(),2),//1. 月份(0~11)
            this.prefixInteger(date.getDate(),2),//2. 1~31
            this.prefixInteger(date.getHours(),2),//3. 小时(0~23)
            this.prefixInteger(date.getMinutes(),2),//4. 分钟(0-59)
            this.prefixInteger(date.getSeconds(),2),//5. 秒数(0-59)
            date.getMilliseconds(),//6. 毫秒数(0-999)
            date.getTime(),//7. 总毫秒(时间戳)
            date.getDay(),//8. 星期(0~6)
        ];
        //9. 是否闰年
        if(dateArray[0]%4===0&&dateArray[0]%100!==0||dateArray[0]%400===0){
            dateArray.push(true);
        }else{
            dateArray.push(false);
        }
        //10. 当月天数
        if(dateArray[9]&&parseInt(dateArray[1])===1){
            dateArray.push(29);
        }else{
            dateArray.push(dayNums[parseInt(dateArray[1])]);
        }

        //11. 月份（1~12）
        dateArray.push(this.prefixInteger(parseInt(dateArray[1])+1,2));
        if(isGetWeek===null){
            return dateArray;
        }

        //12. 当月一号 星期数（0~6）
        if(parseInt(dateArray[2])===1){
            dateArray.push(dateArray[8]);
        }else{
            let d=this.date(parseInt(dateArray[0])+'-'+(parseInt(dateArray[1])+1)+'-1',true);
            dateArray.push(d);
        }
                        
        return dateArray;
    },
    
    /**
     * https://github.com/koajs/compose/blob/master/index.js
     * @param {Array} middleware
     * @return {Function}
     */
    compose(middleware) {
        if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
        /**
         * @param {Object} context
         * @return {Promise}
         */
        return function (context, next) {
            // last called middleware #
            let index = -1
            return dispatch(0)
            function dispatch(i) {
                if (i <= index) return Promise.reject(new Error('next() called multiple times'))
                index = i
                let fn = middleware[i]
                if (i === middleware.length) fn = next
                if (!fn) return Promise.resolve()
                try {
                    let argv = [dispatch.bind(null, i + 1)];
                    if (context) argv.unshift(context);
                    return Promise.resolve(fn.apply(this, argv));
                } catch (err) {
                    return Promise.reject(err)
                }
            }
        }
    },
}
