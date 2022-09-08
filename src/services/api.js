import axios from 'axios'

if (process.env.REACT_APP_ENVIRONMENT == "development"){
  var url = "http://localhost:3003/"
} else {
  console.log(process.env.REACT_APP_ENVIRONMENT)
  //var url = "https://automation-back-end.herokuapp.com/" 
  var url = "http://localhost:3003/"
}

export default axios.create({
  baseURL: url
})