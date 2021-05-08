import styles from './styles.module.scss'
import Snackbar from '@material-ui/core/Snackbar';
import {Message} from '../Message'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function LoginBox() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)

  function authenticateUser(email, password) {
    if (email == "sibsmetricis@gmail.com" && password == "Metricis@2020") {
      router.push("/home")
    }

    else {
      setOpen(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={styles.box}>
      <Snackbar style={{width:"20rem", height:"2.5rem"}} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Message message={{type:"error", message:"Incorrect user or password"}}></Message>
      </Snackbar>
      <div className={styles.textBox}>
        <h2>Login your account</h2>

        <div className={email.length == 0 ? styles.textInputGray : styles.textInputColor}>
          <p>E-mail</p>
          <input
            className={email.length == 0 ? styles.inputFieldGray : styles.inputFieldColor}
            onChange={event => setEmail(event.target.value)}
            type="text">
          </input>
        </div>

        <div className={password.length == 0 ? styles.textInputGray : styles.textInputColor}>
          <p>Password</p>
          <input
            className={password.length == 0 ? styles.inputFieldGray : styles.inputFieldColor}
            onChange={event => setPassword(event.target.value)}
            type="password">
          </input>
        </div>

        <button
          onClick={() => authenticateUser(email, password)}
          type='button'>
          Login
        </button>
      </div>



    </div>
  )
}