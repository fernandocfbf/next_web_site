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
import Image from 'next/image';
import { useRouter } from 'next/router';



export default function WebScraping() {

  const [openError, setOpenError] = useState(false)
	const [openSuccess, setOpenSuccess] = useState(false)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenError(false);
		setOpenSuccess(false)
	};
	
	const router = useRouter()
	const currentUrl = router.pathname

	function logOut() {
		router.push('/')
	}

	function redirect(pathName) {
		router.push(pathName)
	}
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
        <div className={styles.contain}>

          <div className={styles.boxes}>
            <button 
              className={currentUrl == '/webScrapingOBC' ? styles.filledHeader : styles.headerButton}
              onClick={() => redirect('/webScrapingOBC')}>
              Web Scraping for OBC
            </button>

            <button
              className={currentUrl == '/webScrapingPPP' ? styles.filledHeader : styles.headerButton}
              onClick={() => redirect('/webScrapingPPP')}>
              Web Scraping for PPP
            </button>
            
          </div>
        </div>

      
      </div>


    </div>

  )
}