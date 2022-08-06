import axios from 'react-native-axios'

var baseURL_ = 'http://172.20.10.5:3000'

const api = axios.create({
  baseURL: baseURL_, // mudar quando implementar no raspberry
})

export default api