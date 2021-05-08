function toDate(date) {

  const monthNames = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11
  }

  for (var i = 0; i < date.length; i++) {

    if (date[i] == " ") {
      var resp = date.slice(0, i + 1)
    }
  }

  const [dia, mes_fake, ano] = resp.split("-")

  const mes = monthNames[mes_fake]

  const data_resp = new Date(ano, mes, dia)

  return data_resp

}

export default toDate