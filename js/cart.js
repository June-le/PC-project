// 点击每个checkbox时实现选中的状态

function cart() {
    // 点击全选时实现店铺和商品的全选功能
    $(".header-have").on('click', '.header-have-pro-all i', function () {
        $(this).toggleClass("i-active");

        // 调用点击函数
        var $allSelect = $(".header-have-allshop label i");
        checkboxClick($allSelect, $(this));
        Allprice();
    })
    //点击店铺,商品全选
    $(".header-have").on('click', '.header-have-c-title i', function () {
        // console.log(333)
        $(this).toggleClass("i-active");

        // 调用点击函数
        var $shopSelect = $(this).parents(".header-have-content").siblings().find("i");
        console.log($(this).get)
        checkboxClick($shopSelect, $(this));

        //计数，当count等于被勾选店铺的长度时，实现全选
        //遍历每个店铺
        var $singleShop = $(".header-have-c-title i");
        var $shopEle = $(".header-have-pro-all i");
        counting($singleShop, $shopEle);
        Allprice();
    })

    //提取代码 
        //点击复选框添加类名的函数
        function checkboxClick(obj, ele) {
            if (ele.hasClass("i-active")) {
                obj.addClass("i-active");
            } else {
                obj.removeClass("i-active");
                
            }
        }
 

    //单选产品，实现店铺选中和全选；
    $(".header-have").on('click', '.have-a-cart i', function () {
        $(this).toggleClass("i-active");
       // 遍历每个店铺的单个商品
       var $singleGoods = $(this).parents(".header-have-item").find(".have-c-shop-list i");
       var $singleEle = $(this).parents(".header-have-item").find(".header-have-content i");
       counting($singleGoods, $singleEle);

       //遍历每个店铺
       var $singleShop = $(".header-have-c-title i");
       var $shopEle = $(".header-have-pro-all i");
       counting($singleShop, $shopEle);
       Allprice();
   })


    //提取代码
        //计数的函数
        function counting(obj, ele) {
            var count = 0;
            obj.each(function () {
                if ($(this).hasClass("i-active")) {
                    count++
                }
            })
            if (count == obj.length) {
                ele.addClass("i-active");
            } else {
                ele.removeClass("i-active");
            }
        }

    // 计算每个商品的小计
    function subTotal() {
        $(".have-c-shop-list").each(function () {
            //获取每个商品的单价
            var singlePrice = parseFloat($(this).find(".danjia").html());
            // singlePrice = toString(singlePrice)
            
            // singlePrice=singlePrice.replace(/\,/g,"");
            // console.log( singlePrice)
            //获取每个商品的数量
            var goodsNum = parseInt($(this).find(".pro-number").val());
            //获取每个商品的小计
            var sub = (singlePrice * goodsNum);
            $(this).find(".xiaoji").html(sub);
        })
    }
    subTotal()

    // 每个商品数量增减时
    $(".header-have").on("click", ".add", function () {
        var goodsNum = $(this).prev().val();
        goodsNum++;
        $(this).prev().val(goodsNum);
        subTotal();
        Allprice();
        totalNumber();
        // 发起ajax请求
        var $goodsNum = $(this).prev().val();
        var $goodsID = $(this).prev().data("goodsid")
        $.ajax({
            type: "post",
            url: "../api/cartAdd.php",
            data: {
                goodsNum: $goodsNum,
                goodsID: $goodsID
            },
            success: function () {
                // 请求成功后计算小计，总价钱，总数量和选中的数量
                subTotal();
                Allprice();
                totalNumber();
            }
        })
    })
    $(".header-have").on("click", ".reduce", function () {
        var goodsNum = $(this).next().val();
        goodsNum--;
        if (goodsNum == 0) {
            goodsNum = 1
        }
        $(this).next().val(goodsNum);
        subTotal();
        Allprice();
        totalNumber();
        // 发起ajax请求
        var $goodsNum = $(this).next().val();
        var $goodsID = $(this).next().data("goodsid")
        $.ajax({
            type: "post",
            url: "../api/cartAdd.php",
            data: {
                goodsNum: $goodsNum,
                goodsID: $goodsID
            },
            success: function () {
                // 请求成功后计算小计，总价钱，总数量和选中的数量
                subTotal();
                Allprice();
                totalNumber();
            }
        })
    })
    //计算总价钱和选中的数量
    function Allprice() {
        var totalPrice = 0;
        var selectNum = 0
        $(".have-a-cart  .i-active").each(function () {
            // 获取选中的小计,计算总价钱
            var subPrice = $(this).parents(".have-c-shop-list").find(".xiaoji").html()
            var priceNum = parseFloat(subPrice);
            totalPrice += priceNum;
            totalPrice.toFixed(2);

            //计算选中的数量
            var currentNum = $(this).parents(".have-c-shop-list").find(".pro-number").val();
            var goodsNum = parseInt(currentNum);
            selectNum += goodsNum;
        })
        $("#totalNum").html(totalPrice);
        $("#totalPrice").html(totalPrice);
        $(".header-have-pro-ok span").html(selectNum);
    }
    Allprice()

    // 计算商品的总数量
    function totalNumber() {
        var totalNum = 0;
        $(".pro-number").each(function () {
            var singleGoodsNum = $(this).val();
            var toNum = parseInt(singleGoodsNum)
            totalNum += toNum;
        })
        $(" .wrap_right_others strong").html(totalNum);
    }
    totalNumber()



     //删除指定的商品
     $(".header-have").on("click",".caozuo a",function () {
        var $cartMainLength = $(this).parents(".header-have").children(".header-have-item").length;
        var $goodsListLength = $(this).parents(".header-have-item").children(".have-c-shop-list").length
        if ( $cartMainLength== 1 &&$goodsListLength == 1) {
            $(this).parents(".header-have").remove();
            $(".header_shop").show();
        }
        if ($goodsListLength == 1) {
            $(this).parents(".header-have-item").remove();
        }
        $(this).parents(".have-c-shop-list").remove();
        Allprice();
        totalNumber();
        // 获取点击删除商品的id
        var $delData=$(this).data("goodsid");
        // 点击删除键的时候发起ajax请求删除后台数据
        $.ajax({
            type:"post",
            url:"../api/cartDel.php",
            data:"delData="+$delData,
            success:function(){
                // 请求成功后计算总价钱，总数量和选中的数量
                Allprice();
                totalNumber();
            }
        })
    })
    //删除选中的商品
    $(".header-have").on("click",".header-have-p-all",function () { 
        var delSelectGoods=[];
        $(".have-a-cart .i-active").each(function () {
            var $dSelectGoodsId=$(this).parents(".have-c-shop-list").find(".caozuo a").data("goodsid");
            // 把勾选商品的id放入数组内
            delSelectGoods.push($dSelectGoodsId);
            if ($(this).parents(".header-have-item").children(".have-c-shop-list").length == 1) {
                $(this).parents(".header-have-item").remove();
            }
            $(this).parents(".have-c-shop-list").remove();
        })
        if($(this).parents(".header-have").children(".header-have-item").length==0){
            $(this).parents(".header-have").remove();
            $(".header_shop").show();

        }
        Allprice();
        totalNumber();
        // 发起ajax请求，把delSelectGoods数组传到后端遍历
        $.ajax({
            type:"post",
            url:"../api/cartDel.php",
            data:{
                selectId:delSelectGoods
            },
            success:function(){
                // 请求成功后计算总价钱，总数量和选中的数量
                Allprice();
                totalNumber();
            }
        })
    })
        // }
// cartCalculate();




function cartAjaxRequest(){
   

    // 加载购物车的时候请求后台购物车的数据
    $.ajax({
        type:"post",
        url:"../api/cart.php",
        dataType:"json",
        success:function(data){
            $("body,html").show();
            console.log(data)
            if(data.success){
                $(".header-have").addClass("cart-active")
                var shopArr=[];
                $.each(data.list,function(index,val){
                    if(shopArr.indexOf(val.dianpu)==-1){
                        shopArr.push(val.dianpu)
                    }
                })
                $.each(shopArr,function(a,b){
                    // console.log(a,b)
                    $cartShopNode = $('<div class="header-have-item header-have-item'+a+'"><div class="header-have-content"><ul><li class="header-have-c-title"><label><inputtype="checkbox"class="have-c-shop"><i></i></label><span>'+b+'</span></li></div></div>');
                    $(".aa").append($cartShopNode);
                    $.each(data.list,function(index,val){
                        // console.log(index,val)
                        if(val.dianpu == b){
                            // console.log(111)
                            $cartGoodsNode = $(`<div class="have-c-shop-list">
                            <div class="have-a-shop-list-float have-a-cart">
                                <label>
                                    <input type="checkbox" class="danxuan">
                                    <i></i>
                                </label>
                            </div>
                            <img src="`+val.img+`" alt="" class="have-a-shop-list-float">
                            <p class="have-a-shop-list-float wenzi">`+val.name+`</p>
                            <p class="have-a-shop-list-float have-a-shop-color-size">钢 黄金 白色 不锈钢</p>
                            <p class="have-a-shop-list-float" style="margin-left:90px;">￥<span class="danjia">`+val.price+`</span></p>
                            <div id="num" class="have-a-shop-list-float">
                                <button class="reduce">-</button>
                                <input type="text" class="pro-number" value='`+val.num+`'data-goodsid="`+val.Id+`">

                                <button class="add">+</button>
                            </div>
                            <p class="have-a-shop-list-float">￥ <span class="xiaoji">`+val.price+`</span> </p>
                            <div class="caozuo have-a-shop-list-float">
                                <a href="javascript:void(0);" data-goodsid="`+val.Id+`">删除</a>
                                <br>
                                <span class="focu">移入收藏</span>
                            </div>
                        </div>`)
                        // console.log($cartGoodsNode)
                        $(".header-have-item"+a).append($cartGoodsNode)
                        return;
                        }
                    })
                })
            }else{
                $(".header_shop").addClass("cart-active")
            }

            //数据请求过来后  计算商品的总数量h和小计
            totalNumber();
            subTotal();
        }
    })
}
cartAjaxRequest();
}
cart()
if(getCookie("user")){
    $(".header_top .wrap_right .wrap_right_login a").eq(0).html("欢迎"+getCookie("user")+"<a class='del cook'>退出</a>");
}else{
    $(".header_top .wrap_right .wrap_right_login a").eq(0).html("<a href='Login.html'>请登录</a>");
}
// getCookie("user")&&$(".header_top .wrap_right .wrap_right_login a").eq(0).html("欢迎"+getCookie("user")+"<a class='del cook'>退出</a>");
$(".header_top .wrap_right .wrap_right_login").on("click",".del",function(){
    $(this).parent().html("<a href='Login.html'>请登录</a>");
    delCookie("user");
})