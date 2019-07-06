import { type } from "os";
// import Web3 from 'web3';
let infura_uri_version = 'v3';
let infura_kovan_epKey = '03e8ac6c1433446dbfec1b1b4ada5fe9';

// This initializes the web3 object
// web3 = undefined;
if (typeof web3 !== 'undefined') {

    console.log('*** If - Starting web3 ***');
    window.addEventListener('load', async() => {
        // Modern dapp browsers...
        if (window.ethereum) {
            console.log('[1] pre-init window.ethereum', window.ethereum)
            window.web3 = new Web3(ethereum);
            console.log('[1] post-init window.ethereum', window.ethereum)
            try {
                // Request account access if needed 
                await ethereum.enable();
                // Accounts now exposed
                web3.eth.sendTransaction({/* ... */});
            }
            catch(error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if(window.web3){
            console.log('[2] pre-init window.web3', window.web3)
            window.web3 = new Web3(web3.currentProvider);
            console.log('[2] post-init window.web3', window.web3)
        } else {
            console.log('[3] pre-init web3', web3)
            // https://kovan.infura.io/Gz9ho0JbdmZ8QRkEsOzGH
            web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/' + infura_uri_version + '/' + infura_kovan_epKey)); 
            console.log('[3] post-init web3', web3)
        }
    })
}
else {
    console.log('*** Else - Starting web3 ***');
    // web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/Gz9hoJbdmZ8QRkEsOzGH"));
    // web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/Gz9hoJbdmZ8QRkEs0zGH'));
    web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/' + infura_uri_version + '/' + infura_kovan_epKey)); 
    console.log('post-init web3', web3)
}