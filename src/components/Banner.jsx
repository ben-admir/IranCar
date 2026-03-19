const Banner = () => {
  const title = "welcome to my";
  const title1 = "site";
  const address = "http://bmw.com";

  const clickHandle = () => {
    console.log("this is my first website");
    console.log(title, title1);
  };

  return (
    <div>
      <h2>Banner</h2>
      <p>{title} {title1}</p>
      <p>Today's Date: {new Date().toDateString()}</p>
      <p>Random Number: {Math.floor(Math.random() * 100)}</p>
      <a href={address}>Click Here</a>
      <br />
      <button onClick={clickHandle}>Press Me</button>
    </div>
  );
};

export default Banner;