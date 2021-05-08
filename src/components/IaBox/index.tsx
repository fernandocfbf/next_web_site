import styles from './styles.module.scss'
import Image from 'next/image'
import {AiFillRocket, AiOutlineDotChart} from 'react-icons/ai'

type Box = {
  icon: string,
  title: string,
  value: string,
  type: number
}

type BoxProps = {
  box: Box
}

export function AiBox({ box }: BoxProps) {

  return (
    <div className={styles.aiBox}>

      <span className={styles.iconBack}>
        <span className={styles.icon}>
          {box.type ? (<AiFillRocket size="100%" color="#ffff"></AiFillRocket>) :
           (<AiOutlineDotChart size="90%" color="#ffff"></AiOutlineDotChart>)}
        </span>
      </span>

      <p>{box.title}</p>
      <h1>{box.value}</h1>


    </div>
  )
}