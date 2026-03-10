let contractAddress = "0xA3510e929D4cef982886576F57db4b645C256Efe"

let abi = [
 "function vote(uint256 candidateIndex) public",
 "function candidates(uint256) view returns (string memory name, uint256 voteCount)"
]

let provider
let signer
let contract

async function connectWallet(){

 if(window.ethereum){

  await ethereum.request({ method: 'eth_requestAccounts' })

  provider = new ethers.providers.Web3Provider(window.ethereum)
  signer = provider.getSigner()

  contract = new ethers.Contract(contractAddress, abi, signer)

  document.getElementById("wallet").innerText = "Wallet Connected"

     loadResults()
 }

}

async function vote(index){

 const tx = await contract.vote(index)
 await tx.wait()

 //loadResults()

}

async function loadResults(){

 const alice = await contract.candidates(0)
 const bob = await contract.candidates(1)

 document.getElementById("result").innerHTML =
 "Alice : " + alice.voteCount +
 "<br> Bob : " + bob.voteCount

}

//loadResults()