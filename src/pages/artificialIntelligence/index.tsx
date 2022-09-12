import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import Head from 'next/head';
import Snackbar from '@material-ui/core/Snackbar';
import { Message } from '../../components/Message';
import { useEffect, useState } from 'react';


//função resposável por ler o arquivo excel

export default function ArtificialIntelligence() {

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
			<Message message={{ type: "error", message: "Something wrong happened" }}></Message>
		</Snackbar>
	)

	const success = (
		<Snackbar style={{ width: "20rem", height: "2.5rem" }} open={openSuccess} autoHideDuration={2000} onClose={handleClose}>
			<Message message={{ type: "success", message: "File loaded" }}></Message>
		</Snackbar>
	)

	
	return (
		<div className={styles.artificalPage}>
			<Header></Header>

			<Head>
				<title>
					Artifical Intelligence | Automation
        </title>
			</Head>

			{openError ? (error) : (null)}
			{openSuccess ? (success) : (null)}

			<div className={styles.title}>
				<h1>Machine Learning</h1>
				<span></span>
			</div>

			<div className={styles.contain}>

				<div className={styles.boxes}>
					<button 
						className={currentUrl == '/artificialIntelligenceOBC' ? styles.filledHeader : styles.headerButton}
						onClick={() => redirect('/artificialIntelligenceOBC')}>
						Artificial Intelligence for OBC
					</button>

					<button
						className={currentUrl == '/artificialIntelligencePPP' ? styles.filledHeader : styles.headerButton}
						onClick={() => redirect('/artificialIntelligencePPP')}>
						Artificial Intelligence for PPP
					</button>
					
				</div>
			</div>

			
			
				

		</div>

	)
}