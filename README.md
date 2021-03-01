## Data.jsonの形式
```
{
    "locations": [
        "<path>"
    ],
    "applications": {
        "directory" : ["<command>"],
        "images" : ["<command>"],
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