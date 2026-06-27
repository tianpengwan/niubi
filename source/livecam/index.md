---
title: 实时监控直播
date: 2026-06-27 12:00:00
comments: false
layout: page
---

<style>
#pwdbox{margin:80px auto;text-align:center;}
#videobox{display:none;text-align:center;margin-top:30px;}
input{padding:10px;width:220px;font-size:16px;}
button{padding:10px 25px;background:#007aff;color:#fff;border:none;border-radius:5px;cursor:pointer;}
</style>

<div id="pwdbox">
<h3>请输入访问密码</h3>
<input type="password" id="pwd" placeholder="输入访问密码">
<button onclick="checkPwd()">确认进入</button>
</div>

<div id="videobox">
<div id="player" style="width:100%;max-width:900px;margin:0 auto;"></div>
</div>

<!-- 引入HLS播放依赖 -->
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script>
// 配置
const trueLiveUrl = "http://8.141.112.15:8080/live/cam01/hls.m3u8";
const passWord = "tianpeng";

function checkPwd(){
    let inputPwd = document.getElementById("pwd").value;
    if(inputPwd === passWord){
        document.getElementById("pwdbox").style.display="none";
        document.getElementById("videobox").style.display="block";
        initPlayer();
    }else{
        alert("密码错误，请重新输入");
    }
}

function initPlayer(){
    if(Hls.isSupported()){
        var hls = new Hls();
        hls.loadSource(trueLiveUrl);
        hls.attachMedia(document.createElement('video'));
        var video = document.createElement('video');
        video.controls = true;
        video.style.width = "100%";
        video.style.borderRadius = "6px";
        document.getElementById("player").appendChild(video);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function(){video.play();});
    }else if (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')){
        var video = document.createElement('video');
        video.src = trueLiveUrl;
        video.controls = true;
        video.style.width = "100%";
        document.getElementById("player").appendChild(video);
        video.play();
    }
}
</script>
