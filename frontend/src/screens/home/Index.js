import * as React from "react";
import Button from "../../components/Button";
import Error from "../../components/Error";

function Home() {
  const [content, setContent] = React.useState("");
  const [copy, setCopy] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [errorDisplay, setErrorDisplay] = React.useState(false);
  const [customCheck, setCustomCheck] = React.useState(false);
  const [customInput, setCustomInput] = React.useState(false);

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = inputValue;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setInputValue("");
    setCopy(false);
    alert("Url copied Successfully");
  };

  function shorten() {
    //send to server
    //if error return the err
    //else return url
    //change btn to copy
    let url = "http://localhost:9100/urls";
    if (customCheck) {
      url = url + "/" + customInput;
    }
    const data = { url: content };
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const responseData = await res.json();

        if (res.status == 201) {
          //shortening successful
          //send back short to input
          //change btn to copy
          const shorturl =
            responseData.data.host + "/" + responseData.data.shortcode;
          setInputValue(shorturl);
          setCopy(true);
        } else {
          setErrorDisplay(responseData.message);
        }
      })
      .then((res) => console.log(res));
  }

  const customInputJSX = (
    <input
      type="text"
      name=""
      onChange={(e) => {
        setCustomInput(e.target.value);
      }}
      placeholder="Your Custom Shortcode"
      style={{ minWidth: "20%", height: "40px", marginBottom: "50px" }}
    />
  );

  return (
    <div className="w3-padding-large w3-center">
      <b className="w3-jumbo text-color-main">
        Your Favourite URL <br></br>Shortener
      </b>
      <br></br>
      {errorDisplay ? <Error>{errorDisplay}</Error> : ""}
      <br></br>
      <input
        type="text"
        name=""
        onChange={(e) => {
          setContent(e.target.value);
          setCopy(false);
        }}
        value={inputValue ? inputValue : content}
        placeholder="https://example.com/exam/699979/io89"
        className=""
        style={{ minWidth: "70%", height: "50px", marginBottom: "50px" }}
      />
      <br></br>
      Click to set custom shortcode
      <input
        type="checkbox"
        className="check w3-margin"
        onChange={(e) => {
          //if true open custom box
          setCustomCheck(e.target.checked);
        }}
      />
      {customCheck ? customInputJSX : ""}
      <Button
        handleShorten={shorten}
        handleCopy={copyToClipboard}
        type={copy}
      />
      <p className="text-color-main w3-large">
        You can access your link’s basic analytics by appending “stats” keyword
        to your link. e.g www.link.com/y6JF67f/stats
      </p>
    </div>
  );
}

export default Home;
