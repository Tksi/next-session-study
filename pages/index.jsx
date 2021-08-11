import Link from 'next/link';
import { db, findOne } from './api/login.js';

// SSRでcookieチェック
export const getServerSideProps = async ({ req }) => {
  //cookieをパース
  const cookieObj = Object.fromEntries(
    req.headers.cookie?.split(/\s*;\s*/).map((v) => v.split('=')) ?? []
  );
  const doc = await findOne({ db, find: { sessionID: cookieObj.sessionID } });
  return {
    props: doc?.data ?? {},
  };
};

// okならage表示、だめならloginページへのリンク
const index = ({ age }) => {
  console.log(age);
  if (age === undefined)
    return (
      <Link href="/login">
        <a>ログイン</a>
      </Link>
    );
  return <h1>your age : {age}</h1>;
};

export default index;
