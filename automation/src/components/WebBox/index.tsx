import styles from './styles.module.scss'
import Image from 'next/image'
import { useState } from 'react'

type Box = {
  title: string,
  text: string,
  image_path: string,
  height: number,
  width: number
}

type BoxProps = {
  box: Box
}

export function WebBox({ box }: BoxProps) {

  const [btnStatus, setBtnStatus] = useState("unselected")

  function handler_state(){
    if(btnStatus == "unselected"){
      setBtnStatus("selected")
    }

    else{
      setBtnStatus("unselected")
    }
  }

  return (
    <div className={btnStatus == "selected" ? styles.selectedBox : styles.unselectedBox}>
      <span className={styles.circle}>
        <div className={styles.imageBackground}>
          <Image
            width={box.width}
            height={box.height}
            src={box.image_path}
            objectFit='contain'>
          </Image>
        </div>
      </span>

      <h1 className={styles.title}>{box.title}</h1>
      <p className={styles.text}>{box.text}</p>
      <button
      className={btnStatus == "selected" ? styles.selected : styles.unselected}
      onClick={()=>handler_state()}>
        {btnStatus}
      </button>
    </div>
  )

}