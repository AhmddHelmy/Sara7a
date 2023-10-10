import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    function register(values) {
        console.log(values);
        setIsLoading(true);
        let { data } = axios.post(`https://sara7aiti.onrender.com/api/v1/user`, values).then((data) => {
            console.log(data);
            if (data.data.message == "Added") {
                setIsLoading(false);
                navigate('/login');
            }
        }).catch((err) => {
            console.log(err.response.data.error);
            setApiError(err.response.data.error);
            setIsLoading(false);
        })
    }

    const vaildationSchema = yup.object().shape({
        name: yup.string().required('Name Is Required').min(3, 'Must be 3 characters or more').max(15, 'Must be 15 characters or less'),
        email: yup.string().required('Email Is Required').email('Invalid email address'),
        password: yup.string().required('Password Is Required').matches(/^[a-zA-Z0-9]{6,12}$/, "Invalid password"),
        rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords doesn\'t match').required('RePassword Is Required'),
        age: yup.number().required('Age Is Required').min(10, 'Must be 10 years or more').max(60, 'Must be 60 years or less').positive().integer()
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            age: ""
        },
        validationSchema: vaildationSchema,
        onSubmit: (values) => {
            register(values)
        }
    })
    return (
        <div className="container text-center my-5">
            <div className="user my-3">
                <i className="far fa-edit user-icon" />
                <h4 className="login">Register</h4>
                {apiError ? <div className="alert alert-danger text-dark m-0 p-2">{apiError}</div> : ''}
            </div>
            <div className="card p-5 w-50 m-auto">
                <form onSubmit={formik.handleSubmit}>
                    <div className='form-group'>
                        <input className="form-control" placeholder="Enter your Name" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger text-dark m-0 p-2">{formik.errors.name}</div> : ''}
                    </div>
                    <div className='form-group'>
                        <input className="form-control my-2 " placeholder="Enter your email" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger text-dark m-0 p-2">{formik.errors.email}</div> : ''}
                    </div>
                    <div className='form-group'>
                        <input className="form-control  " placeholder="Enter your Password" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger text-dark m-0 p-2">{formik.errors.password}</div> : ''}
                    </div>
                    <div className='form-group'>
                        <input className="form-control my-2" placeholder="Password Confirmation" type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger text-dark m-0 p-2">{formik.errors.rePassword}</div> : ''}
                    </div>
                    <div className='form-group'>
                        <input className="form-control my-2" placeholder="Age" type="number" name="age" value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.age && formik.touched.age ? <div className="alert alert-danger text-dark m-0 p-2">{formik.errors.age}</div> : ''}
                    </div>
                    <button type='submit' className="btn btn-default-outline my-4 w-100 rounded">
                        {isLoading ? <i className='fa fa-spin fa-spinner me-2'></i> : <> <i className='fa fa-edit me-2'></i>Register</>}

                    </button>
                </form>
            </div>
        </div>

    )
}
