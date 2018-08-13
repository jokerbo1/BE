# BE 任务小工具

- 支持任务分组
- 支持任务添加删除

- 采用xml存储

- 模式Electron  +  原生js 编写

## 打包

- 打包成mac应用
### node ./node_modules/electron-packager/cli.js . BE --platform=darwin --overwrite
- 打包成 dmg
### node ./node_modules/electron-installer-dmg/bin/electron-installer-dmg.js ./BE-darwin-x64 BE --overwrite

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
