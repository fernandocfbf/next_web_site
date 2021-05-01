import styles from './styles.module.scss'
import Image from 'next/image'

export function LoginBox() {
  return (
    <div className={styles.box}>
      {/* <Image
        className={styles.backgroundImage}
        width={1000}
        height={1000}
        src='/login-background.png'
        objectFit='contain'
      ></Image> */}

      <div className={styles.textBox}>
        <h2>Login your account</h2>

        <div className={styles.textInput}>
          <p>E-mail</p>
          <input type="text"></input>
        </div>

        <div className={styles.textInput}>
          <p>Password</p>
          <input type="password"></input>
        </div>

        <button type='button'>Login</button>
      </div>

    </div>
  )
}