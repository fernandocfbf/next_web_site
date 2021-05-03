import styles from './styles.module.scss'
import Image from 'next/image'

type Box = {
  icon: string,
  title: string,
  value: string
}

type BoxProps = {
  box: Box
}

export function AiBox({ box }: BoxProps) {

  return (
    <div className={styles.aiBox}>

      <span className={styles.iconBack}>
        <span className={styles.icon}>

          <Image
            width={70}
            height={70}
            objectFit="contain"
            src={box.icon}>

          </Image>
        </span>
      </span>


      <div className={styles.text}>

        <p>{box.title}</p>
        <br></br>
        <h1>{box.value}</h1>
      </div>

    </div>
  )
}