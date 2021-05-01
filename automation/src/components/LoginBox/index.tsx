import styles from './styles.module.scss'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function LoginBox() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function authenticateUser(email, password) {
    if (email == "sibsmetricis@gmail.com" && password == "Metricis@2020") {
      router.push("/home")
    }
  }

  return (
    <div className={styles.box}>
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