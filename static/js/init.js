

init();

function init() {
  // connect to Moralis server
  connectMoralis();

  // control wallet connection button in navbar
  const btn = dom.get('connect-btn');
  btn.addEventListener("click", toggleWalletConnection);
  refreshConnectWalletBtn();
};


function refreshConnectWalletBtn() {
  // change the wallet connectin button depending on current connection
  const btn = dom.get('connect-btn');
  if (walletIsConnected()){
    btn.innerHTML = "Disconnect wallet";
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline-primary');
    btn.dataset.connected = "true";
  } else {
    btn.innerHTML = "Connect wallet";
    btn.classList.remove('btn-outline-primary');
    btn.classList.add('btn-primary');
    btn.dataset.connected = "false";
  };
};

function toggleWalletConnection() {
  // control logic when connect wallet button is clicked
  if (this.dataset.connected === "true") {
    logout();
  } else {
    login();
  };
};

function walletIsConnected() {
  //determine whether user is logged in or not
  return (Moralis.User.current()) ? true : false;
};


function connectMoralis() {
  // connect to the Morals server

  //const INFURA_URI = "https://mainnet.infura.io/v3/9104b3a76b4b46b29c1cc489338980b8";
  //const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URI));
  //const myAddress = "0x91a42eCF59abB8350A0A64c8D3f5eb3bD08cc6c2";

  // ethereum mainnet
  const serverUrl = "https://mysaxj65vywx.usemoralis.com:2053/server";
  const appId = "iPXKdV96rgPUw4gJAxNnJw5gPRBKeGOwX8vFtQHZ";

  // ropsten testnet
  //const serverUrl = "https://78pegkjwaph4.usemoralis.com:2053/server";
  //const appId = "jXMbJANvdiXXqXsu1BkVjemTq2T2p2ZDYL9XJ0WF";

  Moralis.start({ serverUrl, appId });
};


async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({signingMessage: "Log into OpenPublisher using MetaMask"}).then(function (user) {
      console.log("logged in user:", user);
      dom.showAlert(msg=`COnnected to wallet address ${user.get("ethAddress")}.`, style="success");
      refreshConnectWalletBtn();
    }).catch(function (error) {
      dom.showAlert(msg=error.message, style="danger");
    });
  };
};


async function logout() {
  await Moralis.User.logOut();
  console.log("logged out");
  dom.showAlert(msg=`Wallet is disconnected.`, style="success");
  refreshConnectWalletBtn();
};

/*
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
*/