let walletAddress = walletAddressNode.innerText
console.log(walletAddress)
await fetch(`http://localhost:5000/api/explore/risk/${walletAddress}`)
.then(response => response.json())
.then(data => { 
    // console.log(data.mdata)
    riskMessage = data.mdata.riskMessage;
    score = data.mdata.riskScores.combinedRisk;
    // console.log("extension", data.mdata)
}).catch(err => {
    console.log(err)
});
if (score > 30) {
    walletAddressNode.style.color = 'red'
    nazarLogoBtn.replaceWith(statusNode); 
    statusNode.innerText = '⚠️ ' + riskMessage;
    statusNode.style.color = 'red'
} else {
    walletAddressNode.style.color = 'green'
    nazarLogoBtn.replaceWith(statusNode);
    statusNode.innerText = '✅ ' + riskMessage;
    statusNode.style.color = 'green'
}

walletAddressNode.style.fontWeight = 'bold'
