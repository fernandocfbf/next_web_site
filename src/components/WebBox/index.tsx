import styles from './styles.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { useWebBox } from '../../context/webBoxContext'

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

  const {
    btnStatus_instiglio,
    btnStatus_social,
    btnStatus_sector,
    btnStatus_lab,
    btnStatus_radarPPP,
    toggleBtn
  } = useWebBox()

  if (box.title == 'Social Finance') {
    var btnStatus = btnStatus_social
  }

  else if (box.title == 'Instiglio') {
    btnStatus = btnStatus_instiglio
  }

  else if (box.title == 'Third Sector') {
    btnStatus = btnStatus_sector
  }

  else if (box.title == 'Go Lab') {
    btnStatus = btnStatus_lab
  }

  else if (box.title == 'Radar PPP') {
    btnStatus = btnStatus_radarPPP
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
        onClick={() => toggleBtn(btnStatus, box.title)}>
        {btnStatus}
      </button>
    </div>
  )

}