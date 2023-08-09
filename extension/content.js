(() => {
    let buttonPanel, walletAddressNode, statusNode, nazarLogoBtn, walletAddress, score;
    let riskMessage = "";
    let current_address = '';


    chrome.runtime.onMessage.addListener((obj, sender, res) => {
        const { type, address } = obj

        if (type == "NEW") {
            current_address = address
            newAddressLoaded()
        }
    })

    const newAddressLoaded = () => {
        nazarExists = document.getElementsByClassName('nazar-logo-btn')[0]

        if (!nazarExists) {
            nazarLogoBtn = document.createElement('img')
            nazarLogoBtn.src = chrome.runtime.getURL('/images/nazar-32.png')
            nazarLogoBtn.className = 'link-secondary position-relative ' + 'nazar-logo-btn'
            nazarLogoBtn.alt = 'Nazar'
            nazarLogoBtn.style.cursor = 'pointer'

            buttonPanel = document.getElementById('ContentPlaceHolder1_copyButtonPanel')
            walletAddressNode = document.getElementById('mainaddress')


            if (!buttonPanel) return
            buttonPanel.appendChild(nazarLogoBtn)

            nazarLogoBtn.addEventListener('click', onNazarBtnClick)
        }
    }

    const onNazarBtnClick = async () => {
        statusNode = document.createElement('span');
        walletAddress = walletAddressNode.innerText
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

    }

    newAddressLoaded()
})();
