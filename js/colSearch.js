var suggestList = document.querySelector(".searchList");
function sugList(a) {
    suggestList.style.display = "block";
    suggestList.innerHTML = "";
    if (a.data.length != 0) {
        for (var i = 0; i < a.data.length; i++) {
            var aLists = document.createElement("li");
            aLists.innerHTML = a.data[i].keywords;
            suggestList.appendChild(aLists);
        }
        console.log(a);
    }
}
var n = -1;
document.onkeydown = function (e) {
    var sugListsA = document.querySelectorAll(".searchList li");
    var e = e || event;
    if (e.keyCode == 40) {
        n++;
        n = n >= sugListsA.length ? 0 : n;
        for (var i = 0; i < sugListsA.length; i++) {
            sugListsA[i].style.backgroundColor = "rgb(29, 32, 43)";
        }
        sugListsA[n].style.backgroundColor = "#aa9b68";
        inputText.value = sugListsA[n].innerHTML;
    }
    if (e.keyCode == 38) {
        n--;
        n = n < 0 ? sugListsA.length - 1 : n;
        for (var i = 0; i < sugListsA.length; i++) {
            sugListsA[i].style.backgroundColor = "rgb(29, 32, 43)";
        }
        sugListsA[n].style.backgroundColor = "#aa9b68";
        inputText.value = sugListsA[n].innerHTML;
    }

}

var inputText = document.querySelector(".srh_ipt_new");
var suggest = document.querySelector(".searchList");
var txtSpan = document.querySelector(".srh_ipt_txt");
inputText.onkeyup = function (e) {
    if (e.keyCode == 13) {
        suggest.style.display = "none";
        n = -1;
    } else {
        txtSpan.style.display = "none";
        var e = e || event;
        if (e.keyCode != 40 && e.keyCode != 38) {
            var oldScript = $("script[src^='https://sug.so.360.cn']").get(0);
            oldScript && document.body.removeChild(oldScript);
            var script = document.createElement("script");
            script.src = "http://www.xbiao.com/search/suggestion/?wd=" + inputText.value + "&callback=sugList";
            document.body.appendChild(script);
        }
    }
}
document.body.onclick = function () {
    suggestList.style.display = "none";
}
// 鼠标点击事件
suggestList.onclick = function (e) {
    var e=e||window.event;
    var target=e.target||e.srcElement;
    e.stopPropagation();
    if (target.nodeName === "LI") {
        console.log("aaaaaaa");
        inputText.value = target.innerHTML;
    }
}
