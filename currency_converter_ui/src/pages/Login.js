import React, { useContext, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Button, Form, Input } from 'antd';
import Preloader from '../components/loader/Preloader';
import { AuthContext } from '../contexts/AuthContext.js';
import logoContass from '../assets/logo_contass.png';
import Swal from 'sweetalert2';

import useAxios from '../utils/axiosConfig';

import { useCookies } from 'react-cookie';

function Login() {
  const url = useLocation();
  const {
    loadingAuth,
    isAuthenticated,
    setUserName,
    setUserId,
    setUserEmail,
    setIsAuthenticated,
  } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(['access-token']);

  const onSubmit = async (payload) => {
    try {
      setloading(true);

      const { data } = await useAxios.post('api/login', payload);

      if (data.login) {
        setCookie('jwt_token', data.jwt_token, {
          path: '/',
          maxAge: 12 * 60 * 60, //12h
        });

        setUserId(data.id);
        setUserEmail(data.email);
        setUserName(data.name);
        // setUserRoles(data.response.roles);
        setIsAuthenticated(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'E-mail ou senha inválido',
          footer: '<a class="alertReport" href="">Contact our support</a>',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      if (err.response) setError(err.response.data.msg);
      else setError('Estamos em manutenção. Tente mais tarde.'); //API fora do AR
      setloading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  if (loadingAuth) return <Preloader />;

  if (isAuthenticated)
    return (
      <Redirect to={url.search ? url.search.replace('?redirect=', '') : '/'} />
    );

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logoContass} alt="logo_contass"></img>
        <Form
          name="basic"
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <label>E-mail:</label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <label>E-mail:</label>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              style={{ fontWeight: 'bold' }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
