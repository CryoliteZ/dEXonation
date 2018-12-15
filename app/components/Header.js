import React from 'react';
import { Layout, Icon, Row } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;

export default () => (
    <Row span={24}>
        <Header
            className='main-bg-color'
            style={{
            color: 'rgb(149, 74, 151)',
            fontSize: '2.2em',
            paddingTop: '2%'
            }}
            type="flex"
            justify="space-around"
            align="middle"
        >
        <Icon type="coffee" theme="outlined" /> <Link to = '/' style={{color: 'rgb(149, 74, 151)'}}>dEXonation</Link>
        </Header>
    </Row>
)