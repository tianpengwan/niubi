function qexo_friend_api(id, url, reCaptcha = '') {
    qexo_url = url;
    Qexo_reCaptcha_Key = reCaptcha
    var loadStyle = '<div class="qexo_loading"><div class="qexo_part"><div style="display: flex; justify-content: center"><div class="qexo_loader"><div class="qexo_inner one"></div><div class="qexo_inner two"></div><div class="qexo_inner three"></div></div></div></div><p style="text-align: center; display: block">友链申请加载中...</p></div>';
    document.getElementById(id).className = "friend-api";
    document.getElementById(id).innerHTML = loadStyle;
    
    // 修改为粉色透明风格
    document.getElementById(id).innerHTML = `
        <div class="friend-api-container" style="
            background: rgba(255, 240, 245, 0.85);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(255, 182, 193, 0.2);
            border: 1px solid rgba(255, 192, 203, 0.3);
        ">
            <center>
                <p style="
                    color: #d81b60;
                    margin-bottom: 20px;
                    font-weight: 500;
                ">请正确填写友链，然后点击申请等待核实，请先添加本站友链</p>
                
                <div class="friend-api" style="background: transparent;">
                    <style>
                        input.qexo-friend-input {
                            display: block;
                            width: 100%;
                            height: 42px;
                            padding: 0 12px;
                            font-size: 14px;
                            color: #d81b60;
                            background: rgba(255, 255, 255, 0.9);
                            border: 1px solid rgba(255, 182, 193, 0.5);
                            border-radius: 8px;
                            margin-bottom: 12px;
                            transition: all 0.3s ease;
                            outline: none;
                        }
                        
                        input.qexo-friend-input:focus {
                            border-color: #ff69b4;
                            box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.2);
                            background: rgba(255, 255, 255, 0.95);
                        }
                        
                        input.qexo-friend-input::placeholder {
                            color: rgba(216, 27, 96, 0.6);
                        }
                        
                        button.qexo-friend-button {
                            cursor: pointer;
                            width: 100%;
                            height: 44px;
                            padding: 0 20px;
                            font-size: 15px;
                            font-weight: 500;
                            color: white;
                            background: linear-gradient(135deg, #ff69b4, #ff1493);
                            border: none;
                            border-radius: 8px;
                            transition: all 0.3s ease;
                            margin-top: 5px;
                            box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
                        }
                        
                        button.qexo-friend-button:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 6px 16px rgba(255, 105, 180, 0.4);
                            background: linear-gradient(135deg, #ff1493, #ff69b4);
                        }
                        
                        button.qexo-friend-button:active {
                            transform: translateY(0);
                        }
                        
                        .friend-api-container p {
                            color: #d81b60;
                            font-size: 13px;
                            line-height: 1.5;
                        }
                    </style>
                    
                    <input type="text" id="qexo_friend_name" class="qexo-friend-input" placeholder="网站名">
                    <input type="text" id="qexo_friend_brief introduction" class="qexo-friend-input" placeholder="网站简介">
                    <input type="text" id="qexo_friend_website" class="qexo-friend-input" placeholder="网址">
                    <input type="text" id="qexo_friend_logo" class="qexo-friend-input" placeholder="头像地址">
                    <button type="button" class="qexo-friend-button" id="qexo-friend-btn" onclick="friend_api()">申请</button>
                    
                    <div style="
                        margin-top: 15px;
                        padding: 12px;
                        background: rgba(255, 240, 245, 0.6);
                        border-radius: 8px;
                        border-left: 4px solid #ff69b4;
                    ">
                        <p style="
                            margin: 0;
                            color: #d81b60;
                            font-size: 12px;
                            line-height: 1.4;
                        ">
                            温馨提示：<br>
                            1. 请确保已添加本站链接<br>
                            2. 填写真实有效的网址和头像<br>
                            3. 审核通过后将显示在友链页面
                        </p>
                    </div>
                </div>
            </center>
        </div>
        <br>
    `;
}

function friend_api() {
    document.getElementById('qexo-friend-btn').style.color = '#fff';
    document.getElementById('qexo-friend-btn').style.background = 'linear-gradient(135deg, #ffb6c1, #ff69b4)';
    document.getElementById('qexo-friend-btn').innerHTML = '提交中...';

    let ask = function (token = '') {
        var name = document.getElementById('qexo_friend_name').value;
        var introduction = document.getElementById('qexo_friend_brief introduction').value;
        var website = document.getElementById('qexo_friend_website').value;
        var logo = document.getElementById('qexo_friend_logo').value;
        var uri = qexo_url + '/pub/ask_friend/';
        
        if (!name || !website || !logo) {
            document.getElementById('qexo-friend-btn').style.background = 'linear-gradient(135deg, #ff6b6b, #ff4757)';
            document.getElementById('qexo-friend-btn').innerHTML = "请先填写内容";
            return 0;
        }
        
        if (!/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(website) || !/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(logo)) {
            document.getElementById('qexo-friend-btn').style.background = 'linear-gradient(135deg, #ff6b6b, #ff4757)';
            document.getElementById('qexo-friend-btn').innerHTML = "请填写正确的网址";
            return 0;
        }
        
        let body = {
            name: name, 
            url: website, 
            image: logo, 
            description: introduction
        }
        
        if (token) {
            body["verify"] = token;
        }
        
        data = ''
        for (i in body) {
            data += `&${i}=${encodeURIComponent(body[i])}`
        }
        data = data.slice(1)
        
        fetch(uri, {
            method: 'post', 
            body: data, 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (data) {
            if (data.ok) {
                data.json().then(function (res) {
                    if (res["status"]) {
                        document.getElementById('qexo-friend-btn').style.background = 'linear-gradient(135deg, #51cf66, #40c057)';
                        document.getElementById('qexo-friend-btn').innerHTML = '提交成功，等待博主确认！';
                    } else {
                        document.getElementById('qexo-friend-btn').style.background = 'linear-gradient(135deg, #ff6b6b, #ff4757)';
                        document.getElementById('qexo-friend-btn').innerHTML = "提交失败：" + res["msg"];
                    }
                });
            } else {
                document.getElementById('qexo-friend-btn').style.background = 'linear-gradient(135deg, #ff6b6b, #ff4757)';
                document.getElementById('qexo-friend-btn').innerHTML = "网络异常！";
            }
        }).catch(function(error) {
            document.getElementById('qexo-friend-btn').style.background = 'linear-gradient(135deg, #ff6b6b, #ff4757)';
            document.getElementById('qexo-friend-btn').innerHTML = "请求失败！";
        });
    }
    
    if (Qexo_reCaptcha_Key) {
        grecaptcha.ready(function () {
            grecaptcha.execute(reCaptcha, {action: 'submit'}).then(function (token) {
                ask(token)
            });
        });
    } else {
        ask()
    }
}