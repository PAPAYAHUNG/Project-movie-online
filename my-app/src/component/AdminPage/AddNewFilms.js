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
import { AddFilmAdminAction, LoadListFilmAdminAction } from '../../redux/action/AdminAction';
import { useNavigate } from 'react-router-dom';

export default function AddNewFilms() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    //Use formik to collect input data
    const formik = useFormik({
        initialValues: {
            maPhim: '',
            tenPhim: '',
            trailer: '',
            moTa: '',
            maNhom: '',
            ngayKhoiChieu: '',
            SapChieu: false,
            DangChieu: false,
            Hot: false,
            danhGia: 0,
            hinhAnh: '',
        },
        onSubmit:async values => {
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
                    formData.append('File',values.hinhAnh,values.hinhAnh.name)
                }
            }
            console.log("formData",formData.get('File'))
            //dispacth this form to the server
            dispatch(AddFilmAdminAction(formData))
            await navigate('/admin/films-admin')
            dispatch(LoadListFilmAdminAction())
        },
    }); 


    //Auto scroll to Top
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

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
        let pickedDay = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue("ngayKhoiChieu", pickedDay)
    }
    const handelChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    //Set useState of src img
    const [srcImg, setSrcImg] = useState(null)


    //Handle to get file from pc
    const handleChangePhoto = (e) => {
        let file = e.target.files[0]
        console.log('file', file)
        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {

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
            //Bring this file data set to formik
            formik.setFieldValue('hinhAnh',file)
        }

    }


    return (
        <div className='mt-5'>
            <h3 className='display-4 text-center'>Add film</h3>
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
                        value={formik.values.name} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer'
                        onChange={formik.handleChange}
                        value={formik.values.name} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input name='moTa'
                        onChange={formik.handleChange}
                        value={formik.values.name} />
                </Form.Item>


                <Form.Item label="Showing Date">
                    <DatePicker

                        name='ngayKhoiChieu'
                        format={'DD/MM/YYYY'}
                        onChange={handleChangeDatePicker}
                    />
                </Form.Item>
                <Form.Item label="Soon" valuePropName="checked"  >
                    <Switch
                        onChange={(value) => {
                            handelChangeSwitch('SapChieu')
                            formik.setFieldValue('SapChieu', value)
                        }} name="SapChieu" />
                </Form.Item>
                <Form.Item label="Showing" valuePropName="checked">
                    <Switch onChange={handelChangeSwitch('DangChieu')} name="DangChieu" />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handelChangeSwitch('Hot')} name="Hot" />
                </Form.Item>
                <Form.Item label="Ranking">
                    <InputNumber name='danhGia' min={1} max={10}
                        onChange={(value) => {
                            formik.setFieldValue('danhGia', value)
                        }} />
                </Form.Item>


                <Form.Item label="Photo">
                    <Input name='hinhAnh' accept="image/png, image/jpeg,image/jpeg"
                        type="file"
                        onChange={handleChangePhoto}
                    />
                    <img  src={srcImg} style={{ width: 160, height: 130 }} alt="..." />
                </Form.Item>

                <Form.Item label="Action">
                    <button onClick={()=>{
                        // dispatch()
                    }} className='btn btn-primary' type='submit'>Submit</button>
                </Form.Item>
            </Form>
        </div>
    )
}
