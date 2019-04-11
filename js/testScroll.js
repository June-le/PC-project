// function scrolly() {
//     return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
// }

var page = 1;
var flag = true;

var tabrt = document.getElementsByClassName("tabrt")[0];
var ulobj = document.getElementsByClassName("ulboj")[0];
// console.log(ulobj);


            // window.onscroll = function () {
            //     if (tabrt.style.display == 'block') {
            //         var winh = window.innerHeight;
                    //获取窗口的高度
                    // console.log(winh);
                    // var tabrttop = tabrt.clientHeight + tabrt.offsetTop;
                    //可视距离 + 卷起的高度
                    //  获取文档底部到顶部的偏移量
                    // console.log(tabrttop);
                    // var scrolt = scrolly();
                    // console.log(tabrttop, scrolt, winh, tabrttop - scrolt - winh)
                    //获取滚动条的偏移量
                    // console.log(tabrt.style.display); 
                    // console.log(winh,scrolt,tabrttop);
                    // if (winh + scrolt >= tabrttop ) {
                        
                        // console.log(flag,'wf');
                        if (flag) {
                            flag = false;
                            console.log(flag);
                            //发起ajax请求
                            var xhr = new XMLHttpRequest();
                            xhr.open("get", "../api/dynamic.php?page=" + page, true);
                            xhr.send();
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4 && xhr.status == 200) {
                                    var data = JSON.parse(xhr.responseText);
                                    console.log('data',page);
                                    var htms = "";
                                    for (var i = 0; i < data.length; i++) {
                                        htms += "<li>";
                                        htms += "<a herf=\"#\" class='goods-img'>";
                                        htms += "<img src=images/dynamic-img/" + data[i].img + ">";
                                        htms += "</a>";
                                        htms += "<div class='goods-txt'>";
                                        htms += "<p>";
                                        htms += "<span class='txt-price'>￥";
                                        htms += "<em>" + data[i].money + "</em>";
                                        htms += "</span>";
                                        htms += "<span class='txt-count'>" + data[i].sales + "</span>";
                                        htms += "</p>";
                                        htms += "<a herf=\"#\" class='goods-name'>" + data[i].particulars + "</a>";
                                        htms += "<p>";
                                        htms += "<span class='tags'>" + data[i].market + "</span>";
                                        htms += "</p>";
                                        htms += "<div class='goods-yc'>";
                                        htms += "<a herf='#' class='yc-keep'>" + data[i].collect + "</a>";
                                        htms += "<a herf='#' class='yc-cart'>" + data[i].shoping + "</a>";
                                        htms += "</div>";
                                        htms += "</div>";
                                        htms += "</li>";
                                    }
                                    ulobj.innerHTML += htms;
                                    page++;
                                    // page = true;
                                    flag = true;
                                    // console.log(page, flag)

                                }
                            }
                        }
                    }
                }
            }