//搜索框接口
        
function peri(data) {
    $(".suggest_word").html("")
    var html = '';
    // console.log(data.data[0].keywords)
    if (data.data.length) {
       $(".suggest_word").removeClass("h");
       $(".sea_history_hot").addClass("h")
        for (var i=0; i<data.data.length; i++) {
            html += '<a target="_blank" href="#" class="pi"><span class="pi_text">'+ data.data[i].keywords +'</span><i class="icon-a-autofill"></i></a>';
        }
        $(".suggest_word").append( html) 
    } else {
        $(".suggest_word").addClass("h");
       $(".sea_history_hot").removeClass("h")
    }
} 
$(".search_inp input").keyup(function(){
    if($(this).val() != '') {
        var oScript = document.createElement('script');
        oScript.src = 'http://www.xbiao.com/search/suggestion/?wd='+this.value+'&callback=peri';
        document.body.append(oScript);
    }else {
        $(".suggest_word").addClass("h");
       $(".sea_history_hot").removeClass("h")
    }
})