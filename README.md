セッション認証

Client, Server, DB

Server : API Route
Client : login ページ, ユーザ認証が必要なページ(index)
DB : neDB

-- 認証開始 ---

1. Client -> Server : ID/passwd 送信
2. Server -> DB : ID/passwd 一致確認
3. Server : Cookie を発行
4. Server -> DB : Cokkie の値を保存
5. Server -> Clienr : レスポンスに Cookie を入れる

-- 認証終了 ---

-- 認証が必要なページへのアクセス --

1. Client -> Server : Cookie 付きのリクエスト
2. Server -> DB : Cookie の値と有効期限確認
3. Server -> DB : 個人情報の取り出し
4. Server -> Client : レスポンス
