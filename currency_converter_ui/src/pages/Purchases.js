import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import { Table } from 'antd';
import axios from '../utils/axiosConfig';

const columns = [
  {
    title: 'Data da troca',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Origem',
    dataIndex: 'origin_currency',
    key: 'origin_currency',
  },
  {
    title: 'Destino',
    dataIndex: 'destination_currency',
    key: 'destination_currency',
  },
  {
    title: 'Valor',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Cotação',
    dataIndex: 'destination_currency_price',
    key: 'destination_currency_price',
  },
  {
    title: 'Forma de pagamento',
    dataIndex: 'payment_method',
    key: 'payment_method',
  },
  {
    title: 'Taxa pagamento',
    dataIndex: 'payment_method_fee',
    key: 'payment_method_fee',
  },
  {
    title: 'Taxa conversão',
    dataIndex: 'convertion_fee',
    key: 'convertion_fee',
  },
  {
    title: 'Valor descontado',
    dataIndex: 'discounted_value',
    key: 'discounted_value',
  },
  {
    title: 'Valor trocado',
    dataIndex: 'exchanged_value',
    key: 'exchanged_value',
  },
];

function createData(
  created_at,
  origin_currency,
  destination_currency,
  value,
  destination_currency_price,
  payment_method,
  payment_method_fee,
  convertion_fee,
  discounted_value,
  exchanged_value
) {
  return {
    created_at,
    origin_currency,
    destination_currency,
    value,
    destination_currency_price,
    payment_method,
    payment_method_fee,
    convertion_fee,
    discounted_value,
    exchanged_value,
  };
}

function dataFormat(data) {
  const data_formatada = new Date(data).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  return data_formatada;
}

function Purchases() {
  const { userId } = useContext(AuthContext);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const getUserHistory = async () => {
      await axios
        .get('api/user/history/' + userId)
        .then((res) => {
          let options2 = [];
          Object.entries(res.data).forEach(([key, item]) => {
            // console.log(item);
            options2.push(
              createData(
                dataFormat(item.created_at),
                item.origin_currency,
                item.destination_currency,
                item.value,
                item.destination_currency_price,
                item.payment_method,
                item.payment_method_fee,
                item.convertion_fee,
                item.discounted_value,
                item.exchanged_value
              )
            );
          });
          setRows(options2);
        })
        .catch((error) => {});
    };
    getUserHistory();
  }, [userId]);
  return (
    <div className="history-box">
      <h1>Histórico de conversões</h1>
      <Table
        columns={columns}
        dataSource={rows}
        size="small"
        pagination={{ pageSize: 12 }}
      />
    </div>
  );
}

export default Purchases;
