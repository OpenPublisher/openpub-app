const serverUrl = "https://mysaxj65vywx.usemoralis.com:2053/server";
const appId = "iPXKdV96rgPUw4gJAxNnJw5gPRBKeGOwX8vFtQHZ";
Moralis.start({ serverUrl, appId });



console.log("HIII");

document.getElementById("btn-login").onclick = login;

document.getElementById("btn-get-stats").onclick = getStats;

console.log(Moralis.User.current());


async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({signingMessage: "Log into OpenPublisher using MetaMask"}).then(function (user) {
      console.log("logged in user:", user);
      console.log(user.get("ethAddress"));
      dom.get('btn-login').disabled = true;
    }).catch(function (error) {
      showAlert(msg=error);
    });
  };
};


function getStats() {

  
  const user = Moralis.User.current();
  if (user) {
     // create query
    const query = new Moralis.Query("EthTransactions");
    query.equalTo("from_address", user.get("ethAddress"));
    // run query
    query.find().then(r => {
      console.log("user transactions:", r);
      
    });
  };
};


function showAlert(msg="Alert!") {
  dom.get("error-alert-text").innerHTML = msg;
  dom.get("error-alert").style.display = "block";
};