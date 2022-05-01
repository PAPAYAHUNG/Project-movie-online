import React, { Fragment, useEffect } from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DeleteFilmAdminAction, LoadListFilmAdminAction, SearchFilmAdminAction } from '../../redux/action/AdminAction';

import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';





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
      width: 200,
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
      dataIndex: 'maPhim',
      render: (text, record, index) => {
        return <Fragment key={index} >
          <NavLink to={`edit/${record.maPhim}`} replace><button className='btn btn-primary '><i className="fa fa-edit"></i></button></NavLink>

          <span ><button className='btn btn-danger mx-3'
            onClick={() => {
              console.log('maPhim', record.maPhim)
              console.log('typemaPhim', typeof (record.maPhim))

              if (window.confirm(`Please confirm to delete: ${record.tenPhim}`)) {
                dispatch(DeleteFilmAdminAction(record.maPhim))
              }
            }}>
            <i className="fa fa-trash-alt"></i></button>
          </span>
          <NavLink to={`showTime/${record.maPhim}`}>
            <button onClick={()=>{
              localStorage.setItem('filmParams',JSON.stringify(record))
            }} className='btn btn-warning'>
              <i class="fa fa-calendar-alt"></i>
            </button>
          </NavLink>
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

  function onChange1(pagination, filters, sorter, extra) {
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

  const onSearch = (value) => {
    // console.log(value.nativeEvent.data)
    dispatch(LoadListFilmAdminAction(value))

  };
  return (
    <div className='mt-4 outlet-manage-film-admin'>
      <Search
        placeholder="Input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      // onChange={onSearch}
      />
      <Table className='mt-3' rowKey={"maPhim"} columns={columns} dataSource={newListFilmsAdmin} onChange={onChange1} />
    </div>
  )
}
