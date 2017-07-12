// @author:SimonXu
// ＠email: xsqfeather@gmail.com
//　此文件详细写了布局和路由，是整个应用的页面映射

import React, { PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom'
import { Switch, Route } from 'react-router'

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import MenuItem from 'antd/lib/menu/MenuItem';
import Icon from 'antd/lib/icon/';
import Dropdown from 'antd/lib/dropdown/';
import Spin from 'antd/lib/spin/';
import Button from 'antd/lib/button/';
import 'antd/lib/layout/style';
import 'antd/lib/button/style';
import 'antd/lib/icon/style';
import 'antd/lib/menu/style';
import 'antd/lib/dropdown/style';
import 'antd/lib/spin/style';
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()

const { Header, Content, Footer, Sider } = Layout;

const AppRoutes = ({location}) => {
  // console.log(customHistory.location);
  return (
    <Router history={customHistory}>
      <Route path='/' children={({ match }) =>{
        return  (

            <Switch>

              <Route  path="/login" component={Login}/>
              <Route  path={`${match.url}`} component={AppLayout}/>
            </Switch>
          )
      }} />

    </Router>

  )
};
AppRoutes.propTypes = {
  history: PropTypes.any,
};


class AppLayout extends React.Component {

  constructor(props) {
    super(props);

    self.state = {
      hideCompleted: false,
      sideMenuActive: "/",
      contentLoaded: false,
    };
  }
  subscribeByPathname(pathname){
    //根据路由订阅每一页的数据
    let self = this;
    switch (pathname) {
      case '/about':
        Meteor.subscribe('links.all', {
          onReady: function(){
            self.setState({
              contentLoaded: true
            });
          }
        });
        break;
      case '/':
        self.setState({
          contentLoaded: true
        })
        break;
      default:
        self.setState({
          contentLoaded: true
        })
        break;

    }
  }
  componentWillMount(){
    this.setState({
      currentPathName: this.props.location.pathname,
      contentLoaded: false
    });
    this.subscribeByPathname(this.props.location.pathname);

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      contentLoaded: false,
      currentPathName: nextProps.location.pathname
    });
    this.subscribeByPathname(nextProps.location.pathname);
   }
   componentWillUpdate(){
     console.log(this.props.location);

   }
   componentDidUpdate(){
    console.log(this.state);
   }

   changeLoad(){
     this.setState({
       contentLoaded: true,
     });
   }

  render() {
    //主要页面在此引入
    const content = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route  component={NoMatch}/>
        </Switch>
      </div>
    );
    let loadContent = (state) => {
      if (state) {
        return content;
      }else{
        return (
          <div style={{ padding: 24, background: '#fff', minHeight: 360, textAlign: "center" }}>

            <div>
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
            </div>
            <h3>数据加载中，请稍后</h3>
          </div>

        );
      }
    }
    return (
      <Layout style={{height: '100%'}}>


        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}

        >
          <div className="logo" >
            <img src="/img/logo.png" style={{width: "100%"}}/>
          </div>
          <br/><br/><br/>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.currentPathName]}>
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="car" />
                <span className="nav-text">仪表盘</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="car" />
                <span className="nav-text">车辆管理</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="/about">
              <Link to="/about">
                <Icon type="file-text" />
                <span className="nav-text">合同管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span className="nav-text">用户管理</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">角色管理</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="tag" />
              <span className="nav-text">关于</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', position: 'fixed', width: '100%' }} >
            <Switch>
            <Route exact path="/" component={HomeHeader}/>
            <Route path="/about" component={About}/>
            <Route  component={NoMatch}/>
            </Switch>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 80 }}>
            {loadContent(this.state.contentLoaded)}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            SimonXu ©2017 Created For His Gal
            <Button onClick={this.changeLoad.bind(this)}>是某个状态变成加载中</Button>
          </Footer>
        </Layout>
    </Layout>
    );
  }
}


const menu = (
  <Menu>
    <Menu.Item>
    <Link to="/login">
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
    <Button style={{ marginLeft: 8,
    display: "inline-block",
    marginRight: "187px" }}>
      用户名 <Icon type="down" />
    </Button>
 </Dropdown>
)

const NoMatch = () => (
  <div>
    404
  </div>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
const Login = () => (
  <div>
    <h2>Login</h2>
  </div>
)
const HomeHeader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}>

    <h2>仪表盘</h2>
    <HeaderUserArea  />
  </div>
)



const About = () => (
  <div>
    <h2>About</h2>
  </div>
)



export default AppRoutes
