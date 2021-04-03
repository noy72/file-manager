## 扱えるもの
- ディレクトリ
- 動画

## Data.jsonの形式
```
{
    "locations": [
        "<path>"
    ],
    "commands": {
        "directory" : ["<command>"],
        "images" : ["<command>"],
        "video": ["<command>"]
    },
    "tags": { },
    "items": [ ]
}
```

## メモ
- ファイルやディレクトリの情報
    - data.json  
      ファイルやディレクトリの情報．パスを含む．
    - ローカルファイル
- models
    - 扱うものを現したもの
- renderer
    - HTMLやブラウザを操作する．

## TODO
- タグを消せるようにする