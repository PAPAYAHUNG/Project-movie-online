import React, { Fragment, useEffect, useState } from 'react'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { adminService } from '../../Services/AdminService';


export default function UserAdmin() {
  const { Search } = Input;

  const handleSearch = async (value = "") => {
    console.log(value);
    try {
      let { data } = await adminService.FetchUserAdmin(value)
      console.log({ data })
      let modifiedArr = data.content.map((item, index) => {
        return {
          key: index,
          taiKhoan: item.taiKhoan,
          id: index,
          hoTen: item.hoTen,
          matKhau: item.matKhau,
          email: item.email,
          soDt: item.soDt,
        }
      })
      setUserList(modifiedArr)

    } catch (err) {
      console.log(err)
    }

  }



  let [userList, setUserList] = useState([])
  //Fecth data from the server
  useEffect(() => {
    async function FecthUser(keyWord = "") {
      try {
        let { data } = await adminService.FetchUserAdmin(keyWord)
        console.log({ data })
        let modifiedArr = data.content.map((item, index) => {
          return {
            key: index,
            taiKhoan: item.taiKhoan,
            id: index,
            hoTen: item.hoTen,
            matKhau: item.matKhau,
            email: item.email,
            soDt: item.soDt,
          }
        })
        setUserList(modifiedArr)

      } catch (err) {
        console.log(err)
      }

    }
    FecthUser()
  }, [])



  //Table to deploy UI
  const columns = [

    {
      title: 'ID',
      dataIndex: 'id',
      defaultSortOrder: 'descend',
      width: "100px",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'User Account',
      dataIndex: 'taiKhoan',
      // specify the condition of filtering result
      // here is that finding the taiKhoan started with `value`
      sorter: (a, b) => a.taiKhoan.length - b.taiKhoan.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Password',
      dataIndex: 'matKhau',

    },
    {
      title: 'User Name',
      dataIndex: 'hoTen',
      sorter: (a, b) => a.hoTen.length - b.hoTen.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Phone Number',
      dataIndex: 'soDt',
      sorter: (a, b) => a.soDt.length - b.soDt.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => {
        return <Fragment>
          <button className='btn btn-success'>Edit</button>
          <button className='btn btn-danger ml-3'><i class="fa fa-trash-alt"></i></button>
        </Fragment>
      }
    },
  ];

  const data = [
    {
      key: '1',
      taiKhoan: 'John Brown',
      id: 32,
      hoTen: 'New York No. 1 Lake Park',
      matKhau: "1234",
      email: "x@gmail.com",
      soDt: "0776463985",
    },
    {
      key: '2',
      taiKhoan: 'Jim Green',
      id: 42,
      hoTen: 'London No. 1 Lake Park',
      matKhau: "1234",
      email: "x@gmail.com",
      soDt: "0776463985",
    },
    {
      key: '3',
      taiKhoan: 'Joe Black',
      id: 32,
      hoTen: 'Sidney No. 1 Lake Park',
      matKhau: "1234",
      email: "x@gmail.com",
      soDt: "0776463985",
    },
    {
      key: '4',
      taiKhoan: 'Jim Red',
      id: 32,
      hoTen: 'London No. 2 Lake Park',
      matKhau: "1234",
      email: "x@gmail.com",
      soDt: "0776463985",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <div className='container-fluid mt-4 '>
      <h3>Add User</h3>
      <Search
        placeholder="Search user"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
      <div className='mt-5'>
        <Table columns={columns} dataSource={userList} onChange={onChange} />
      </div>
    </div>
  )
}
