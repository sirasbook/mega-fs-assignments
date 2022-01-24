import React, { useEffect, useState } from "react";
import { Button, Input } from 'antd';
import "./supply.scss"
import { connectWalletHandler } from "../services/user.service";
import Web3 from "web3";
import Notification from '../components/notification'
import { getCash, getExchangeRate, getYourSupply, getSupplyRatePerBlock, mint } from "../services/contract.service";

const Supply = () => {

    useEffect(() => {
        fetchData();
        fetchExchangeRate();
    }, [])

    const web3 = Web3
    const address = sessionStorage.getItem("address")
    const balance = sessionStorage.getItem("balance")
    const [totalSupply, setTotalSupply] = useState(null)
    const [yourSupply, setYourSupply] = useState(null)
    const [supplyAPY, setSupplyAPY] = useState()
    const [value, setValue] = useState()
    const [exchangeRate, setExchangeRate] = useState()
    const [cETH, setCETH] = useState()

    const fetchData = async () => {
        await connectWalletHandler()

        const _yourSupply = await getYourSupply(address)
        const _totalSupply = await getCash(address)
        
        // Get this Calculate APY from compound finance docs
        const ethMantissa = 1e18;
        const blocksPerDay = 6570; // 15 seconds per block from rinkeby.io
        const daysPerYear = 365;
        const supplyRatePerBlock = await getSupplyRatePerBlock()
        const _supplyApy = (((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
    
        if (_yourSupply) {
            setYourSupply(parseFloat(_yourSupply).toFixed(4))
        }
        if (_totalSupply) {
            setTotalSupply(parseFloat(_totalSupply).toFixed(4))
        }
        if (_supplyApy) {
            setSupplyAPY(parseFloat(_supplyApy).toFixed(2))
        }
    }

    const fetchExchangeRate = async () => {
        const _exchangeRate = await getExchangeRate()
        if (_exchangeRate) {
            setExchangeRate(_exchangeRate)
        }
    };

    const accountChange = async () => {
        await fetchData()
        window.location.reload()
    }

    window.ethereum.on('accountsChanged', accountChange);

    window.ethereum.on('chainChanged', accountChange);

    const handleInputValue = async (e) => {
        setValue(e.target.value)
        if (e.target.value && !isNaN(e.target.value)) {
            const _cETH = web3.utils.toWei(e.target.value) / exchangeRate * 1e-8
            setCETH(parseFloat(_cETH).toFixed(4))
        }
    }

    const handleMax = () => {
        setValue(parseFloat(balance).toFixed(4))
        const _cETH = web3.utils.toWei(balance) / exchangeRate * 1e-8
        setCETH(parseFloat(_cETH).toFixed(4))
    }

    const handleSupply = async () => {
        if (!isNaN(value)) {
            if (address && value) {
                const result = await mint(address, value);
                if (result) {
                    fetchData()
                    setValue(null)
                    Notification({type: 'success', message: 'Supply success', desc: `Successfully get ${parseFloat(result).toFixed(4)} cETH`, duration: 3})
                }
            }
        }else {
            Notification({type: 'error', message: 'Input Error', desc: 'Input must be number', duration: 2})
        }
    }

    const handleClick = () => {
        setValue(null)
    }

    return (
        
        <div className="page">
            <div className="container">
                <div className="flex-row">
                    <div className="box m-r-20">
                        <p className="flex-center title">Your supply</p>
                        <div className="flex-center flex-row">
                            <label className="m-r-10">{yourSupply}</label>
                            <div>ETH</div>
                        </div>
                    </div>
                    <div className="box m-r-20">
                        <p className="flex-center title">Total supply</p>
                        <div className="flex-center flex-row">
                            <label className="m-r-10">{totalSupply}</label>
                            <div>ETH</div>
                        </div>
                    </div>
                    <div className="box">
                        <p className="flex-center title">APY</p>
                        <div className="flex-center flex-row">
                            <label className="m-r-10">{supplyAPY}</label>
                            <div>%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container m-t-50">
                <div className="supply">
                    <div className="header flex-center m-b-16">Supply</div>
                    <div className="balance">Balance: {parseFloat(balance).toFixed(4)} ETH</div>
                    <div className="flex-row">
                        <div className="currency m-r-10">ETH</div>
                        <div className="flex-center flex-row">
                            <Button type="text" className="btn-max m-r-10" onClick={handleMax}>max</Button>
                            <Input className="m-r-10" onChange={handleInputValue} value={value} onClick={handleClick}></Input>
                            <div>ETH</div>
                        </div>
                    </div>
                    {value && 
                    <div className="flex-between m-t-20">
                        <div>Receiving</div>
                        <div>≈ {cETH} cETH</div>
                    </div>}
                    <div className="flex-center m-t-50">
                        <Button className="supply-button" onClick={handleSupply}>Supply</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Supply;