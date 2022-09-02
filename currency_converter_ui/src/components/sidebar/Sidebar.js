import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Sidebar.less';
import { SidebarData } from './SidebarData';
import { Menu, Avatar, Image, Tooltip } from 'antd';
import history from '../../utils/history';
import profilePhoto from '../../assets/foto_perfil.jpg';
import { LogoutOutlined } from '@ant-design/icons';

function Sidebar() {
  const handleMenuClick = (event) => {
    history.push(event.key);
  };

  const { handleLogout, userName } = useContext(AuthContext);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-logo">{/* <img src={logo}></img> */}</div>
        <div className="sidebar-menu">
          <Menu
            defaultSelectedKeys={['/dashboard']}
            mode="inline"
            items={SidebarData}
            onClick={handleMenuClick}
          />
        </div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-info-avatar">
            <Avatar
              size={40}
              src={
                <Image
                  src={profilePhoto}
                  style={{
                    width: 40,
                  }}
                />
              }
            />
          </div>
          <div className="sidebar-user-info-name">{userName}</div>
          <div className="sidebar-user-info-settings">
            <Tooltip title="Logout" color={'#5da980'} key={'tooltip_logout'}>
              <LogoutOutlined
                style={{ fontSize: 20 }}
                onClick={() => handleLogout()}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
