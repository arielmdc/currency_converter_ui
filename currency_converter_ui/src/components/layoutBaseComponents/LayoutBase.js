import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Recharts from '../charts/Recharts';

import { Skeleton, Carousel } from 'antd';

const contentStyle = {
  height: '60px',
  lineHeight: '50px',
  textAlign: 'center',
  color: '#FFFFFF',
  background: '#5da980',
};

export default function LayoutBase({ Page, withNavbar, withSidebar }) {
  return (
    <div className="container">
      <div className="left-grid">
        <Sidebar />
      </div>
      <div className="middle-grid">
        <div className="middle-box">
          <Page />;
        </div>
      </div>
      <div className="right-grid">
        <div className="right-grid-tittle">
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>BRL x USD</h3>
            </div>
            <div>
              <h3 style={contentStyle}>BRL x EUR</h3>
            </div>
          </Carousel>
        </div>
        <Recharts />
        <div className="right-grid-info-box">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
  );
}
