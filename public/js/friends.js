函数 loadQexoFriends（id，url）{
    var uri = url + "/pub/friends/";
    var loadStyle = '<div class="qexo_loading"><div class="qexo_part"><div style="display: flex; justify-content: center"><div class="qexo_loader"><div class="qexo_inner one"></div><div class="qexo_inner two"></div><div class="qexo_inner three"></div></div></div></div><p style="text-align: center; display: block">✧٩(ˊωˋ*)و✧友友们快出来...</p></div>';
    document.getElementById(id).className = "qexo-friends";
    文档.getElementById（id）。innerHTML = 加载样式；
    变量 ajax;
    尝试 {
        // Firefox、Opera 8.0+、Safari
        ajax = 新的 XMLHttpRequest();
    } 捕获（e）{
        // 互联网浏览器
        尝试 {
            ajax = 新的ActiveXObject(“Msxml2.XMLHTTP”);
        } 捕获（e）{
            尝试 {
                ajax = 新的ActiveXObject(“Microsoft.XMLHTTP”);
            } 捕获（e）{
                alert("糟糕，你的浏览器无法上传文件！");
                返回 false；
            }
        }
    }
    ajax.open（“获取”，uri，true）；
    ajax.setRequestHeader（“内容类型”，“text/plain”）；
    ajax.onreadystatechange = 函数（）{
        如果 (ajax.readyState == 4) {
            如果 (ajax.status == 200) {
                var res = JSON.parse(ajax.response);
                如果 (res["status"]) {
                    var 朋友 = res["数据"];
                    document.getElementById(id).innerHTML = "";
                    对于（让 i = 0; i < friends.length; i++）{
                        document.getElementById(id).innerHTML += '<p><a target="_blank" href="' + friends[i]["url"] + '" title="' + friends[i]["name"] + '" class="qexo-friendurl"></p><div class="qexo-frienddiv"><div class="qexo-frienddivleft"><img class="qexo-myfriend" src="' + friends[i]["image"] + '"></div><div class="qexo-frienddivright"><span style="font-weight: bold;">' + friends[i]["name"] + '</span><br>' + friends[i]["description"] + '</div></div></a>';
                    }
                } 别的 {
                    console.log（res["data"]["msg"]）；
                }
            } 别的 {
                console.log("啊友友们肿么不见了(。•́︿•̀。)！");
            }
        }
    };
    ajax.发送（空）；
}
