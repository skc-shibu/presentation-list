# プレゼンテーション一覧

このプロジェクトは、これまでに作成したプレゼンテーションを一覧で表示し、簡単にアクセスできるようにするための静的なウェブサイトです。

## 概要

`index.html`がトップページとなり、`js/main.js`で定義されたプレゼンテーションのリストを動的に読み込んで表示します。各プレゼンテーションは`presentations/`ディレクトリ以下に個別のHTMLファイルとして配置されます。

## 主な機能

- プレゼンテーションの一覧表示
- 各プレゼンテーションへのリンク
- レスポンシブデザイン（基本的なviewport設定のみ）

## プロジェクト構成

```
.
├── .gitignore
├── css
│   └── main.css
├── index.html
├── js
│   └── main.js
├── presentations
│   └── 2025-07-tiktok
│       └── index.html
└── README.md
```

## 使い方

1.  このリポジトリをクローンまたはダウンロードします。
2.  `index.html`をブラウザで開きます。

## 新しいプレゼンテーションの追加方法

1.  `presentations/`ディレクトリに、新しいプレゼンテーション用のディレクトリを作成します。(例: `presentations/YYYY-MM-new-presentation/`)
2.  作成したディレクトリ内に、プレゼンテーションの`index.html`ファイルを配置します。
3.  `js/main.js`ファイルを開き、`presentations`配列に新しいプレゼンテーションの情報をオブジェクトとして追加します。

    ```javascript
    const presentations = [
      {
        id: "2025-07-tiktok",
        title: "TikTokのこれまでとこれから",
        date: "2025-07-10",
        description:
          "短尺動画アプリTikTokの誕生から現在までの歴史、社会への影響、そして未来への展望について解説します。",
        path: "presentations/2025-07-tiktok/index.html",
      },
      // 新しいプレゼンテーションの情報をここに追加
      {
        id: "YYYY-MM-new-presentation", // 固有のID
        title: "新しいプレゼンテーションのタイトル",
        date: "YYYY-MM-DD", // 発表日
        description: "プレゼンテーションの簡単な説明",
        path: "presentations/YYYY-MM-new-presentation/index.html", // ファイルへのパス
      },
    ];
    ```

## 今後の展望

- プレゼンテーションのデータをJSONファイルとして外部化し、非同期で読み込むようにする。
- タグやカテゴリによる絞り込み機能の追加。
- 検索機能の実装。

## ライセンス

このプロジェクトはMITライセンスです。
