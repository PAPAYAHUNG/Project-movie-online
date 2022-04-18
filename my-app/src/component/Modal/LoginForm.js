import React from 'react'
import { NavLink } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { SignUp } from '../../redux/action/ManagerAction';
import { useNavigate } from 'react-router-dom';
function LoginForm(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    console.log(values)
    let navigate = useNavigate()

    return (
        <div className='' style={{ overflow: 'hidden' }}>
            <div className='row'>
                <div className='col-6'>
                    <img src='./Images/848488.jpg' className='img-fluid ' style={{ height: '100vh', width: '100%' }} alt='123' />
                </div>
                <div className='col-6  d-flex align-items-center justify-content-center ' >
                    <div  >
                        <h1 className='text-primary'>SIGN UP</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">User</label>
                                <div className="col-sm-10">
                                    <input style={{ width: '100%' }} type="text" className="form-control"
                                        name='taiKhoan'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} />
                                    {touched.taiKhoan && errors.taiKhoan ? (
                                        <div className='text-danger'>{errors.taiKhoan}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-group row " style={{ minWidth: 500 }}>
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input style={{ width: '100%' }} type="email" className="form-control" id="inputEmail3"
                                        name='email'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} />
                                    {touched.email && errors.email ? (
                                        <div className='text-danger'>{errors.email}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input style={{ width: '100%' }} type="hoTen" className="form-control"
                                        name='hoTen'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} />
                                    {touched.hoTen && errors.hoTen ? (
                                        <div className='text-danger'>{errors.hoTen}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input style={{ width: '100%' }} type="password" className="form-control"
                                        name='matKhau'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} />
                                    {touched.matKhau && errors.matKhau ? (
                                        <div className='text-danger'>{errors.matKhau}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Repeat Password</label>
                                <div className="col-sm-10">
                                    <input style={{ width: '100%' }} type="password" className="form-control"
                                        name='confirmMatKhau'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} />
                                    {touched.confirmMatKhau && errors.confirmMatKhau ? (
                                        <div className='text-danger'>{errors.confirmMatKhau}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Phone number</label>
                                <div className="col-sm-10">
                                    <input style={{ width: '100%' }} type="tel" className="form-control"
                                        name='soDt'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} />
                                    {touched.soDt && errors.soDt ? (
                                        <div className='text-danger'>{errors.soDt}</div>
                                    ) : null}
                                </div>
                            </div>


                            <div className='d-flex justify-content-end'>
                                <div className="">
                                    <button type="submit" className="btn btn-primary mr-3">Sign up</button>
                                </div>
                                <NavLink to='signIn' className="">
                                    <button onClick={() => {
                                             navigate(`/signIn`,{ replace: true })
                           
                                        }} type="button" className="btn btn-primary">Sign in <i className="fa fa-angle-double-right"></i></button>
                                </NavLink>
                            </div>

                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}

const MyEnhancedFormSignUp = withFormik({

    mapPropsToValues: () => ({
        taiKhoan: '',
        matKhau: "",
        confirmMatKhau: "",
        email: "",
        soDt: "",
        maNhom: "",
        hoTen: ""
    }),

    validationSchema: Yup.object({
        // phoneRegExp: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,

        soDt: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
        taiKhoan: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        hoTen: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        matKhau: Yup.string().required('Password is required'),
        confirmMatKhau: Yup.string()
            .oneOf([Yup.ref('matKhau'), null], 'Passwords must match')

    }),

    handleSubmit: (values, {props, setSubmitting }) => {
        console.log({ values })
        props.dispatch(SignUp(values))
    },

    displayName: 'BasicForm',
})(LoginForm);

export default connect () (MyEnhancedFormSignUp)