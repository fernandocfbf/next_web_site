import axios from 'axios'

if (process.env.REACT_APP_ENVIRONMENT == "development"){
  var url = "http://localhost:3003/"
} else {
  var url = "https://automation-back-end.herokuapp.com/" 
}

export default axios.create({
  baseURL: url
})