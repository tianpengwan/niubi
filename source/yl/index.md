---
date: '2024-07-14T18:51:29.824805+08:00'		
title: 友链		
updated: '2024-07-14T18:51:33.351+08:00'		
comment: 'waline'		
banner_img: https://t.alcy.cc/pc/
---

🌵站点名称🌺：宇外御风的hexo博客
🌲站点简介🌸：分享免费有趣的知识
🌳站点地址🌼：https://20010501.xyz/
🌴站点图片🏵️：https://20010501.xyz/img/fluid.png/
🌿我的友链地址🌻：https://20010501.xyz/yll/

# 我可爱的友友们

<div id="qexo-friends"></div>
<link rel="stylesheet" href="https://unpkg.com/qexo-static@1.6.0/hexo/friends.css"/>

<script src="https://unpkg.com/qexo-static@1.6.0/hexo/friends.js"></script>
<script>loadQexoFriends("qexo-friends", "https://hexoadmin.20010501.xyz")</script>

# 来这里申请友链吧
<link rel="stylesheet" href="https://unpkg.com/apursuer-qexo-friend-links@1.0.2/apursuer-hexo-friend-links.css"/>

<article class="message is-info">
    <div class="message-header">
        申请友链
    </div>
    <div class="message-body">
        <div class="form-ask-friend">
            <div class="field">
                <label class="label">名称</label>
                <div class="control has-icons-left">
                    <input class="input" type="text" placeholder="您的站点名称" id="friend-name" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-signature"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <label class="label">链接</label>
                <div class="control has-icons-left">
                    <input class="input" type="url" placeholder="您网站主页的链接" id="friend-link" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-link"></i>
                    </span>
                </div>
                <p class="help">请确保该站点可访问！</p>
            </div>
            <div class="field">
                <label class="label">图标</label>
                <div class="control has-icons-left">
                    <input class="input" type="url" placeholder="您的网站图标（尽可能圆形）" id="friend-icon" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-image"></i>
                    </span>
                </div>
            </div>
<div class="field">
    <label class="label">描述</label>
    <div class="control has-icons-left">
        <input class="input" type="text" placeholder="请用一句话描述您的站点" id="friend-des" required>
        <span class="icon is-small is-left">
            <i class="fas fa-info"></i>
        </span>
    </div>
</div>
<div class="field">
    <div class="control">
        <label class="checkbox">
            <input type="checkbox" id="friend-check"/> 我不是提交无意义的信息。
        </label>
    </div>
</div>
<div class="field is-grouped">
    <div class="control">
        <button class="button is-info" type="submit" onclick="askFriend(event)">申请</button>
    </div>
</div>
</div>
</div>
</article>
<script src="https://recaptcha.net/recaptcha/api.js?render=tianpeng"></script>
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script>
function TestUrl(url) {
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (objExp.test(url) != true) {
        return false;
    }
    return true;
}
function askFriend(event) {
    let check = $("#friend-check").is(":checked");
    let name = $("#friend-name").val();
    let url = $("#friend-link").val();
    let image = $("#friend-icon").val();
    let des = $("#friend-des").val();
    if (!check) {
        alert("请勾选\"我不是提交无意义的信息\"");
        return;
    }
    if (!(name && url && image && des)) {
    alert("信息不完整！");
    return;
}
if (!(TestUrl(url))) {
    alert("URL格式错误！需要包含HTTP协议头！");
    return;
}
if (!(TestUrl(image))) {
    alert("图标URL格式错误！需要包含HTTP协议头！");
    return;
}
event.target.classList.add('is-loading');
grecaptcha.ready(function() {
    grecaptcha.execute('tianpeng', {action: 'submit'}).then(function(token) {
        $.ajax({
            type: 'get',
            cache: false,
            url: url,
            dataType: "jsonp",
            async: false,
            processData: false,
            complete: function (data) {
                if (data.status == 200) {
                    $.ajax({
                        type: 'POST',
                        dataType: "json",
                        data: {
                            "name": name,
                            "url": url,
                            "image": image,
                            "description": des,
                            "verify": token,
                        },
                        url: 'https://hexoadmin.20010501.xyz/pub/ask_friend/',
                        success: function (data) {
                            alert(data.msg);
                        }
                    });
                } else {
                    alert("无法访问该URL！");
                }
                event.target.classList.remove('is-loading');
            }
          });
        });
    });
}
</script>