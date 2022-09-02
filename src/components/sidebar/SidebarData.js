import React from 'react';

import {
  SettingOutlined,
  WalletOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const SidebarData = [
  getItem('Exchange', '/dashboard', <DollarCircleOutlined />),
  getItem('Purchases', '/purchases', <WalletOutlined />),
  getItem('Settings', '/settings', <SettingOutlined />),
];
