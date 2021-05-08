import styles from './styles.module.scss'
import { Header } from '../../components/Header'
import { WebBox } from '../../components/WebBox'
import Switch from '@material-ui/core/Switch';
import { useEffect, useState } from 'react';
import api from '../../services/api'
import { useWebBox } from '../../context/webBoxContext'
import Snackbar from '@material-ui/core/Snackbar';
import { Message } from '../../components/Message'
import CircularProgress from '@material-ui/core/CircularProgress';
import { CSVLink } from "react-csv";

export default function WebScraping() {

  const [upDateMongoAtlas, setUpDateMongoAtlas] = useState(false)
  const [disableDownload, setDisableDownload] = useState(true)
  const [loading, setLoading] = useState(false)
  const [disableProcess, setDisableProcess] = useState(true)
  const [dataToDownload, setDataToDownload] = useState([])
  const [openError, setOpenError] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const { btnStatus_sector, btnStatus_instiglio, btnStatus_social, btnStatus_lab } = useWebBox()

  function handlerUpdate() {
    setUpDateMongoAtlas(!upDateMongoAtlas) //inverte o valor da variável
  }

  function handlerLoading() {
    setLoading(!loading)
  }

  async function searchAll() {

    if (btnStatus_social == "selected") {
      await api.post('webScraping_social', { reconhecer: upDateMongoAtlas }).then(resp => {
        const resposta = resp.data.replace(/ /g,'')
        if (resposta != false && resposta != ["\r\n\r\n\r\n"] && resposta.length > 0) {

          const resposta_formatada = resposta.replace("[", "").replace("]", "").replaceAll("'", "").split(",")
          var new_data = dataToDownload

          for (var i = 0; i < resposta_formatada.length; i++) {
            new_data.push({
              'source': "Social Finance",
              'link': resposta_formatada[i].replace(/(\r\n|\n|\r)/gm, "")
            })
          }
          setDataToDownload(new_data)
        }
        return resposta
      }).catch((err) => {
        return false
      })
    }

    if (btnStatus_instiglio == "selected") {
      await api.post('webScraping_instiglio', { reconhecer: upDateMongoAtlas }).then(resp => {
        const resposta = resp.data.replace(/ /g,'')

        if (resposta != false && resposta != ["\r\n\r\n\r\n"] && resposta.length > 0) {
          const resposta_formatada = resposta.replace("[", "").replace("]", "").replaceAll("'", "").split(",")
          var new_data = dataToDownload

          for (var i = 0; i < resposta_formatada.length; i++) {
            new_data.push({
              'source': "Instiglio",
              'link': resposta_formatada[i].replace(/(\r\n|\n|\r)/gm, "")
            })
          }

          setDataToDownload(new_data)
        }
        return resposta
      }).catch((err) => {
        return false
      })
    }

    if (btnStatus_sector == "selected") {
      await api.post('webScraping_sector', { reconhecer: upDateMongoAtlas }).then(resp => {
        const resposta = resp.data.replace(/ /g,'')
        console.log("SECTOR: ", resposta)
        if (resposta != false && resposta != ["\r\n\r\n\r\n"] && resposta.length > 0) {
          const resposta_formatada = resposta.replace("[", "").replace("]", "").replaceAll("'", "").split(",")
          var new_data = dataToDownload

          for (var i = 0; i < resposta_formatada.length; i++) {
            new_data.push({
              'source': "Third Sector",
              'link': resposta_formatada[i].replace(/(\r\n|\n|\r)/gm, "")
            })
          }
          setDataToDownload(new_data)
        }
        return resposta
      }).catch((err) => {
        return false
      })
    }

    if (btnStatus_lab == "selected") {
      await api.post('webScraping_lab', { reconhecer: upDateMongoAtlas }).then(resp => {
        const resposta = resp.data.replace(/ /g,'')

        if (resposta != false && resposta != ["\r\n\r\n\r\n"] && resposta.length > 0) {
          const resposta_formatada = resposta.replace("[", "").replace("]", "").replaceAll("'", "").split(",")
          var new_data = dataToDownload

          for (var i = 0; i < resposta_formatada.length; i++) {
            new_data.push({
              'source': "GoLab",
              'link': resposta_formatada[i].replace(/(\r\n|\n|\r)/gm, "")
            })
          }

          setDataToDownload(new_data)
        }
        return resposta
      }).catch((err) => {
        return false
      })
    }

    if (dataToDownload.length == 0) {
      setOpenError(true)
    }

    else {
      setOpenSuccess(true)
      setDisableDownload(false)
    }
    setLoading(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
    setOpenSuccess(false)
  };

  const error = (
    <Snackbar style={{ width: "20rem", height: "2.5rem" }} open={openError} autoHideDuration={2000} onClose={handleClose}>
      <Message message={{ type: "error", message: "Sorry, nothing new today :(" }}></Message>
    </Snackbar>
  )

  const success = (
    <Snackbar style={{ width: "20rem", height: "2.5rem" }} open={openSuccess} autoHideDuration={2000} onClose={handleClose}>
      <Message message={{ type: "success", message: "We got something!" }}></Message>
    </Snackbar>
  )

  useEffect(() => {
    if (loading) {
      searchAll()
    }
  }, [loading])

  useEffect(() => {
    if (btnStatus_sector == 'selected' ||
      btnStatus_instiglio == 'selected' ||
      btnStatus_social == 'selected' ||
      btnStatus_lab == 'selected') {
      setDisableProcess(false)
    }

    else {
      setDisableProcess(true)
    }
  }, [btnStatus_sector, btnStatus_instiglio, btnStatus_social, btnStatus_lab])

  return (
    <div className={styles.webPage}>
      <Header></Header>

      {openError ? (error) : (null)}
      {openSuccess ? (success) : (null)}

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
          {loading ? (<CircularProgress size="1.5rem" />) : (null)}
          <button
            disabled={loading || disableProcess}
            onClick={() => handlerLoading()}
            className={loading || disableProcess ? styles.disableButton : styles.searchButtonColor}>search</button>

          {disableDownload ?
            (
              <button
                disabled={disableDownload}
                className={styles.disableButton}>
                Download
              </button>
            ) :
            (
              <button
                disabled={disableDownload}
                className={styles.downloadButton}>
                <CSVLink
                  className={styles.csvLink}
                  filename={"web_scraping_news.csv"}
                  data={dataToDownload}>
                  Download
                </CSVLink>
              </button>
            )}
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