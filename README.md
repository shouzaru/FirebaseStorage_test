# Firebase Storageにファイルをアップロード＆ダウンロード（課題04の改訂版）

## ①課題内容（どんな作品か）
- Firebase Storageに、日付のメタデータを添えて、任意のデータ（書類・写真など）をアップロードできます
- 日付のメタデータで検索してダウンロードして表示します

## ②工夫した点・こだわった点
- 課題04の時点ではアップロードはできるがダウンロードができなかったので、改訂。
- ダウンロードの際にはメタデータとしてつけた「日付」からデータを引っ張り出します
- ダウンロード中の進捗をプログレスバーで表示。
- ダウンロードが完了すると通知します。 
## ③苦労した点
- Firebase Storageに保存したデータからメタデータを引っ張り出すのに苦労した
- どうやら非同期？なるものを使うらしい
- .then()メソッドでもメタデータを引っ張ることはできたが、その場合はプログレスバーの表示などが難しかった。
- そこでasync、awaitを使ったところ、いろいろうまくいった。

## ④その他（感想、シェアしたいことなんでも）
- Firebase使いこなせるようになりたいです！
- デプロイしたURL 　https://gs23-12a42.web.app
