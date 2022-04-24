import React, { Fragment, useEffect } from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LoadListFilmAdminAction } from '../../redux/action/AdminAction';

import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';





export default function FilmsAdmin() {
  const { listFilmAdmin } = useSelector(state => state.AdminReducer)
  console.log({ listFilmAdmin })

  let dispatch = useDispatch()
  //Dispatch Api action to get data and put to reducer for rerender UI
  useEffect(() => {
    dispatch(LoadListFilmAdminAction())
  }, [])
  const columns = [

    {
      title: 'ID',
      dataIndex: 'maPhim',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.maPhim - b.maPhim,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'hinhAnh',
      width:200,
      render: (text, record, index) => {
        return <img key={index} src={text} alt='text' style={{ width: 100 }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "https://picsum.photos/500";
          }}
        // onError={(e)=>{e.target.onerror = null;e.target.src='https://picsum.photo/500'}} />
        />
      },

    },

    {
      title: 'Name',
      dataIndex: 'tenPhim',

      onFilter: (value, record) => record.tenPhim.indexOf(value) === 0,
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
      sortDirections: ['descend'],

    },
    {
      title: 'Description',
      dataIndex: 'moTa',
      render: (text, record, index) => {
        return text.length > 30 ? `${text.slice(0, 30)}...` : text
      },

    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => {
        return <Fragment key={index} >
          <button className='btn btn-primary '><i className="fa fa-edit"></i></button>
          <button className='btn btn-danger ml-3 '><i className="fa fa-trash-alt"></i></button>
        </Fragment>
      },

    },
  ];


  let newListFilmsAdmin = listFilmAdmin.map((item, index) => {
    return {
      key: `${index}`,
      maPhim: item.maPhim,
      hinhAnh: item.hinhAnh,
      tenPhim: item.tenPhim,
      moTa: item.moTa
    }
  })
  console.log({ newListFilmsAdmin })
  const data = [
    {
      key: '1',
      maPhim: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      maPhim: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      maPhim: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      maPhim: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  //Search ant design
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const onSearch = value => console.log(value);
  return (
    <div className='mt-4'>
      <Search
        placeholder="Input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table className='mt-3' columns={columns} dataSource={newListFilmsAdmin} onChange={onChange} />
    </div>
  )
}
