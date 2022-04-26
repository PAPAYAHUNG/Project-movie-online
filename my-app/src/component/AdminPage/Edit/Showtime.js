/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Checkbox, DatePicker, InputNumber, Select } from 'antd';
import { Cascader } from 'antd';
import { manageFilmnServie } from '../../../Services/ManageFilmService';
import { useParams } from 'react-router-dom';
import { adminService } from '../../../Services/AdminService';
import moment from 'moment'
import { useFormik } from 'formik';
export default function Showtime() {
    let params = useParams()
    let idFilm = params.idFilm
    //Create objectFilm to send to server
    let objectFilm = {
        maphim: idFilm,
        ngayChieuGioChieu: "",
        maRap: "",
        giaVe: 0
    }
    let formik = useFormik({
        initialValues: {
            maphim: idFilm,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: 0
        },
        onSubmit: async (values) => {
            console.log(values)
            try {
                let { data } = await adminService.AddShowtimeFilmAdmin(values)
                console.log({ data })
                alert('Add show time succeed')
            } catch (err) {
                console.log(err.response.data)
            }

        },


    })
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //Create state 
    const [state, setState] = useState({
        listCinemaBrand: [],
        listCenimaGroup: []
    })


    console.log({ objectFilm })
    //Transfer original list into label,value to use for ant option
    let newBrandOptions = state.listCinemaBrand?.map((brand, index) => {
        return { value: brand.maHeThongRap, label: brand.tenHeThongRap }
    })

    let newGroupCinemaOption = state.listCenimaGroup?.map((item) => {
        return { value: item.maCumRap, label: item.tenCumRap }
    })
    console.log("listCenimaBrand", newBrandOptions)
    //Method to reduce pressure on reducer to improve performance, however reducing the clean code
    useEffect(() => {
        async function fetchData() {
            try {
                let { data } = await manageFilmnServie.getAllCenima()
                console.log("dataCinema", data.content)

                setState({
                    ...state, listCinemaBrand: data.content
                })
            } catch (err) {
                console.log(err.response.data)
            }
        }
        fetchData()
    }, [])

    const handleChangeBrand = async (value) => {
        console.log({ value });
        try {
            let { data } = await manageFilmnServie.getCinemaGroup(value)
            console.log("listCinemaGroup", data.content)

            setState({
                ...state, listCenimaGroup: data.content
            })
        } catch (err) {
            console.log(err.response.data)
        }

    }
    const handleChangeGroup = (value) => {
        console.log("maRap", value);
        // objectFilm.maRap = value
        formik.setFieldValue('maRap', value)


    }
    const onChangeDatePicker = (value) => {
        // console.log(value);
        // objectFilm.ngayChieuGioChieu = moment(value).format('DD/MM/YYYY hh:mm:ss')
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }
    const onOk = (value) => {
        // console.log('onOk: ', value);
        // objectFilm.ngayChieuGioChieu = moment(value).format('DD/MM/YYYY hh:mm:ss')
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))

    }
    const handleChangeInputNumber = (value) => {
        console.log('onOk: ', value);
        // objectFilm.giaVe = value
        formik.setFieldValue('giaVe', value)


    }
    // const handleSubmit = async () => {
    //     console.log('objectTest: ', objectFilm);
    //     try {
    //         let { data } = await adminService.AddShowtimeFilmAdmin(objectFilm)
    //         console.log({ data })
    //         alert('Add show time succeed')
    //     } catch (err) {
    //         console.log(err.response.data)
    //     }
    // }
    let filmParams = JSON.parse(localStorage.getItem('filmParams'))

    return <div className='mt-4'>
        <h3 className='text-center'>Edit Showtime Films - <span className='text-primary'>{filmParams.tenPhim}</span></h3>
        <div className='row text-center mt-4'>
            <div className='col-4'>
                <img src={filmParams.hinhAnh} style={{ width: 300 }} alt={filmParams.hinhAnh} />
            </div>
            <div className='col-8'>
                <Form onSubmitCapture={formik.handleSubmit} name="basic"
                    labelCol={{
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}>

                    <Form.Item label="Cenima Brand" name="1"   >
                        <Select options={newBrandOptions} onChange={handleChangeBrand} placeholder="Please select Cenima Brand" />
                    </Form.Item>
                    <Form.Item label="Cenima Group " name="2"   >
                        <Select options={newGroupCinemaOption} onChange={handleChangeGroup} placeholder="Please select Cenima Group" />
                    </Form.Item>

                    <Form.Item label="Chosing Date " name="ngayKhoiChieu"   >
                        <DatePicker format={'DD/MM/YYYY hh:mm:ss'} showTime onChange={onChangeDatePicker} onOk={onOk} />
                    </Form.Item>
                    <Form.Item label="Price " name="price"   >
                        <InputNumber min={75000} max={100000} onChange={handleChangeInputNumber} />
                    </Form.Item>
                    <Form.Item label="Action " name="action"   >
                        <button className='btn btn-success'>Create Showtime</button>
                    </Form.Item>
                </Form>
            </div>
        </div>


    </div>
}
