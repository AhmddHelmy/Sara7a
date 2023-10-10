import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { tokenContext } from '../../Context/tokenContext';


export default function Login() {

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    let {setToken} = useContext(tokenContext)

    function login(values) {
        setIsLoading(true);
        let { data } = axios.post(`https://sara7aiti.onrender.com/api/v1/user/signin`, values).then((data) => {
            console.log(data);
            if (data.data.message == "welcome") {
                setIsLoading(false);
                localStorage.setItem('userToken', data.data.token);
                setToken (data.data.token);
                navigate('/profile');
            }
        }).catch((err) => {
            console.log(err.response.data.error);
            setApiError(err.response.data.error);
            setIsLoading(false);
        })
    }

    const vaildationSchema = yup.object().shape({
        email: yup.string().required('Email Is Required').email('Invalid email address'),
        password: yup.string().required('Password Is Required').matches(/^[a-zA-Z0-9]{6,12}$/, "Invalid password")
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: vaildationSchema,
        onSubmit: (values) => {
            login(values)
        }
    })

    return (
        <div className="container text-center my-5">
            <div className="user my-3">
                <i className="far fa-edit user-icon" />
                <h4 className="login">Login</h4>
                {apiError ? <div className="alert alert-danger text-dark m-0 p-2">{apiError}</div> : ''}
            </div>
            <div className="card p-5 w-50 m-auto">
                <form onSubmit={formik.handleSubmit}>
                    <div className='form-group'>
                        <input className="form-control my-2 " placeholder="Enter your email" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger text-dark m-0 p-2">{formik.errors.email}</div> : ''}
                    </div>
                    <div className='form-group'>
                        <input className="form-control  " placeholder="Enter your Password" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger text-dark m-0 p-2">{formik.errors.password}</div> : ''}
                    </div>
                    <button type='submit' className="btn btn-default-outline my-4 w-100 rounded">
                        {isLoading ? <i className='fa fa-spin fa-spinner me-2'></i> : <> <i className='fa fa-edit me-2'></i>Login</>}
                    </button>
                </form>
            </div>
        </div>

    )
}
