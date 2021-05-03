import styles from './styles.module.scss'
import { Header } from '../../components/Header'
import { AiOutlineDownload } from 'react-icons/ai'
import { AiBox } from '../../components/IaBox'
import { useState } from 'react';

import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";

import functionresumeImport from "../../functions/resumeImport"
import { useRef } from 'react';

//função resposável por ler o arquivo excel

export default function ArtificialIntelligence() {

	const [fileName, setFileName] = useState('')
	const [data, setData] = useState([])
	const [dataFiltered, setDataFiltered] = useState([])

	const inputFile = useRef(null) //executa quando clica no input
	const onButtonClick = () => {
		inputFile.current.click(); // `current` points to the mounted file input element
	}
	
	function readExcel(file) {
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
						//se crahcou
					}

					//caso tenha algum erro no arquivo...
					fileReader.onerror = ((error) => {
						reject(error)
					})
				}
			})

			promise.then((d) => {
				if (d[0]['Data'] == undefined && d[0]["HTML"] == undefined) {
					//conteúdo inválido
				}

				else {
					var d_filtered = functionresumeImport(d)
					setData(d_filtered)
					setDataFiltered(d_filtered)
				}
			})
		} catch (err) {
			console.log(err)
		}
	}


	return (
		<div className={styles.artificalPage}>
			<Header></Header>
			<div className={styles.title}>
				<h1>Machine Learning through SVM</h1>
			</div>

			<div className={styles.line}></div>

			<div className={styles.contain}>
				<div className={styles.boxes}>
					<AiBox box={
						{
							icon: "/background.jpg",
							title: "Algorithm precision",
							value: "97,2%"
						}
					}></AiBox>

					<AiBox box={{
						icon: "/background.jpg",
						title: "Readlines per second",
						value: "8,00"
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
					<button type='button' onClick={onButtonClick}>
						<AiOutlineDownload style={{ width: '100%', fontSize: '4rem' }}></AiOutlineDownload>
						Browse your files
					</button>
				</div>

			</div>
		</div>

	)
}