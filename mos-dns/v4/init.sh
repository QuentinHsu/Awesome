#!/bin/bash
# 创建 /home/config/mosdns 路径
mkdir -p /home/config/mosdns
# 切换到 /home/config/mosdns 路径
cd /home/config/mosdns
# 下载 update.sh 脚本 按需求修改 update.sh 路径
wget -O update.sh https://ghproxy.com/https://github.com/QuentinHsu/Awesome/blob/main/mos-dns/v4/update.sh?raw=true
# 修改脚本权限
chmod +x update.sh
# 执行脚本
sudo ./update.sh