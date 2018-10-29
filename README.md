# rent-home
这是一个关于区块链的租房平台，我正在完成我的毕业设计，同时，正在学习与开发

# 开始
## 启动以太坊节点
```
ganache-cli
```
## 启动ipfs
```
ipfs daemon
```

## 启动oraclize（在此之前安装oraclize-bridge）
```
./ethereum-bridge -H 127.0.0.1:8545 -a 0
```

## 部署智能合约
```
truffle compile

truffle migrate --reset //reset很重要
```

## 生成的contracts文件夹copy to src 目录下
```
cp -a ../build/contracts ./contracts
```

## npm 开发环境运行

```
npm install
npm run start
```

## npm 生产环境
```
npm run build
```

## 生产环境目录为rent，添加到ipfs节点
```
ipfs add -r ./rent  
```

## 将生成的 `hash` 与自己的ipns id 进行关联
```
ipfs name publish [YOU-HASH]
```
## 浏览器访问
```
http://ipfs.io/ipns/[YOU-IPFS-ID]
localhost:8080/ipns/QmaL35BGUi95TSYXZDJbmZzHpSxPVx8ASCrg5h4acw1TjU
```