/**
 * 基于jQ的轮播图
 * 传入的参数对象如：
 * {
 *
 * }
 */
(function (w,factory) {

    factory(w);

})(window,function (w) {"use strict";

    function SlideShow(config) {
        this.width=300;
        this.height=200;
        this.slideTime=1000;
        this.changeTime=1000;
        this.auto=true;
        this.id=null;
        this.box=null;
        this.ul=null;
        this.lis=null;
        this.imgs=null;
        this.bar=null;
        this.barl=null;
        this.barr=null;
        this.showBox=null;
        this.showA=null;
        if (config.id) {
            this.init(config);
        }
    }

 /*   var this.box=null,ul=null,lis=null,
        imgs=null,
        bar,
        barl,
        barr,
        showthis.box,
        showA;*/


    SlideShow.prototype={
        constructor:SlideShow,
        init:function (e) {
            this.initElements(e);
            this.initStyle();
            this.initEvent();
            this.barrMouseenter();
            this.barlMouseenter();
            this.barMouseleave();
            if (this.auto) {
                this.autoPlay();
            }
        },
        initElements:function (c) {
            for (const n in c) {
                if(n==="auto" && c["auto"]!==undefined){
                    this.auto=c[n];
                }else if (c[n]) {
                    this[n]=c[n];
                }
            }
            this.box=$("#"+c.id);
            if (this.box.length !== 1) {
                console.log("slideShow没有获取到元素：id:" + c.id);
            }

            /*if (this.box.length !== 1) {
                throw "slideShow没有获取到元素id:"+c.id;
            }
            try {
                if (this.box.length !== 1) {
                    throw "slideShow没有获取到元素id:"+c.id;
                }
            }catch (e) {
                console.log('slideShow没有获取到元素id:'+c.id);
            }*/
            this.ul=$("#"+c.id+">ul");
            //为实现无缝滚动，把第一张和最后一张分别复制一份，放到最后和最前
            var firstLi=$("#"+c.id+">ul li:first-child");
            var lastLi=$("#"+c.id+">ul li:last-child");
            this.ul.prepend(firstLi.clone());
            this.ul.append(lastLi.clone());
            this.lis=this.ul.children();
            this.imgs=$("#"+c.id+">ul img");
            //创建左右切换按钮
            var bar1=$("<a class=\"bar bar-l\" href=\"javascript:\">&lt;</a>");
            var bar2=$("<a class=\"bar bar-r\" href=\"javascript:\">&gt;</a>");
            this.box.append(bar1);
            this.box.append(bar2);
            this.bar=$("#"+c.id+">a");
            this.barl=$("#"+c.id+" .bar-l");
            this.barr=$("#"+c.id+" .bar-r");
            //创建指示器
            var showTemp=$("<div class='show-li'></div>");
            for (let i = 0; i < this.imgs.length - 2; i++) {
                const l = $("<a href=\"javascript:\" class='show-a'></a>");
                showTemp.append(i===0?l:l.clone(true));
            }
            this.box.append(showTemp);
            this.showBox=showTemp;
            this.showA=$("#"+c.id+" .show-a");
        },
        initStyle:function () {
            $("li, img, ul").css({
                listStyle: "none",
                margin:"0",
                padding:"0"
            });
            $("a").css({
                textDecoration: "none"
            });
            this.box.css({
                position:"relative",
                overflow:"hidden",
                width:this.width+"px",
                height:this.height+"px"
            });
            this.ul.css({
                width:this.lis.length*100+"%",
                height:"100%"
            });
            this.lis.css({
                float:"left",
                width:this.width+"px",
                height:"100%"
            });
            this.lis.children().css({
                display:"block",
                width:"100%",
                height:"100%"
            });
            this.imgs.css({
                width:"100%",
                height:"100%"
            });
            this.bar.css({
                width: "30px",
                height: "50px",
                backgroundColor: "rgba(66,66,66,0.5)",
                transform: "translateY(-50%)",
                font: '700 20px/50px "simsun"',
                textAlign: "center",
                color: "rgba(255,255,255,0.8)",
                position: "absolute",
                zIndex:"1"
            });
            this.barl.css({
                borderRadius: "0 10px 10px 0",
                left:"0",
                top:this.height/2+"px"
            });
            this.barr.css({
                borderRadius: "10px 0 0 10px",
                right:"0",
                top:this.height/2+"px"
            });
            this.showBox.css({
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "30px",
                borderRadius: "5px 5px 5px 5px",
                backgroundColor: "rgba(255,255,255,0.3)"
            });
            this.showA.css({
                float: "left",
                width: "10px",
                height: "10px",
                margin: "2px 4px",
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: "50%",
                fontSize: "0"
            });
        },
        initEvent:function () {

        },
        change:function () {

        },
        autoPlay:function () {

        },
        // barHoverColor:function () {
        //     this.css({
        //         backgroundColor: "rgba(66,66,66,0.8)"
        //     });
        // },
        // barMouseenter:function () {
        //     var that=this;
        //     this.bar.mouseenter(function () {
        //         // that.barHoverColor();
        //         that.barHoverColor.call(this);
        //     })
        // },
        barlMouseenter:function(){
            var that=this;
            this.barl.mouseenter(function () {
                that.barl.css({
                    backgroundColor: "rgba(66,66,66,0.8)"
                });
            })
        },
        barrMouseenter:function(){
            var that=this;
            this.barr.mouseenter(function () {
                that.barr.css({
                    backgroundColor: "rgba(66,66,66,0.8)"
                });
            })
        },
        barMouseleave:function(){
            var that=this;
            this.bar.mouseleave(function () {
                that.bar.css({
                    backgroundColor: "rgba(66,66,66,0.5)"
                });
            })
        },
        barClick:function () {

        }

    };

    function animate(ele,target) {
        clearInterval(ele.timer);
        ele.timer=setInterval(function () {
            var val=target-ele.offsetLeft || 0;
            var speed=target>ele.offsetLeft? Math.abs(val)/10:-Math.abs(val)/10;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            ele.style.left=ele.offsetLeft+speed+"px";
            if (Math.abs(val)<=Math.abs(speed)){
                ele.style.left=target+"px";
                clearInterval(ele.timer);
            }
        },10);
    }

    w.SlideShow=SlideShow;

});