import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector}  from 'react-redux'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Upload,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import moment from 'moment'
import { getInfoEditFilmAdminAction, UpdateInfoEditFilmAdminAction } from '../../../redux/action/AdminAction';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { GROUP } from '../../../redux/types/type-constant';


export default function Edit() {
    let dispatch = useDispatch()

    let {idFilm} = useParams()
    console.log(idFilm)
    //Load the clicked film that wanted to edit
    useEffect(()=>{
        dispatch(getInfoEditFilmAdminAction(idFilm))
    },[])

    let navigate = useNavigate()

    //Get data edit from reducer
    let {filmEditInfo} = useSelector(state=>state.AdminReducer)
    console.log({filmEditInfo})
    //Use formik to collect input data
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            maPhim: filmEditInfo.maPhim,
            tenPhim: filmEditInfo.tenPhim,
            trailer: filmEditInfo.trailer,
            moTa: filmEditInfo.moTa,
            maNhom: GROUP,
            ngayKhoiChieu: filmEditInfo.ngayKhoiChieu,
            SapChieu: filmEditInfo.sapChieu,
            DangChieu: filmEditInfo.dangChieu,
            Hot: filmEditInfo.hot,
            danhGia: filmEditInfo.danhGia,
            hinhAnh: null,
        },
        onSubmit: values => {
            //   alert(JSON.stringify(values, null, 2));
            console.log({ values })
            values.maNhom='GP15'
            //Create form data object
            let formData = new FormData()
            let tenPhim = formik.values.tenPhim
            
            for(let key in values){
                if(key!=="hinhAnh" ){
                    formData.append(key,values[key])
                }
                else{
                    if(values.hinhAnh!==null){
                        formData.append('File',values.hinhAnh,values.hinhAnh.name)
                    }
                }
            }
            console.log("formData",formData.get('File'))
            // dispacth this form to the server
            dispatch(UpdateInfoEditFilmAdminAction(formData,navigate))
        },
    }); 


    console.log('hot',formik.values.ngayKhoiChieu)
    

    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    //Handle for chosing day action
    const handleChangeDatePicker = (value) => {
        let pickedDay = moment(value)
        formik.setFieldValue("ngayKhoiChieu", pickedDay)
    }
    const handelChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    //Set useState of src img
    const [srcImg, setSrcImg] = useState('')

    //Handle to get file from pc
    const handleChangePhoto = async (e) => {
        let file = e.target.files[0]
        console.log('file', file)
        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {

            //Bring this file data set to formik
          await  formik.setFieldValue('hinhAnh',file)

            //Create object to reader file
            let reader = new FileReader()
            //Read file and turn into url
            reader.readAsDataURL(file)
            //Use onload to catch this url 
            reader.onload = (e) => {
                let imgUrl = e.target.result
                //setState with format base 64 for img
                setSrcImg(imgUrl)
            }
            
        }

    }


    return (
        <div className='mt-5'>
            <h3 className='display-4 text-center'>Edit film</h3>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Name">
                    <Input name='tenPhim'
                        onChange={formik.handleChange}
                        value={formik.values.tenPhim} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer'
                        onChange={formik.handleChange}
                        value={formik.values.trailer} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input name='moTa'
                        onChange={formik.handleChange}
                        value={formik.values.moTa} />
                </Form.Item>


                <Form.Item label="Showing Date">
                    <DatePicker

                        name='ngayKhoiChieu'
                        format={'DD/MM/YYYY'}
                        onChange={handleChangeDatePicker}
                        value={moment(formik.values.ngayKhoiChieu)}
                    />
                </Form.Item>
                <Form.Item label="Soon" valuePropName="checked"  >
                    <Switch checked={formik.values.SapChieu}
                        onChange={(value) => {
                            handelChangeSwitch('SapChieu')
                            formik.setFieldValue('SapChieu', value)
                        }} name="SapChieu" />
                </Form.Item>

                <Form.Item  label="Showing" valuePropName="checked">
                    <Switch checked={formik.values.DangChieu} onChange={handelChangeSwitch('DangChieu')} name="DangChieu" />
                </Form.Item>

                <Form.Item label="Hot" valuePropName="checked">
                    <Switch checked={formik.values.Hot}  onChange={handelChangeSwitch('Hot')} name="Hot" />
                </Form.Item>

                <Form.Item label="Ranking">
                    <InputNumber name='danhGia' min={1} max={10}
                    value={formik.values.danhGia}
                        onChange={(value) => {
                            formik.setFieldValue('danhGia', value)
                        }} />
                </Form.Item>


                <Form.Item label="Photo">
                    <Input name='hinhAnh' accept="image/png, image/jpeg,image/jpeg"
                        type="file"
                        onChange={handleChangePhoto}
                    />
                    <img  src={srcImg===""?filmEditInfo.hinhAnh:srcImg} 
                    style={{ width: 160, height: 130 }} alt="..." />
                </Form.Item>

                <Form.Item label="Action">
                    <button className='btn btn-primary' type='submit'>Update</button>
                </Form.Item>
            </Form>
        </div>
    )
}
