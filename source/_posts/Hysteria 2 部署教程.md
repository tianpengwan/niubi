---
abbrlink: Hysteria 2 部署教程
categories:
- - 技术教程
date: '2026-10-28T21:16:28.275118+08:00'
tags:
- Moonlight
- sing-box
- Sunshine
title: Hysteria 2 完整部署教程：Windows 11 + 安卓 sing-box + Moonlight / Sunshine
updated: '2026-10-28T21:16:31.175+08:00'
---
# Hysteria 2 完整部署教程：Windows 11 + 安卓 sing-box + Moonlight / Sunshine

> 场景：Windows 11 家用电脑运行 Sunshine 和 Hysteria 2 服务端；安卓手机运行 sing-box 的 VPN/TUN 模式，再通过 Moonlight 串流。家宽没有公网 IPv4，但具有可入站访问的公网 IPv6。
> 已验证的 Hysteria 版本：**v2.13.0（Windows amd64-avx）**。不同软件版本的界面可能略有不同。

## 一、最终网络结构

```text
安卓手机
  ├─ sing-box for Android（VPN/TUN）
  └─ Moonlight：连接 192.168.2.23
          │
          │ Hysteria 2 / QUIC / UDP 443
          ▼
speedtest.20010501.xyz（AAAA → 家里电脑公网 IPv6）
          │
          ▼
Windows 11
  ├─ D:\hysteria\hysteria.exe（Hysteria 2 服务端）
  └─ Sunshine（局域网 IPv4：192.168.2.23）
```

**要点：** Hysteria 2 是基于 QUIC 的代理，不是会自动分配 `10.8.0.1` 的 OpenVPN。这里借助安卓 sing-box 的 TUN 模式，将 Moonlight 的 TCP/UDP 流量交给 Hysteria 2 转发；Moonlight 填写的是 **Windows 局域网 IPv4**，不是原先的 OpenVPN 地址。

## 二、准备条件


| 项目                   | 本文使用的值                                |
| ---------------------- | ------------------------------------------- |
| 服务端操作系统         | Windows 11                                  |
| Hysteria 2 程序目录    | `D:\hysteria`                               |
| 可执行文件             | `D:\hysteria\hysteria.exe`                  |
| 服务端配置             | `D:\hysteria\config.yaml`                   |
| 安卓配置               | `D:\hysteria\android-singbox.json`          |
| 域名                   | `speedtest.20010501.xyz`                    |
| 公网连接               | IPv6，UDP 443                               |
| TLS 证书               | Hysteria 内置 ACME，HTTP-01 验证使用 TCP 80 |
| Sunshine 所在电脑 IPv4 | `192.168.2.23`（示例为本次实际使用值）      |

你需要有：

- 一个正确指向 Windows 当前公网 IPv6 的 **AAAA** DNS 记录；如果通过 Cloudflare 管理解析，应设为 **仅 DNS（灰云）**，不能用普通网页代理代替 Hysteria 的 UDP 服务。
- Windows 和路由器的 IPv6 防火墙允许 **UDP 443 入站**；首次申请和以后续期 ACME HTTP-01 证书时，还需要 **TCP 80 入站**。
- 安卓网络具备通往该 IPv6 地址的能力。仅有 IPv4 且没有 IPv6 转换路径的网络无法直接连接这个 IPv6-only 服务端。
- Windows 上已正常运行 Sunshine；安卓已安装 Moonlight。

> **安全提醒：** 只开放 Hysteria 所需端口，不需要把 Sunshine 端口直接暴露到公网。后文生成的客户端 JSON 含有连接密码，不能公开分享。

## 三、下载并验证 Hysteria 2

官方来源：

