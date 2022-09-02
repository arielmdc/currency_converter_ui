import React, { useState } from 'react';
import './FormComponent.less';
import { Button, Form, Select, Radio, InputNumber, Tooltip } from 'antd';
import axios from '../../utils/axiosConfig';
import Swal from 'sweetalert2';
import QRCode from '../../assets/qr_code.png';

import CreditCard from '../paymentsComponents/CreditCard';

const { Option } = Select;

const FormComponent = () => {
  const [form] = Form.useForm();
  const [cardChecked, setCardChecked] = useState();
  const [originCurrency, setOriginCurrency] = useState('BRL');
  const [value, setValue] = useState(1000);

  const onChangeValue = (event) => {
    setValue(event);
  };

  const onChangeOriginCurrency = (event) => {
    setOriginCurrency(event);
  };

  const onChangeCardRadio = (event) => {
    setCardChecked(true);
  };

  const onChangeBankSlipRadio = (event) => {
    if (typeof cardChecked == 'undefined') {
      setCardChecked(false);
    } else {
      setCardChecked(!cardChecked);
    }
  };

  const onFinish = (values) => {
    axios
      .post('api/exchange/post', values)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Exchange done',
          html: `<div>Moeda de origem: ${res.data.origin_currency} </div>
                 <div>Moeda de destino: ${res.data.destination_currency} </div>
                 <div>Valor: ${res.data.value} </div>
                 <div>Forma de pagamento: ${res.data.payment_method_name} </div>
                 <div>Taxa forma de pagamento: ${res.data.payment_method_fee} </div>
                 <div>Taxa de conversão: ${res.data.convertion_fee} </div>
                 <div>Valor descontado usado para a conversão: ${res.data.discounted_value} </div>
                 <div>Valor trocado: ${res.data.exchanged_value}</div>
                 `,
          footer: '<a class="alertReport" href="">Contact our support</a>',
          timer: 60000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })
      .catch((error) => {});
  };

  return (
    <Form
      form={form}
      className="form-componenet-box"
      name="register"
      onFinish={onFinish}
      initialValues={{
        origin_currency: 'BRL',
        destination_currency: 'USD',
        value: 1000,
      }}
      scrollToFirstError
    >
      <div className="form-inside-box">
        <div className="form-title">
          <h1>Conversor Contass</h1>
        </div>
        <Form.Item
          name="value"
          label="Valor"
          rules={[
            {
              required: true,
              message: 'Please insert the origin value',
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={1000}
            max={100000}
            onChange={onChangeValue}
          />
        </Form.Item>
        <Form.Item
          name="origin_currency"
          label="Moeda base"
          rules={[
            {
              required: true,
              message: 'Please select origin currency!',
            },
          ]}
        >
          <Select placeholder="Please select" onChange={onChangeOriginCurrency}>
            <Option value="BRL">BRL</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="destination_currency"
          label="Moeda de destino"
          rules={[
            {
              required: true,
              message: 'Please select destination currency',
            },
          ]}
        >
          <Select placeholder="Please select">
            <Option value="USD">USD</Option>
            <Option value="EUR">EUR</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="payment_method"
          label="Forma de pagamento"
          rules={[
            {
              required: true,
              message: 'Please pick an method!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="credit_card" onChange={onChangeCardRadio}>
              Cartão
            </Radio>
            <Radio value="billet" onChange={onChangeBankSlipRadio}>
              Boleto
            </Radio>
          </Radio.Group>
        </Form.Item>

        {cardChecked && typeof cardChecked != 'undefined' && (
          <div className="credit-card">
            <CreditCard />
          </div>
        )}
        {!cardChecked && typeof cardChecked != 'undefined' && (
          <>
            <div className="bankSlip">
              <div>Escaneie o QR Code para efetuar o pagamento</div>
              <img className="payment-qrcode" alt="qrcode" src={QRCode} />
            </div>
          </>
        )}
        {typeof cardChecked != 'undefined' && (
          <div className="exchange-alerts">
            <Tooltip
              placement="right"
              title={`Taxa aplicada no valor base em ${originCurrency}`}
              color={'#5da980'}
              key={'tooltip_payment_tax'}
            >
              {cardChecked && typeof cardChecked != 'undefined' ? (
                <span>Taxa forma de pagamento: 7,63%</span>
              ) : (
                <span>Taxa forma de pagamento: 1,45%</span>
              )}
            </Tooltip>
            <Tooltip
              placement="right"
              title={`1% ≥ 3000 ${originCurrency} e 2% < 3000 ${originCurrency}`}
              color={'#5da980'}
              key={'tooltip_convertion_tax'}
            >
              {value < 3000 ? (
                <span>Taxa de conversão: 2%</span>
              ) : (
                <span>Taxa de conversão: 1%</span>
              )}
            </Tooltip>
          </div>
        )}
        <Button
          style={{ width: '100%', fontWeight: 'bold' }}
          type="primary"
          htmlType="submit"
        >
          Exchange
        </Button>
      </div>
    </Form>
  );
};

export default FormComponent;
