# mosdns

## v4

### 配置文件

可以使用脚本一次性加载完成。`mos-dns/v4/update.sh`

但注意脚本的执行路径，所有配置文件都是在下载到当前路径。后续启动 Docker 也需要同步修改为绝对路径。

`mos-dns/` 下所有文件中的注释也需要详细阅读，因为存在需要自行修改的内容。比如 `ecs_cn` 下的 IPv4 内容。

最后，可以复制并修改内容发布到你的 Gists 下，方便私有化管理。因为我这里只是示范。

### Docker 部署

```bash
docker run -d --name mosdns -p 5454:53/udp -p 5454:53/tcp -v /etc/mosdns:/etc/mosdns irinesistiana/mosdns:v4.5.3
```

注意：其中的配置文件映射 `/etc/mosdns:/etc/mosdns` 和端口映射 `5454:53` 依据自己情况修改。