- [Hysteria 2 安装文档](https://v2.hysteria.network/zh/docs/getting-started/Installation/)
- [GitHub Releases](https://github.com/apernet/hysteria/releases)

Windows 64 位可选：

- `hysteria-windows-amd64.exe`：普通 x64 版本；
- `hysteria-windows-amd64-avx.exe`：需要 CPU 支持 AVX。本次实际使用这一版。

Hysteria 是命令行程序，**双击没有安装界面是正常的**。

创建文件夹，并把下载的 EXE 放入其中：

```powershell
New-Item -ItemType Directory -Path 'D:\hysteria' -Force | Out-Null
```

如果下载到 `下载` 文件夹，可执行（文件名为 AVX 版时）：

```powershell
Move-Item "$env:USERPROFILE\Downloads\hysteria-windows-amd64-avx.exe" 'D:\hysteria\hysteria.exe'
```

如果已经在 `D:\hysteria` 里，则直接重命名：

```powershell
cd D:\hysteria
Rename-Item '.\hysteria-windows-amd64-avx.exe' 'hysteria.exe'
```

验证：

```powershell
cd D:\hysteria
.\hysteria.exe version
```

本次部署中显示了 `Version: v2.13.0`、`Platform: windows`、`Architecture: amd64-avx`，证明程序正常，不需要安装向导。

## 四、配置公网 IPv6 域名

在域名 DNS 管理后台添加：


| 类型 | 主机记录    | 记录值                      |
| ---- | ----------- | --------------------------- |
| AAAA | `speedtest` | Windows 电脑当前的公网 IPv6 |

例如域名为：`speedtest.20010501.xyz`。

Windows PowerShell 检查解析：

```powershell
Resolve-DnsName speedtest.20010501.xyz -Type AAAA
```

查看 Windows 的 IPv6：

```powershell
Get-NetIPAddress -AddressFamily IPv6 |
  Where-Object { $_.AddressState -eq 'Preferred' -and $_.IPAddress -match '^[23]' } |
  Select-Object IPAddress, InterfaceAlias
```

如果运营商会周期性更换 IPv6 前缀，后续还需要配好 **DDNS 自动更新 AAAA**，否则连接会因旧地址而中断。

## 五、放行 Windows 防火墙

**以管理员身份启动 PowerShell**，执行：

```powershell
New-NetFirewallRule `
  -DisplayName 'Hysteria2 UDP 443' `
  -Direction Inbound -Protocol UDP -LocalPort 443 -Action Allow

New-NetFirewallRule `
  -DisplayName 'Hysteria2 ACME TCP 80' `
  -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
```

如果规则已经创建，无需重复添加。路由器还需允许对应的 **IPv6 入站**。这里的 **UDP 443** 和旧版 OpenVPN 的 **TCP 443** 是不同传输协议，可在不冲突的前提下同时监听。

## 六、一次生成服务端和安卓客户端配置（推荐）

> **这是重装时使用的一次性脚本。** 如果你当前的 Hysteria 已经稳定运行且设置了开机自启，**不要直接覆盖现有配置**；否则新密码会让旧客户端无法连接。你可以把这部分保存为以后重装用的教程。

脚本会：

1. 让你输入 ACME 证书邮箱和 Windows 局域网 IPv4；
2. 随机生成一份强密码；
3. **用相同密码同时生成** `config.yaml` 与 `android-singbox.json`，避免之前的空密码和拼写错误；
4. 固定 ACME 存储目录，方便日后以 Windows 系统账户后台运行。

在 Windows PowerShell 中复制执行整段代码：

```powershell
$ErrorActionPreference = 'Stop'
$folder = 'D:\hysteria'
$domain = 'speedtest.20010501.xyz'
$email = (Read-Host '输入 ACME 证书邮箱').Trim()
$lanIP = (Read-Host '输入 Windows 局域网 IPv4（如 192.168.2.23）').Trim()

if ([string]::IsNullOrWhiteSpace($email)) { throw '邮箱不能为空' }
$parsedIP = $null
if (-not [System.Net.IPAddress]::TryParse($lanIP, [ref]$parsedIP) -or
    $parsedIP.AddressFamily -ne [System.Net.Sockets.AddressFamily]::InterNetwork) {
    throw '请输入有效的 IPv4 地址'
}

New-Item -ItemType Directory -Path $folder -Force | Out-Null
New-Item -ItemType Directory -Path "$folder\acme" -Force | Out-Null

# 由系统加密随机数生成器创建 32 字节随机密码
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
try { $rng.GetBytes($bytes) } finally { $rng.Dispose() }
$pass = -join ($bytes | ForEach-Object { $_.ToString('x2') })

# 生成服务端 YAML（密码仅由 0-9a-f 组成）
$serverConfig = @"
listen: ":443"

acme:
  domains:
    - $domain
  email: "$email"
  type: http
  dir: "D:/hysteria/acme"

auth:
  type: password
  password: "$pass"
"@

# 生成安卓 sing-box JSON
$androidConfig = @{
    log = @{ level = 'info' }
    inbounds = @(
        @{
            type = 'tun'
            tag = 'tun-in'
            address = @('172.19.0.1/30')
            auto_route = $true
            stack = 'mixed'
        }
    )
    outbounds = @(
        @{
            type = 'hysteria2'
            tag = 'hy2'
            server = $domain
            server_port = 443
            password = $pass
            tls = @{
                enabled = $true
                server_name = $domain
            }
        }
    )
    route = @{
        auto_detect_interface = $true
        final = 'hy2'
    }
}

$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("$folder\config.yaml", $serverConfig, $utf8)
[System.IO.File]::WriteAllText("$folder\android-singbox.json", `
    ($androidConfig | ConvertTo-Json -Depth 20), $utf8)

# 校验两份文件已生成，且客户端密码与本次生成的密码相同
$check = Get-Content "$folder\android-singbox.json" -Raw | ConvertFrom-Json
if ([string]::IsNullOrWhiteSpace($check.outbounds[0].password) -or
    $check.outbounds[0].password -ne $pass) {
    throw '安卓配置生成失败：密码错误或为空'
}

Write-Host '已生成两份配置文件：' -ForegroundColor Green
Write-Host "$folder\config.yaml"
Write-Host "$folder\android-singbox.json"
Write-Host "Windows 局域网 IP（稍后填入 Moonlight）：$lanIP"
Write-Host '两端已使用同一随机密码。不要公开配置文件。'
```

**生成后的服务端配置**结构如下（示例密码并非真实密码）：

```yaml
listen: ":443"

acme:
  domains:
    - speedtest.20010501.xyz
  email: "you@example.com"
  type: http
  dir: "D:/hysteria/acme"

auth:
  type: password
  password: "请使用自动生成的强密码"
```

其中 `acme.dir` 明确指定证书与 ACME 账户存储目录，避免使用计划任务的 `SYSTEM` 账户启动时，默认用户缓存路径与手动运行时不一致。`type: http` 的证书验证需要外部能够访问 TCP 80。

## 七、启动 Windows Hysteria 2 服务端

在 PowerShell 中执行：

```powershell
cd D:\hysteria
.\hysteria.exe server -c config.yaml
```

首次启动可能需要申请 TLS 证书。成功时一般能看到：

```text
server up and running
```

此时不要关闭窗口，先完成手机测试。如果申请证书失败，优先核对：域名 AAAA、TCP 80 入站、防火墙、ACME 邮箱和证书日志。

## 八、安卓安装 sing-box，导入 TUN 配置

官方客户端：[sing-box for Android](https://sing-box.sagernet.org/zh/clients/android/)。它支持运行本地配置和安卓 VPN/TUN 透明代理。

操作步骤：

1. 将 `D:\hysteria\android-singbox.json` 传到手机。
2. 在 sing-box 中添加**本地配置**，选择该 JSON 文件。
3. 选中配置并启动，允许系统的 VPN 权限。
4. 如果手机此前正在运行 OpenVPN，应先断开旧 VPN，避免 Android VPN 互斥。
5. 建议用移动数据测试，避免同一局域网环境下误以为已打通公网路径。

本教程生成的配置会把**大多数安卓网络流量**通过 Hysteria 2，而不只是 Moonlight；这是全局 TUN 测试配置，使用时需要留意数据流量和设备耗电。

其中关键部分如下：

```json
{
  "inbounds": [
    {
      "type": "tun",
      "tag": "tun-in",
      "address": ["172.19.0.1/30"],
      "auto_route": true,
      "stack": "mixed"
    }
  ],
  "outbounds": [
    {
      "type": "hysteria2",
      "tag": "hy2",
      "server": "speedtest.20010501.xyz",
      "server_port": 443,
      "password": "与 Windows config.yaml 相同的实际密码",
      "tls": {
        "enabled": true,
        "server_name": "speedtest.20010501.xyz"
      }
    }
  ],
  "route": {
    "auto_detect_interface": true,
    "final": "hy2"
  }
}
```

**注意：** 上面 JSON 仅用于理解结构；真正导入安卓的应是第六步生成的、含有效密码的 `android-singbox.json`。

## 九、让 Moonlight 连接 Sunshine

在 Windows 上查看局域网 IPv4：

```powershell
ipconfig
```

找到正在联网的“以太网适配器”或“无线局域网适配器”，例如：

```text
IPv4 地址 . . . . . . . . . : 192.168.2.23
```

安卓操作：

1. 确认 Windows 上 Sunshine 运行正常。
2. 先启动 sing-box VPN，确保 Hysteria 2 可以连接。
3. 打开 Moonlight，点击添加电脑（`+`）。
4. 输入 Windows 局域网 IP：**`192.168.2.23`**（其他电脑请替换成自己的 IP）。
5. 完成 Moonlight 与 Sunshine 配对，然后开始串流。

这里**不填**：

- `10.8.0.1`：以前 OpenVPN 的虚拟 IP；
- `speedtest.20010501.xyz`：连接 Hysteria 2 服务端的域名，不是本文配置下 Sunshine 的目标地址。

初次测速建议 Moonlight 使用 1080p / 60 FPS / 10 Mbps / H.264 / HDR 关闭，稳定后再逐渐提高码率。Moonlight 的局域网广播发现一般不会穿过这种代理，因此需要手动添加 IP。

## 十、设置 Windows 开机自启、后台运行

这里采用 Windows **任务计划程序**：开机即启动、不要求登录桌面，也不需要保留 PowerShell 窗口。

**重要：** 先保证服务端配置中的 `acme.dir` 已设为固定路径（本教程是 `D:/hysteria/acme`）。如果你原来已经用其他目录成功申请证书，切换之前应备份现有证书和配置，避免重新申请时无法访问 TCP 80。

首先关闭手动运行 Hysteria 的窗口（按 **Ctrl+C**），避免与后台任务争用 UDP 443。

以**管理员身份打开 PowerShell**，执行：

```powershell
$action = New-ScheduledTaskAction `
  -Execute 'D:\hysteria\hysteria.exe' `
  -Argument 'server -c D:\hysteria\config.yaml' `
  -WorkingDirectory 'D:\hysteria'

$trigger = New-ScheduledTaskTrigger -AtStartup

$settings = New-ScheduledTaskSettingsSet `
  -RestartCount 3 `
  -RestartInterval (New-TimeSpan -Minutes 1) `
  -ExecutionTimeLimit ([TimeSpan]::Zero) `
  -StartWhenAvailable

$principal = New-ScheduledTaskPrincipal `
  -UserId 'SYSTEM' `
  -LogonType ServiceAccount `
  -RunLevel Highest

Register-ScheduledTask `
  -TaskName 'Hysteria2 Server' `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Principal $principal `
  -Description 'Hysteria2 server startup' `
  -Force
```

立即启动后台任务：

```powershell
Start-ScheduledTask -TaskName 'Hysteria2 Server'
```

查看状态：

```powershell
Get-ScheduledTask -TaskName 'Hysteria2 Server'
Get-Process hysteria -ErrorAction SilentlyContinue
```

任务显示 `Running`、后台存在 `hysteria` 进程，并且安卓 Moonlight 能正常串流，才算验证成功。只看进程存在还不足以证明证书和网络连接都正常。

常用管理命令：

```powershell
# 停止
Stop-ScheduledTask -TaskName 'Hysteria2 Server'

# 启动
Start-ScheduledTask -TaskName 'Hysteria2 Server'

# 禁用开机启动
Disable-ScheduledTask -TaskName 'Hysteria2 Server'

# 恢复开机启动
Enable-ScheduledTask -TaskName 'Hysteria2 Server'
```

建议最后**重启 Windows 一次**，确认在尚未手动打开 PowerShell 时，安卓仍能连上 Moonlight。

## 十一、曾经遇到的错误及解决方法


| 报错或现象                                | 原因                                                        | 处理                                                                                 |
| ----------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `hysteria.exe` 无法识别                   | 文件原名是`hysteria-windows-amd64-avx.exe`，或执行目录不对  | 在正确文件夹运行原文件名，或重命名为`hysteria.exe`                                   |
| 双击 EXE 没反应                           | Hysteria 是命令行程序，不是图形安装器                       | 在 PowerShell 执行`./hysteria.exe version`（Windows 建议 ` .\hysteria.exe version`） |
| `netip.ParsePrefix("/32"): ParseAddr("")` | 客户端生成了空的 CIDR 地址，例如`"ip_cidr": ["/32"]`        | 删除错误规则，或填写完整有效的`192.168.2.23/32`；本文推荐的全局路由配置不需要此规则  |
| `authentication failed, status code: 404` | 最常见是 Hysteria 2 两端密码不一致；也可能连到了错误服务端  | 核对`config.yaml` 的 `auth.password` 与安卓 JSON 的 `password`，修改服务端后重启     |
| PowerShell 提示“密码不能为空”           | `Read-Host '文字'` 里的文字只是提示；直接回车会得到空字符串 | 在提示符后输入真实密码，或使用本文的一次性生成脚本                                   |
| 服务端启动失败 / 证书错误                 | AAAA 不正确、TCP 80 不通、ACME 失败或系统账户找不到证书缓存 | 检查 DNS、入站防火墙和固定`acme.dir`                                                 |
| sing-box 已运行但 Moonlight 连不上        | Sunshine 未运行、IP 填错、防火墙规则或服务端认证失败        | 查看 sing-box 错误日志，核对 Sunshine 和局域网 IP                                    |
| 本地能连，手机流量连不上                  | 手机网络缺少 IPv6 路径，或公网 IPv6/UDP 443 不通            | 测试公网连通性、DNS 与手机当前网络                                                   |

> **本次真实踩坑：** Windows 服务端的密码曾被写成一个拼写，安卓客户端写成另一个拼写，导致 `authentication failed, status code: 404`。调整两端密码一致并重启服务端后，Moonlight 串流成功且连接稳定。**不要在公开教程中附上真实密码。**

## 十二、日常维护建议

- **保持密码安全：** 曾经贴到聊天或公开页面的密码应视为已泄露，最好同时更换 Windows 服务端和安卓客户端密码。
- **保持 AAAA 更新：** 家庭 IPv6 如果变化，需要使用 DDNS，否则域名会指向旧地址。
- **确认 TLS 自动续期：** 使用 ACME HTTP-01 时，需要确保 TCP 80 在续期期间仍可从公网访问。
- **避免重复运行：** 手动 PowerShell 与计划任务同时运行时，可能争用 UDP 443。
- **明确转发范围：** 当前方案让手机多数流量经 Windows 出网；若只想代理 Moonlight，需要进一步配置 Android 分应用或目标路由规则。
- **游戏串流不是“绝对提速”：** Hysteria 2 基于 UDP/QUIC，可能比 OpenVPN TCP 更适合高码率低延迟传输，但最终质量仍取决于运营商、丢包、带宽和路由。

## 参考资料

1. [Hysteria 2 官方安装文档](https://v2.hysteria.network/zh/docs/getting-started/Installation/)
2. [Hysteria 2 官方服务端指南](https://v2.hysteria.network/zh/docs/getting-started/Server/)
3. [Hysteria 2 完整服务端配置（ACME、认证、监听）](https://v2.hysteria.network/zh/docs/advanced/Full-Server-Config/)
4. [Hysteria 2 官方故障排除](https://v2.hysteria.network/zh/docs/advanced/Troubleshooting/)
5. [sing-box for Android](https://sing-box.sagernet.org/zh/clients/android/)
6. [sing-box TUN 入站配置](https://sing-box.sagernet.org/zh/configuration/inbound/tun/)
7. [sing-box Hysteria2 出站配置](https://sing-box.sagernet.org/zh/configuration/outbound/hysteria2/)

---

**完成判据：** Windows 重启后 Hysteria 2 自动在后台运行；安卓 sing-box 启动 VPN/TUN；Moonlight 手动添加 `192.168.2.23`，能够通过手机移动网络稳定连接 Sunshine 并串流。
