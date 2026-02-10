const output = document.getElementById("output");
const actions = document.getElementById("actions");
const connectWalletBtn = document.getElementById("connectWallet");

connectWalletBtn.onclick = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    output.innerText = "Wallet connected.";
    actions.style.display = "block";
  } else {
    output.innerText = "Please install MetaMask.";
  }
};

function issueCredential() {
  output.innerText = "Issue credential function stub.";
}

function verifyCredential() {
  output.innerText = "Verify credential function stub.";
}
