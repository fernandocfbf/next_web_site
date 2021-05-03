import styles from './styles.module.scss'
import { Header } from '../../components/Header'

import { AiOutlineDownload, AiOutlineRocket } from 'react-icons/ai'
import { AiBox } from '../../components/IaBox'
import { ProgressBar } from '../../components/ProgressBar'

import { useState } from 'react';
import { Table, DatePicker } from 'antd';
import 'antd/dist/antd.css';

import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";

import functionresumeImport from "../../functions/resumeImport"
import functionprocessDate from "../../functions/processDate"
import functiontoDate from '../../functions/toDate'

import { useRef } from 'react';

//função resposável por ler o arquivo excel

export default function ArtificialIntelligence() {

	const [fileName, setFileName] = useState('')
	const [data, setData] = useState([])
	const [dataFiltered, setDataFiltered] = useState([])
	const [loading, setLoading] = useState(true)
	const { RangePicker } = DatePicker;
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
					setLoading(false)
				}
			})
		} catch (err) {
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

	const col = [
		{
			title: "Date",
			dataIndex: "Data"
		},
		{
			title: "Sender",
			dataIndex: "De"
		},
		{
			title: "HTML",
			dataIndex: "HTML_"
		},
		{
			title: "Resume",
			dataIndex: "Resumo_"
		},
	]

	const table = (
		<Table
			className={styles.table}
			columns={col}
			dataSource={dataFiltered}
			pagination={false}
			loading={loading}
			scroll={{
				y: 150,
				x: 300
			}}

			title={() =>
				<RangePicker
					format={"DD/MM/YYYY"}
					onChange={(e) => filtroData(e)}
				/>
			}>
		</Table >
	)

	const browseFile = (
		<button type='button' className={styles.buttonBrowse} onClick={onButtonClick}>
			<AiOutlineDownload style={{ width: '100%', fontSize: '4rem' }}></AiOutlineDownload>
						Browse your files
		</button>
	)

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
							icon: "/precision.png",
							title: "Algorithm precision",
							value: "97,2%"
						}
					}></AiBox>

					<AiBox box={{
						icon: "/vel.png",
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

					{loading ? (browseFile) : (table)}
				</div>

			</div>
			<div className={styles.progressContainer}>
				<div className={styles.progress}>
					<button className={styles.processButtonColor}>Process</button>
					<ProgressBar bar={{ progress: 43 }}></ProgressBar>
				</div>
			</div>

		</div>

	)
}