import crypto from 'crypto';
import Datastore from 'nedb';

export const db = new Datastore({ filename: 'db.nedb', autoload: true });

const login = async (req, res) => {
  const doc = await findOne({ db, find: req.query });

  if (doc === null) {
    res.end(
      `<body>wrong name or passwd back to <a href='/login'>login</a></body>`
    );
  } else {
    // UUID生成
    const sessionID = crypto.randomUUID();
    // dbにcookie書き込み
    update({ db, _id: doc._id, doc: { sessionID } });
    res.setHeader('set-Cookie', `sessionID=${sessionID}; Path=/`);
    res.end(`<body>Logined go to <a href='/'>index</a></body>`);
  }
};

export default login;

export const findOne = ({ db, find = {}, sort = {}, skip = 0, limit = 0 }) => {
  return new Promise((resolve, reject) => {
    db.findOne(find)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec((err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
  });
};

const update = ({ db, _id, doc }) => {
  return new Promise((resolve, reject) => {
    db.update({ _id }, { $set: doc }, {}, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
};
