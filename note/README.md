+++
title = "CognitoにAmplify JavaScriptでGoogle経由のログイン 方法1"
date = "2021-03-23"
tags = ["Cognito", "Amplify", "Google", "SSO"]
+++

![img](/img/2021/03/amplify-googleauth-cognitoidpool.png)

Google OAuth2を設定したCognito IdPoolにログインするためのAmplify JavaScript（長っ）はこんなものだ、という話です。

そもそものところで、バックエンドについては[Cognitoの設定の記事](/aws/cognito-id-pool-with-google-auth)に書いたものがあって、この記事はその仕組みにログインするためのJavaScriptについて書いています。

[Githubのリポジトリ](https://github.com/suzukiken/amplify-googleauth-cognitoidpool)

このリポジトリのコードのデプロイ方法はAmplifyコンソールを使うという前提になっている。
そしてそのデプロイの仕組みは[こちらの記事](/aws/cdkamplify)に書いた方法を使っている。

このデプロイ方法はビルド時にSystems Managerのパラメタストアからaws-exports.jsの内容を受け取るようになっているので、
そのパラメタストアのデータはデプロイをする前に用意しておく必要がある。

ちなみにaws-exports.jsの内容は以下のようなものになる。

これは通常のAmplifyが生成するものと少し異っていて、Google側で作られるクライアントアプリケーションIDが追加されているところが異なる。


```aws-exports.js
const awsmobile = {
    "aws_project_region": "ap-northeast-1",
    "aws_cognito_identity_pool_id": "ap-northeast-1:.................",
    "aws_cognito_region": "ap-northeast-1"
};

const google_app_client_id = ".......................apps.googleusercontent.com";

export { awsmobile as default, google_app_client_id };
```

なぜAmplifyが生成したものと少し違うかというと、Amplify CLIの`auth`で用意されるCognitoの環境は、この記事のJavaScriptが前提としている[Cognitoの設定](/aws/cognito-id-pool-with-google-auth)ではなく[こちらの記事](/aws/cognito-user-pool-with-google-auth)に書いたCognitoの設定が使っているから、で、つまりそういう違いがあるわけです。

