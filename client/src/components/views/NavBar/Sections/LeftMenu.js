import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <SubMenu title={<span>my page</span>}>
        <Menu.Item key="setting:1" >
        <a href='/mywrite'>my reservation</a>
        </Menu.Item>
        <Menu.Item key="setting:2" >
        <a href='/writepage'>결제 내용</a>
        </Menu.Item>
    </SubMenu>
    <Menu.Item >
      <a href='/search'>search</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu