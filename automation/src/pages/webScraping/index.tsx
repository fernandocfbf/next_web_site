import styles from './styles.module.scss'
import { Header } from '../../components/Header'
import { WebBox } from '../../components/WebBox'
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import { useEffect, useState } from 'react';
import api from '../../services/api'


export default function WebScraping() {

  const [upDateMongoAtlas, setUpDateMongoAtlas] = useState(false)
  const [disableDownload, setDisableDownload] = useState(true)
  const [loading, setLoading] = useState(false)
  const [dataToDownload, setDataToDownload] = useState([])

  function handlerUpdate() {
    setUpDateMongoAtlas(!upDateMongoAtlas) //inverte o valor da variável
  }

  function handlerLoading() {
    setLoading(!loading)
  }

  function searchSocial() {
    api.post('webScraping_social', { reconhecer: upDateMongoAtlas }).then(resp => {
      const resposta = resp.data.slice(6, resp.data.length - 4)

      if (resposta != false && resposta != ["\r\n\r\n\r\n"] && resposta.length > 0) {
        const resposta_formatada = resposta.replace("[", "").replace("]", "").replaceAll("'", "").split(",")
        var new_data = dataToDownload

        for (var i = 0; i < resposta_formatada.length; i++) {
          new_data.push({
            'source': "Social Finance",
            'link': resposta_formatada[i]
          })
        }
        setDataToDownload(new_data)
      }
      return resposta
    }).catch((err) => {
      return false
    })
  }

  function searchInstiglio() {
    api.post('webScraping_instiglio', { reconhecer: upDateMongoAtlas }).then(resp => {
      const resposta = resp.data.slice(6, resp.data.length - 4)

      if (resposta != false && resposta != ["\r\n\r\n\r\n"] && resposta.length > 0) {
        const resposta_formatada = resposta.replace("[", "").replace("]", "").replaceAll("'", "").split(",")
        var new_data = dataToDownload

        for (var i = 0; i < resposta_formatada.length; i++) {
          new_data.push({
            'source': "Instiglio",
            'link': resposta_formatada[i]
          })
        }

        setDataToDownload(new_data)
        console.log(dataToDownload)
      }
      return resposta
    }).catch((err) => {
      return false
    })
  }

  function searchSector() {
    api.post('webScraping_sector', { reconhecer: upDateMongoAtlas }).then(resp => {
      const resposta = resp.data.slice(6, resp.data.length - 4)

      if (resposta != false && resposta != ["\r\n\r\n\r\n"] && resposta.length > 0) {
        const resposta_formatada = resposta.replace("[", "").replace("]", "").replaceAll("'", "").split(",")
        var new_data = dataToDownload

        for (var i = 0; i < resposta_formatada.length; i++) {
          new_data.push({
            'source': "Third Sector",
            'link': resposta_formatada[i]
          })
        }

        setDataToDownload(new_data)
      }
      return resposta
    }).catch((err) => {
      return false
    })
  }

  function serachLab() {
    api.post('webScraping_lab', { reconhecer: upDateMongoAtlas }).then(resp => {
      const resposta = resp.data.slice(6, resp.data.length - 4)

      if (resposta != false && resposta != ["\r\n\r\n\r\n"] && resposta.length > 0) {
        const resposta_formatada = resposta.replace("[", "").replace("]", "").replaceAll("'", "").split(",")
        var new_data = dataToDownload

        for (var i = 0; i < resposta_formatada.length; i++) {
          new_data.push({
            'source': "GoLab",
            'link': resposta_formatada[i]
          })
        }

        setDataToDownload(new_data)
      }
      return resposta
    }).catch((err) => {
      return false
    })
  }

  function searchAll() {
    searchInstiglio()
    //searchSector()
    //serachLab()
    //searchSocial()
  }

  useEffect(() => {
    if (loading) {
      setTimeout(function () {
        searchAll()
        setLoading(false)
      })
    }
  }, [loading])

  return (
    <div className={styles.webPage}>
      <Header></Header>

      <div className={styles.title}>
        <h1>Searching Through the Web</h1>
        <span></span>
      </div>

      <div className={styles.settings}>
        <Switch
          className={styles.switch}
          color="primary"
          onChange={() => handlerUpdate()}
          inputProps={{ 'color': 'primary checkbox' }} />

        <p>Up Date Mongo Atlas</p>

        <div className={styles.search}>
          <button
            onClick={() => handlerLoading()}
            className={loading ? styles.disableButton : styles.searchButtonColor}>search</button>
          <button className={disableDownload ? styles.disableButton : styles.downloadButton}>download</button>
        </div>
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