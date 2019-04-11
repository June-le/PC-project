var loopPackage = function () {
    var slideLoop = function (options) {
        var imgUl = options.obj.children(".imgUl");
        var cirUl = options.obj.children(".cirUl")||0;
        var right = options.obj.children(".right")||0;
        var left = options.obj.children(".left")||0;
        cirUl.children().eq(0).addClass("active")
        var autoPlay1,time=options.time||3000;
        imgUl.children().eq(0).clone(true).appendTo(imgUl);
        //用来做图片计数
        var n = 0;
        // totalImgNum计算图片总数量
        var totalImgNum = imgUl.children().size();
        // 获取每张图的宽度
        var imgWidth = imgUl.children().eq(0).width();        
        // 获取每张图的高度
        var imgHeight = imgUl.children().eq(0).height();
        function moveRight() {
            n++;
            if (n == totalImgNum) {
                n = 1;
                if(options.direction){
                    imgUl.css({ marginLeft: 0 });
                }else{
                    imgUl.css({ marginTop: 0 });
                }
            }
            changeCir(n == totalImgNum - 1 ? 0 : n);
            if(options.direction){
                imgUl.stop(true).animate({ marginLeft: -n * imgWidth });
            }else{
                imgUl.stop(true).animate({ marginTop: -n * imgHeight });
            }
        }
        function moveLeft(){
            n--;
            if (n == -1) {
                n = totalImgNum - 2;
                if(options.direction){
                    imgUl.css({ marginLeft: -(totalImgNum - 1) * imgWidth });
                }else{
                    imgUl.css({ marginTop: -(totalImgNum - 1) * imgHeight });
                }
            }
            cirUl&&changeCir(n == -1 ? (totalImgNum - 1) : n);
            if(options.direction){
                imgUl.stop(true).animate({ marginLeft: -n * imgWidth });
            }else{
                imgUl.stop(true).animate({ marginTop: -n * imgHeight });
            }
        }
        right&&right.stop(true,true).click(moveRight);
        left&&left.stop(true).click(moveLeft);
        function auto(){
            autoPlay1 = setInterval(moveRight, time)
        }
        function clearAuto(){
            clearInterval(autoPlay1);
        }
        options.auto && auto();
        imgUl.parent().hover(clearAuto,options.auto &&auto);
        // 索引点样式的改变
        function changeCir(x) {
            cirUl.children().eq(x).addClass("active").siblings().removeClass("active");
        }

        function clickCir(){
            n = $(this).index();
            changeCir(n);
            imgUl.stop(true).animate({ marginLeft: -n * imgWidth });
        }
        cirUl.children().click(clickCir);
    }

    // 渐隐渐现
    var fadeLoop = function (options) {
        var imgUl = options.obj.children(".imgUl");
        var cirUl = options.obj.children(".cirUl");
        var right = options.haveArrows?options.obj.children(".right"):0;
        var left = options.haveArrows?options.obj.children(".left"):0;
        imgUl.children().first().show();
        cirUl.children().first().addClass("active");
        var x = 0, autoPlay2,time=options.time||3000;
        function isloaded($el){
            if ($el.data("isloaded")){
                return true;
            }else {
                return false;
            }
        }
        function checkShow($cur){//检查元素是否在可视范围内
            if(isloaded($cur)){//判断是否已加载
                // console.log("已经加载过了")
                return;
            }else{
                // console.log("没有加载过")
                showImg($cur);
            }
        }
        function showImg($el){
            $el.attr('src', $el.attr('data-original'));
            $el.data('isloaded',true);
        }
        function moveRight() {
            x++;
            x=x > imgUl.children().length - 1?0:x;
            // console.log("将显示下一张图片");
            checkShow(options.obj.find("img").eq(x));
            fadeInOut(x);
        }
        function moveLeft(){
            x--;
            x=x<0?imgUl.children().length - 1:x;
            // console.log("将显示上一张图片");
            checkShow(options.obj.find("img").eq(x));
            fadeInOut(x);
        }
        right&&right.click(moveRight);
        left&&left.click(moveLeft);
        function auto(){
            autoPlay2 = setInterval(moveRight, time)
        }
        function clearAuto(){
            clearInterval(autoPlay2);
        }
        options.auto && auto();
        imgUl.parent().hover(clearAuto,options.auto &&auto);
        right&&right.hover(
            function () {
                right.addClass("active");
            },
            function(){
                right.removeClass("active");
            }
        )
        left&&left.hover(
            function () {
                left.addClass("active");
            },
            function(){
                left.removeClass("active");
            }
        )
        function clickCir(){
            x = $(this).index();
            fadeInOut(x);
        }
        if(options.cirEvent=="click"){
            cirUl.children().click(clickCir);
        }else{
            cirUl.children().hover(clickCir);
        }
        function fadeInOut(x) {
            imgUl.children().eq(x).stop(true, true).fadeIn(options.speed).siblings().fadeOut(options.speed);;
            cirUl.children().eq(x).addClass("active").siblings().removeClass("active")
        }
    }
    return {
        slideLoop: slideLoop,
        fadeLoop: fadeLoop
    }
}



