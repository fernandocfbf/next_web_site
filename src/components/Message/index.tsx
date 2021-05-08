import React from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import styles from './styles.module.scss'


type Message = {
  type: string,
  message: string
}

type MessageProps = {
  message: Message
}

export function Message({ message }: MessageProps) {

  if (message.type == "error") {
    return (
      <div className={styles.messageBoxError}>
        <AiOutlineClose
          style={{ marginLeft: "1rem" }}
          size="1.5rem"
          color='red'>

        </AiOutlineClose>
        <div>
          <p>{message.message}</p>
        </div>

      </div>
    )
  }

  else {
    return (
      <div className={styles.messageBoxSuccess}>
        <AiOutlineCheck
          style={{ marginLeft: "1rem" }}
          size="1.5rem"
          color='green'>

        </AiOutlineCheck>
        <p>{message.message}</p>
      </div>
    )
  }

}