import React, { useEffect, useState } from "react";
import { Button, Input } from 'antd';
import "./withdraw.scss"
import { getCETH, redeem } from "../services/contract.service";
import { connectWalletHandler } from "../services/user.service";
import Notification from '../components/notification'
const Withdraw = () => {

    useEffect(() => {
        fetchData();
    }, [])

    const address = sessionStorage.getItem("address")

    const [yourCETH, setYourCETH] = useState(null)
    const [value, setValue] = useState()

    const fetchData = async () => {
        await connectWalletHandler()
        const _cETH = await getCETH(address)

        if (_cETH) {
            setYourCETH(parseFloat(_cETH).toFixed(4))
        }
    }

    const handleInputValue = async (e) => {
        setValue(e.target.value)
    }

    const handleMax = () => {
        setValue(yourCETH)
    }

    const accountChange = async () => {
        await fetchData()
        window.location.reload()
    }

    window.ethereum.on('accountsChanged', accountChange);

    window.ethereum.on('chainChanged', accountChange);

    const handleWithdraw = async () => {
        if (!isNaN(value)) {
            if (address && value) {
                const result = await redeem(address, value);
                if (result) {
                    fetchData()
                    setValue(null)
                    Notification({type: 'success', message: 'Supply success', desc: `Successfully withdraw ${parseFloat(result).toFixed(4)} ETH`, duration: 3})
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
                <div className="withdraw">
                    <div className="header flex-center m-b-16">Withdraw</div>
                    <div className="balance">Deposit: {yourCETH} cETH</div>
                    <div className="flex-row">
                        <div className="currency m-r-10">cETH</div>
                        <div className="flex-center flex-row">
                            <Button type="text" className="btn-max m-r-10" onClick={handleMax}>max</Button>
                            <Input className="m-r-10" onChange={handleInputValue} value={value} onClick={handleClick}></Input>
                            <div>cETH</div>
                        </div>
                    </div>
                    <div className="flex-center m-t-50">
                        <Button className="withdraw-button" onClick={handleWithdraw}>Withdraw</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;