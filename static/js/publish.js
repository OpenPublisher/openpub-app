

dom.get('submit-btn').addEventListener('click', () => {
  if (walletIsConnected()){
    alert("This functionality is coming soon!");
  } else {
    dom.showAlert(msg="You must be connected to an Ethereum wallet to complete this step!", style="danger")
  }
});


/*
async function publish() {
  let options = {
    contractAddress: “0x356d2E7a0d592bAd95E86d19479c37cfdBb68Ab9”,
    function Name: “newDonation”,
    abi: [{"inputs":[{"internalType":"string","name":"note","type":"string"}],"name":"newDonation","outputs":[],"stateMutability":"payable","type":"function"}],
    Params:{
        Note: “Thanks for your work”
    },
    msgValue: Moralis.Units.ETH(0.1),
  }
  logout();
  showAlert("You have successfully published!", style="success");
 };
 */