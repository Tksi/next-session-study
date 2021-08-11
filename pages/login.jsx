const login = () => {
  return (
    <>
      <h1>ログインページ</h1>
      <br />
      <form action="./api/login">
        <div>name</div>
        <input type="text" name="name" />
        <div>passwd</div>
        <input type="password" name="passwd" />
        <br />
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default login;
