import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link, useParams } from 'react-router-dom'


export default function SendMessage() {

  let x = useParams();

  async function addMessage(values) {
    let data = {
      ...values,
      receivedId: x.userId
    }
    let res = await axios.post ("https://sara7aiti.onrender.com/api/v1/message", data);
    console.log(res);
  }

  let formik = useFormik ({
    initialValues:{
      messageContent:""
    },
    onSubmit:(values)=>{
      addMessage(values)
    }
  })

  return <>
    <div className='container text-center my-5'>
    </div>
    <div className="container text-center py-5 my-5 text-center">
      <div className="card py-5 mb-5">
        <Link to={'/profile'}>
          <img src="https://cdn3.iconfinder.com/data/icons/media-player-music-video-minimalist-outline-1/48/Video_player_mode_ignito-1024.png" className="avatar img-fluid" alt />
        </Link>
        <h3 className="py-2">Nourhan Saeed</h3>
        <div className="container w-50 m-auto">
          <form onSubmit={formik.handleSubmit}>
            <textarea className="form-control" name='messageContent' value={formik.values.messageContent} onChange={formik.handleChange} id cols={10} rows={9} placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)" defaultValue={""} />
            <button type='submit' className="btn btn-outline-info mt-3"><i className="far fa-paper-plane" /> Send</button>
          </form>
        </div>
      </div>
    </div>
  </>
}
