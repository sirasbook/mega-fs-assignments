import React from "react";
import { Button } from 'antd';
import { useHistory } from 'react-router-dom'
import "./login.scss";
import { connectWalletHandler } from "../services/user.service";

const Login = () => {
    const history = useHistory()

    const connectWallet = async () => {
        try {
            await connectWalletHandler()
            history.push('/supply')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login">
            <Button className="login-button" onClick={connectWallet}>Connect Wallet</Button>
        </div>
    );
}

export default Login;
