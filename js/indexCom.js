$(function(){
    //头部服务hover显示
    $(".service").hover(
       function(){
           $(".service_hover").stop(true,true).slideDown('fast')
       },
       function(){
        $(".service_hover").stop(true,true).slideUp('fast')
       }
    )

    //头部搜索获取焦点显示
    $(".search_inp input").on("focus blur",function(e){
        if(e.type == 'focus'){
            $(".sea_history_hot").show()
        }else if(e.type == 'blur'){
            $(".sea_history_hot").hide()
        }
    })
})
