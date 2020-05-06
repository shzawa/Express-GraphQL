# express + graphql アプリ

## 利用方法

### (初回のみ)

1. 本リポジトリを`git clone`する
1. `cd express-graphql`, `npm install`を実行
1. `cp .env.example .env`を実行
1. MongoDBのWeb版でSchema作成。必要な情報をコピーして`.env`に記述

### (初回 + 初回以降)

`nodemon app`でアプリ起動  
(localhost:4000/graphql でGraphiQL起動)

## なぜ作った？

- APIサーバを気軽に作りたい → Expresss
- RESTful設計めんどくさい → GraphQL

## 利用技術

package.jsonを参照
