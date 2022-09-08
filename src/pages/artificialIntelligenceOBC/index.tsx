import styles from './styles.module.scss'
import { Header } from '../../components/Header'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineDownload, AiOutlineRocket } from 'react-icons/ai'
import { AiBox } from '../../components/IaBox'
import { ProgressBar } from '../../components/ProgressBar'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";
import api from '../../services/api'

import Snackbar from '@material-ui/core/Snackbar';
import { Message } from '../../components/Message'

import functionresumeImport from "../../functions/resumeImport"
import functionprocessDate from "../../functions/processDate"
import functiontoDate from '../../functions/toDate'
import functionClean from '../../functions/cleanDuplicates'

import { useRef } from 'react';

//função resposável por ler o arquivo excel

export default function ArtificialIntelligence() {

	const [fileName, setFileName] = useState('')
	const [data, setData] = useState([])
	const [dataFiltered, setDataFiltered] = useState([])
	const [dataClassified, setDataClassified] = useState([])
	const [loading, setLoading] = useState(false)
	const [processDisable, setProcessDisable] = useState(true)
	const [downloadDisable, setDownloadDisable] = useState(true)
	const [progress, setProgress] = useState(0)
	const [openError, setOpenError] = useState(false)
	const [openSuccess, setOpenSuccess] = useState(false)


	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenError(false);
		setOpenSuccess(false)
	};

	const inputFile = useRef(null) //executa quando clica no input

	const onButtonClick = () => {
		inputFile.current.click(); // `current` points to the mounted file input element
	}

	async function readExcel(file) {
		try {

			setFileName(file['name']) //atualiza o nome do arquivo
			const promise = new Promise((resolve, reject) => {

				const fileReader = new FileReader() //o arquvio é lido pelo fileReader
				fileReader.readAsArrayBuffer(file)

				//quando estiver pronto...
				fileReader.onload = (e) => {

					try {
						const bufferArray = e.target.result
						const wb = XLSX.read(bufferArray, { type: 'buffer' })
						const wsname = wb.SheetNames[0]  //pega o nome do primeiro workSheet
						const ws = wb.Sheets[wsname]
						const data = XLSX.utils.sheet_to_json(ws) //converte os dados para json
						resolve(data)
					} catch {
						setOpenError(true)
					}

					//caso tenha algum erro no arquivo...
					fileReader.onerror = ((error) => {
						reject(error)
						setOpenError(true)
					})
				}
			})

			promise.then((d) => {
				if (d[0]['Data'] == undefined && d[0]["HTML"] == undefined) {
					setOpenError(true)
				}

				else {
					var d_filtered = functionresumeImport(d)

					setOpenSuccess(true)
					setData(d_filtered)
					setProcessDisable(false)
					setDataFiltered(d_filtered)
				}
			})
		} catch (err) {
			setOpenError(true)
			console.log(err)
		}
	}

	function filtroData(datas) {

		if (datas == null || datas == undefined) {
			var new_data = data
		}

		else {

			const data1 = functionprocessDate(datas[0]._d)   //pega a data de início
			const data2 = functionprocessDate(datas[1]._d)  //pega a data de fim

			console.log(data1.getTime(), data2.getTime())

			var new_data = [] //variavel que amarzenará as info filtradas

			for (var i = 0; i < data.length; i++) {

				var valor_data = functiontoDate(data[i].Data) //valor da data
				//se a informação estiver entre as datas desejadas...
				if (valor_data.getTime() >= data1.getTime() && valor_data.getTime() <= data2.getTime()) {
					new_data.push(data[i])
				}
			}
		}
		const final_data = functionresumeImport(new_data)
		setDataFiltered(final_data)
	}

	async function process() {

		const data_to_send = []

		for (var i = 0; i < dataFiltered.length; i++) {
			data_to_send.push({ "HTML": dataFiltered[i]["HTML"] })
		}

		var inicio = 0
		var fim = 40

		var new_data = []

		for (var i = 0; i < data_to_send.length / 40; i++) {
			await api.post('machineLearningOBC', { manchetes: data_to_send.slice(inicio, fim) })
				.then(resp => {
					if (Math.floor(resp.status / 100) === 2) {
						if (resp.data != false) {
							new_data = new_data.concat(eval('(' + resp.data + ')'))

							const formated_progress = parseFloat(((i) / (data_to_send.length / 40) * 100).toFixed(2))
							setProgress(formated_progress)
							setDataClassified(new_data)
						}
					}
				}).catch((err) => {
					console.log(err)
				})

			inicio += 40
			fim += 40
		}

		const clean = functionClean(new_data, 'manchete') //remove duplicate data

		setLoading(false)
		setProcessDisable(false)
		setDataClassified(clean)
		setDownloadDisable(false)
		setProgress(100)
	}

	const columns: GridColDef[] = [
		{
			headerName: "Date",
			field: "Data",
			width: 200
		},
		{
			headerName: "Sender",
			field: "De",
			width: 200
		},
		{
			headerName: "Resume",
			field: "Resumo_",
			width: 400
		}
	]

	const useStyles = makeStyles((theme) => ({
		root: {
			width: "100%",
			background: 'white',
			borderRadius: 3,
			color: 'black',
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	}))

	useEffect(() => {

		if (loading) {
			setProcessDisable(true)
			setProcessDisable(true)
			process()
		}

	}, [loading]);

	const classes = useStyles();

	const table = (
		<DataGrid className={classes.root} rows={dataFiltered} columns={columns} pageSize={5} />
	)

	const browseFile = (
		<button type='button' className={styles.buttonBrowse} onClick={onButtonClick}>
			<AiOutlineDownload style={{ width: '100%', fontSize: '4rem' }}></AiOutlineDownload>
						Browse your files
		</button>
	)

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
				<h1>Machine Learning Through SVM</h1>
				<span></span>
			</div>

			<div className={styles.contain}>

				<div className={styles.boxes}>
					<AiBox box={
						{
							icon: "/precision.png",
							title: "Algorithm precision",
							value: "90,2%",
							type: 0
						}
					}></AiBox>

					<AiBox box={{
						icon: "/vel.png",
						title: "Readlines per second",
						value: "8,00",
						type: 1
					}}></AiBox>
				</div>

				<div className={styles.upload}>
					<input
						type='file'
						name="file"
						accept='.xlsx'
						ref={inputFile}
						style={{ display: 'none' }}
						onChange={(e) => readExcel(e.target.files[0])} />

					{data.length == 0 ? (browseFile) : (table)}
				</div>

			</div>
			<div className={styles.progressContainer}>
				<div className={styles.progress}>
					<button
						onClick={() => setLoading(true)}
						disabled={processDisable}
						className={processDisable == true ? styles.disableButton : styles.processButtonColor}
					>Process
					</button>

					{loading ? (<CircularProgress size="1.5rem"/>) : (null)}

					{downloadDisable == true ? (null) : (
						<button
							disabled={downloadDisable}
							className={styles.downloadButton}>
							<CSVLink
								className={styles.csvLink}
								filename={"manchetes_classificadas.csv"}
								data={dataClassified}>
								Download
          </CSVLink>
						</button>
					)}

					<ProgressBar bar={{ progress: progress }}></ProgressBar>
				</div>
			</div>

		</div>

	)
}