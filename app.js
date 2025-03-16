// Connect to MetaMask
const connectButton = document.getElementById('connect');
const walletAddressElement = document.getElementById('walletAddress');
const balanceElement = document.getElementById('balance');
const sendButton = document.getElementById('sendEth');

// Connect to MetaMask
connectButton.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      walletAddressElement.innerText = account;
      getBalance(account);
    } catch (error) {
      console.error("User denied access:", error);
    }
  } else {
    alert("Please install MetaMask.");
  }
});

// Get Balance
async function getBalance(account) {
  const web3 = new Web3(window.ethereum);
  const balance = await web3.eth.getBalance(account);
  const ethBalance = web3.utils.fromWei(balance, 'ether');
  balanceElement.innerText = `${ethBalance} ETH`;
}

// Send ETH
sendButton.addEventListener('click', async () => {
  const toAddress = document.getElementById('toAddress').value;
  const amount = document.getElementById('amount').value;

  const web3 = new Web3(window.ethereum);
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const sender = accounts[0];

  try {
    await web3.eth.sendTransaction({
      from: sender,
      to: toAddress,
      value: web3.utils.toWei(amount, 'ether')
    });
    alert('Transaction Successful!');
    getBalance(sender);
  } catch (error) {
    console.error('Transaction Failed:', error);
  }
});
