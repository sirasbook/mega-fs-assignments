import React from "react";
import { Button } from 'antd';
import { useHistory } from 'react-router-dom'
import "./login.scss";
import { connectWalletHandler } from "../services/user.service";
import Notification from '../components/notification'

const Login = () => {
    const history = useHistory()

    const connectWallet = async () => {
        try {
            await connectWalletHandler()
            Notification({type: 'success', message: 'Login success', duration: 2})
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
