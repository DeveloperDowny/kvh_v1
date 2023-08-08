(() => {
    let buttonPanel, walletAddressNode, statusNode, nazarLogoBtn;
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

    const onNazarBtnClick = () => {
        walletAddress = walletAddressNode.innerText
        let rand = Math.random()
        statusNode = document.createElement('span')

        // will be replaced by api call
        if (rand < 0.5) {
            walletAddressNode.style.color = 'red'
            nazarLogoBtn.replaceWith(statusNode); 
            statusNode.innerText = '⚠️ UNSAFE'
            statusNode.style.color = 'red'
        } else {
            walletAddressNode.style.color = 'green'
            nazarLogoBtn.replaceWith(statusNode);
            statusNode.innerText = '✅ SAFE'
            statusNode.style.color = 'green'
        }
        
        walletAddressNode.style.fontWeight = 'bold'

    }

    newAddressLoaded()
})();
