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
import Head from 'next/head'


export default function WebScraping() {

  const [upDateMongoAtlas, setUpDateMongoAtlas] = useState(false)
  const [disableDownload, setDisableDownload] = useState(true)
  const [loading, setLoading] = useState(false)
  const [disableProcess, setDisableProcess] = useState(true)
  const [dataToDownload, setDataToDownload] = useState([])
  const [openError, setOpenError] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const {btnStatus_radarPPP} = useWebBox()

  function handlerUpdate() {
    setUpDateMongoAtlas(!upDateMongoAtlas) //inverte o valor da variável
  }

  function handlerLoading() {
    setLoading(!loading)
  }

  async function searchAll() {

    if (btnStatus_radarPPP == "selected") {
      await api.post('webScraping_radar', { reconhecer: upDateMongoAtlas }).then(resp => {
        const resposta = resp.data.replace(/ /g, '')
        console.log("radarPPP: ", resposta)
        if (resposta != false && resposta.length > 6) {
          console.log("entrei >>>")

          const resposta_formatada = resposta.replace("[", "").replace("]", "").replaceAll("'", "").split(",")
          var new_data = dataToDownload

          for (var i = 0; i < resposta_formatada.length; i++) {
            new_data.push({
              'source': "Radar PPP",
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
    if (btnStatus_radarPPP == 'selected')
      {
      setDisableProcess(false)
    }

    else {
      setDisableProcess(true)
    }
  }, [btnStatus_radarPPP])

  return (
    <div className={styles.webPage}>

      <Head>
        <title>
          Web Scraping | Automataion
        </title>
      </Head>

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

        <p>Up Date Backup file</p>

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
          title: "Radar PPP",
          text: "Resumo de Contratos de PPPs",
          image_path: "/radarPPP.png",
          height: 100,
          width: 100
        }}></WebBox>

      </div>


    </div>

  )
}