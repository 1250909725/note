var myTool={
    getEle:{
        //js获取元素
        id:function (id) {
            return document.getElementById(id);
        },tag:function (tag) {
            return document.getElementsByTagName(tag);
        },className:function (cls) {
            return document.getElementsByClassName(cls);
        }
    },

    js_ajax:function (option) {//js原生的ajax
        var ajax = new XMLHttpRequest();
        if (option.method=='get') {
            if(option.data) {//如果data有值
                option.url+='?';
                option.url+=option.data;
            }
            ajax.open(option.method,option.url);
            ajax.send();
        } else if (option.method=='post') {
            ajax.open(option.method,option.url);
            ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            if(option.data) {//如果data有值
                ajax.send(option.data);
            }else{
                ajax.send();
            }
        }else{
            alert("ajax请求出错");
        }
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                option.success(ajax.responseText);
            }
        }
    },

    //瀑布流布局
    waterfall:function () {

    },

    //传入要动画的元素和目标x位置 需要元素绝对定位
    animate:function (ele,target) {
        clearInterval(ele.timer);
        ele.timer=setInterval(function () {
            var val=target-ele.offsetLeft || 0;
            var speed=target>ele.offsetLeft? Math.abs(val)/10:-Math.abs(val)/10;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            // console.log(speed);
            ele.style.left=ele.offsetLeft+speed+"px";
            if (Math.abs(val)<=Math.abs(speed)){
                ele.style.left=target+"px";
                clearInterval(ele.timer);
            }
        },10);
    },

    //创建一个继承自obj的对象
    createObj:function (obj) {
        if(Object.create){
            return Object.create(obj);
        }else{
            function F() {

            }
            F.prototype=obj;
            return new F();
        }
    },

    createCache:function () {//闭包实现的缓存
       /* var cache={};                    //普通版
        var index=[];  //限定缓存的大小（数量）
        return function (key, value) {
            if (value!==undefined){
                cache[key]=value;
                index.push(key);
                if (index.length>=50){
                    delete cache[index.shift()];
                }
                return cache[key];
            }else {
                return cache[key];
            }
        };*/
       //高级版(模仿jq)···································
        var keys=[];
        function cache(key, value) {
            if (keys.push(key+" ")>50){//加一个" "防止key对函数的内置成员产生覆盖
                delete cache[keys.shift()];
            }
            return (cache[key+" "]=value);//把这个属性加给cache函数（对象）并返回这个属性值
        }
        return cache;//取值的时候直接访问函数的属性，注意在属性名字后面加上一个" "
    },

    //兼容的事件绑定
    createEventRegister:function () {
        if(window.addEventListener){
            return function (target,type,handler) {
                target.addEventListener(type,handler);
            }
        }else if(window.attachEvent){//这种方法注册的事件中的this指向window且没有事件对象参数，其他两种指向事件源
            return function (target,type,handler) {
                target.attachEvent("on"+type,function () {
                    handler.call(target,window.event);//所以这里进行修改this的指向,并传入事件对象
                });
            }
        }else{
            return function (target,type,handler) {
                target["on"+type]=handler;
            }
        }
    }



};

(function (w) {
    function SlideShow(config) {
        console.log(config);
    }

    SlideShow.prototype={
        constructor:SlideShow,

    };

    w.SlideShow=SlideShow;
})();