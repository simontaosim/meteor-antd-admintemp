import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import MenuItem from 'antd/lib/menu/MenuItem';
import Icon from 'antd/lib/icon/';
import Dropdown from 'antd/lib/dropdown/';
import Button from 'antd/lib/button/';
import 'antd/lib/layout/style';
import 'antd/lib/button/style';
import 'antd/lib/icon/style';
import 'antd/lib/menu/style';
import 'antd/lib/dropdown/style';
import { browserHistory } from 'react-router';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => (
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <Link to="/">
            <Icon type="car" />
            <span className="nav-text">车辆管理</span>
          </Link>

        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">
            <Icon type="file-text" />
            <span className="nav-text">合同管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span className="nav-text">nav 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="user" />
          <span className="nav-text">nav 4</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', position: 'fixed', width: '100%' }} >
        <Route exact path="/" component={HomeHeader}/>
        <Route path="/about" component={About}/>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 80 }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        SimonXu ©2017 Created For His Gal
      </Footer>
    </Layout>
</Layout>
);

class AppRoutes extends React.Component {

  render() {

    return (
      <Router history={browserHistory}>
        <AppLayout />
      </Router>
    );
  }
}


const menu = (
  <Menu>
    <Menu.Item>
    <Link to="/about">
      <Icon type="file-text" />
      <span className="nav-text">合同管理</span>
    </Link>
    </Menu.Item>
    <Menu.Item>
    <Link to="/about">
      <Icon type="file-text" />
      <span className="nav-text">合同管理</span>
    </Link>
    </Menu.Item>

    <Menu.Item>
    <Link to="/about">
      <Icon type="file-text" />
      <span className="nav-text">合同管理</span>
    </Link>
    </Menu.Item>
  </Menu>
);

const HeaderUserArea = () => (
  <Dropdown overlay={menu}>
    <Button style={{ marginLeft: 8 }}>
      用户名 <Icon type="down" />
    </Button>
 </Dropdown>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
const HomeHeader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }}>
    <div>&nbsp;</div>
    <div style={{textAlign: "center", padding:"10px"}}>
      <h3>佩佩电网车辆管理系统</h3>
    </div>
    <HeaderUserArea />
  </div>
)



const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => {

  return (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)}

const Topic = ({ match }) => {
  console.log(match.params.topicId);
  return (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)}



export default AppRoutes
