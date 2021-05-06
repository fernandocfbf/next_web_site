import styles from './styles.module.scss'
import { Header } from '../../components/Header'
import { WebBox } from '../../components/WebBox'

export default function WebScraping() {
  return (
    <div className={styles.webPage}>
      <Header></Header>

      <div className={styles.title}>
        <h1>Searching Through the Web</h1>
        <span></span>
      </div>

      <div className={styles.institutions}>
        <WebBox box={{
          title: "Social Finance",
          text: "We combine social and financial insight to help our partners"
            + "make a difference to enduring problems",
          image_path: "/social.png",
          height: 100,
          width: 100
        }}></WebBox>

        <WebBox box={{
          title: "Third Sector",
          text: "Our mission is to accelerate the transition to a"
            + "performance-driven social sector.",
          image_path: "/sector.png",
          height: 90,
          width: 90
        }}></WebBox>

        <WebBox box={{
          title: "Instiglio",
          text: "Ensure that every cent spent to alleviate poverty has the"
            + "greatest possible impact",
          image_path: "/instiglio.png",
          height: 150,
          width: 150
        }}></WebBox>

        <WebBox box={{
          title: "Go Lab",
          text: "The Government Outcomes Lab (GO Lab) represents a"
            + " example of research-to-practice innovation",
          image_path: "/golab.png",
          height: 100,
          width: 100
        }}></WebBox>
      </div>


    </div>

  )
}