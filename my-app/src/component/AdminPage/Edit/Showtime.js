import React, { useRef } from 'react'
import { Form, Input, Button, Checkbox, DatePicker, InputNumber } from 'antd';
import { Cascader } from 'antd';

export default function Showtime() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const options = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',

        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',

        },
    ];
    const options2 = [
        {
            value: 'zzz',
            label: 'zzzz',

        },
        {
            value: 'bbbb',
            label: 'bbbbb',

        },
    ];

    const handleChangeBrand = (value) => {
        console.log(value);
    }
    const handleChangeGroup = (value) => {
        console.log(value);
    }
    const onChangeDatePicker = (value) => {
        console.log(value);
    }
    const onOk = (value) => {
        console.log('onOk: ', value);
    }
    const handleChangeInputNumber = (value) => {
        console.log('onOk: ', value);
    }
    return <div>
        <h3 className='text-center'>Edit Showtime</h3>
        <Form name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}>

            <Form.Item label="Cenima Brand" name="1"   >
                <Cascader options={options} onChange={handleChangeBrand} placeholder="Please select Cenima Brand" />
            </Form.Item>
            <Form.Item label="Cenima Group " name="2"   >
                <Cascader options={options2} onChange={handleChangeGroup} placeholder="Please select Cenima Group" />
            </Form.Item>

            <Form.Item label="Chosing Date " name="ngayKhoiChieu"   >
                <DatePicker showTime onChange={onChangeDatePicker} onOk={onOk} />
            </Form.Item>
            <Form.Item label="Price " name="price"   >
                <InputNumber min={75} max={100}  onChange={handleChangeInputNumber} />
            </Form.Item>
            <Form.Item label="Action " name="action"   >
                <button className='btn btn-success'>Create Showtime</button>
            </Form.Item>
        </Form>

    </div>
}
