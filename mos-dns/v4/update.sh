#!/bin/bash
### 初始化 mosdns 配置文件 ###
GREEN=$(tput setaf 2)
NORMAL=$(tput sgr0)
echo "${GREEN}🛠️ 开始初始化 mosdns 配置文件${NORMAL}"
echo "${GREEN}💁 请等待...${NORMAL}"

# 下载最新的 config.yml、 geoip.dat 和 geosite.dat 文件，并覆盖原有文件
wget -O config.yml https://ghproxy.com/https://github.com/QuentinHsu/Awesome/blob/main/mos-dns/v4/config.yml?raw=true
wget -O geoip.dat https://ghproxy.com/https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geoip.dat
wget -O geosite.dat https://ghproxy.com/https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geosite.dat

# 创建hosts.txt文件
touch hosts.txt

echo "${GREEN}🎉 脚本执行完毕！${NORMAL}"
echo "${GREEN}✅ mosdns 配置文件已准备就绪！${NORMAL}"