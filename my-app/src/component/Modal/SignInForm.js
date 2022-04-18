import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector } from 'react-redux';
import { SignIn, SignUp } from '../../redux/action/ManagerAction';
import { useNavigate } from 'react-router-dom';
function SignInForm(props) {
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
    let location = useLocation()
    console.log({location})
   let {isAuth}= useSelector(state=>state.UserLoginReducer)

    return (
        <div>
            <div className='' style={{ overflow: 'hidden' }}>
                <div className='row'>
                    <div className='d-none d-md-block col-md-6'>
                        <img src='https://picsum.photos/2000' className='img-fluid ' style={{ height: '100vh', width: '100%' }} alt='123' />
                    </div>
                    <div className='col-12 col-md-6  d-flex align-items-center justify-content-center ' >
                        <div style={{ minWidth: 400 }} >
                            <h1 className='text-success'>SIGN IN</h1>
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


                                <div className='d-flex justify-content-end'>
                                    <div className="">
                                        <button type="submit" onClick={() => {

                                            let malichChieu = localStorage.getItem('maLichChieu')
                                            setTimeout(()=>{
                                                if (localStorage.getItem('ACCESS_TOKEN_MOVIE')) {
                                                    // navigate(`/booking${malichChieu}`)
                                                    navigate(-1)
                                                    
                                                }
                                                else {
                                                    alert('Wrong user account')
                                                }
                                            },500)
                                        }}
                                            className="btn btn-success ">Sign in</button>
                                    </div>
                                </div>
                                    <div className="text-center">
                                        <h5 className="text-primary " >Don't have an account</h5>
                                        <button onClick={() => {
                                             navigate(`/signUp`,{ replace: true })
                                           
                                        }} type="submit" className="btn btn-primary ">Sign up <i className="fa fa-angle-double-right"></i></button>
                                    </div>

                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

const MyEnhancedFormSignIN = withFormik({

    mapPropsToValues: () => ({
        taiKhoan: '',
        matKhau: "",

    }),

    validationSchema: Yup.object({
        // phoneRegExp: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,

        taiKhoan: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        matKhau: Yup.string().required('Password is required'),

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log({ values })
        props.dispatch(SignIn(values))
    },

    displayName: 'BasicForm',
})(SignInForm);

export default connect()(MyEnhancedFormSignIN)