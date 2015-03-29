# TwitterStream

カンファレンスなどの会場でよくあるTwitterの検索結果を垂れ流してくれるやつです。

## Description

高専カンファレンス in 津山2(kosenconf-091tsuyama2)で，当日の朝に15分ぐらいで実装したTwitterを垂れ流してくれるやつを手直しして見た目もよく使いやすくしました。

## Usage

### Twitter API Keyの取得
Twitter APIの各種キーについては自前で取得し，``twitter.json``として保存してください(最近はAPI Ketの取得だけで電話番号が必要なんですね…)。

```json
{
	"consumer_key": "*",
	"consumer_secret": "*",
	"access_token_key": "*",
	"access_token_secret": "*"
}
```

### Node.jsとパッケージのインストール

Twitterとの通信及びリアルタイム更新に関しては，[Node.js](https://nodejs.org/)の各種パッケージ使用しています。
Node.jsをインストールした後，同一ディレクトリ上で以下のコマンドを実行します。

```
$ npm install
```

### Twitter Streamの起動

同じくディレクトリ上で以下のコマンドを実行します。

```
$ node index.js
```

以下のメッセージが出ていれば起動に成功しています。

```
listening on *:3000
```

起動に成功したら以下のURLにアクセスできます。

* [http://localhost:3000/](http://localhost:3000/)

### 検索ワードの変更

検索ワードはURLのハッシュで変更することが出来ます。

例えば``ラブライブ``で検索したい場合は， ``http://localhost:3000/#ラブライブ`` で検索することができます。

``#スクフェス``などのハッシュタグで検索する場合は， ``http://localhost:3000/##スクフェス`` で検索することが可能です。

## Tips

映し出すプロジェクターのサイズによって表示される文字が大きすぎる or 小さすぎるという場合は，ブラウザの拡大・縮小機能を使えるので便利です。

## License

私が書いたコードについては[MIT License](https://github.com/windyakin/TwitterStream/blob/master/LICENSE)で提供されます。

それ以外のJsViewsやjQueryなどのライブラリについてはライブラリごとのライセンス規約に従います。

## Author

 * [windyakin](http://windyakin.net/)
