import { ethers } from "ethers";
import Notification from '../components/notification'

export const connectWalletHandler = () => {
    if (window.ethereum) {
        return window.ethereum.request({method: 'eth_requestAccounts'})
        .then(result => {
            sessionStorage.setItem("address", result[0]);
            getUserBalance(result[0])
            Notification({type: 'success', message: 'Login success', duration: 2})
        })
    }else {
        return Notification({type: 'error', message: 'Login fail', desc: 'Please Install MetaMask', duration: 3})
    }
}

export const getUserBalance = (address) => {
    return window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
    .then(balance => {
        const tmpBalance = ethers.utils.formatEther(balance)
        sessionStorage.setItem("balance", tmpBalance);
    })
}