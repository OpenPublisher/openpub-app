const serverUrl = "https://mysaxj65vywx.usemoralis.com:2053/server";
const appId = "iPXKdV96rgPUw4gJAxNnJw5gPRBKeGOwX8vFtQHZ";
Moralis.start({ serverUrl, appId });


dom.get("btn-login").addEventListener("click", login);
dom.get("btn-get-stats").addEventListener("click", getStats);

// get currently connected wallet
const currentUserObj = Moralis.User.current();

// if wallet is connected
if (currentUserObj) {
  const user = JSON.parse(JSON.stringify(currentUserObj));
  console.log(user);
  showAlert('login-success-alert', `You have successfully connected wallet address ${user['ethAddress']}`);
  
// if no wallet is connected
} else {
  console.log(`User not logged in`);
};


dom.get('submit-btn').addEventListener('click', () => {
  alert("This functionality is under construction");
});


async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({signingMessage: "Log into OpenPublisher using MetaMask"}).then(function (user) {
      console.log("logged in user:", user);
      console.log(user.get("ethAddress"));
      dom.get('btn-login').disabled = true;
    }).catch(function (error) {
      showAlert(id="error-alert", msg=error);
    });
  };
};


function getStats() {
  const user = Moralis.User.current();
  if (user) {
    const query = new Moralis.Query("EthTransactions");
    query.equalTo("from_address", user.get("ethAddress"));
    query.find().then(r => {
      console.log("user transactions:", r);
    });
  };
};


function showAlert(id, msg) {
  dom.get(`${id}-msg`).innerHTML = msg;
  dom.get(id).style.display = "block";
};