import React, { useState } from 'react'
import './navbar.scss'
import { Col, Menu, Row } from 'antd'
import { Link, useHistory } from 'react-router-dom'

const Navbar = () => {

    const history = useHistory()

    const [selectedKey, setSelectedKey] = useState({})

    const address = sessionStorage.getItem("address")

    const handleClick = (e) => {
        setSelectedKey(e.key);
        console.log(e.key)
    };

    const confirmLogout = () => {
        sessionStorage.removeItem("address")
        sessionStorage.removeItem("balance")
        history.push('/')
    }

    return (
        <div className="navbar-container">
            <Row justify='start' className="desktop height">
                <Col span={6}>
                    <Menu onClick={handleClick} selectedKeys={selectedKey} mode="horizontal">
                        <Menu.Item key="supply">
                            <Link to="/supply">Supply</Link>
                        </Menu.Item>
                        <Menu.Item key="withdraw">
                            <Link to="/withdraw">Withdraw</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={18}>
                    <Row justify='end' className='right'>
                        <div className='addr m-r-30'>Your Address: {address}</div>
                        <a className='logout' onClick={confirmLogout}>Logout</a>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Navbar