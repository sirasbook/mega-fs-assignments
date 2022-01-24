import erc20Contract from "../contract";
import Web3 from "web3";

const web3 = Web3

export const getCash = async () => {
    const response = await erc20Contract.methods.getCash().call()
    return web3.utils.fromWei(response, 'ether')
}

export const getSupplyRatePerBlock = async () => {
    const response = await erc20Contract.methods.supplyRatePerBlock().call()
    return response
}

export const mint = async (address, supply) => {
    const response = await erc20Contract.methods.mint().send({from: address, value: web3.utils.toWei(supply, 'ether')})
    return response.events.Mint.returnValues.mintTokens * 1e-8
}

export const getYourSupply = async (address) => {
    const response = await erc20Contract.methods.balanceOfUnderlying(address).call()
    return web3.utils.fromWei(response, 'ether')
}

export const getExchangeRate = async () => {
    const response = await erc20Contract.methods.exchangeRateCurrent().call()
    return web3.utils.fromWei(response, 'ether')
}

export const getCETH = async (account) => {
    const response = await erc20Contract.methods.balanceOf(account).call()
    return response * 1e-8
}

export const redeem = async (address, supply) => {
    const _supply = supply * 1e8
    const response = await erc20Contract.methods.redeem(_supply).send({from: address});
    return web3.utils.fromWei(response.events.Redeem.returnValues.redeemAmount, 'ether')
}