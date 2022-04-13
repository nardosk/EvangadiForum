import axios from 'axios'

export default axios = () => {
 return axios.create({
  baseUrl: `http://localhost:3001`   //the url of our server
 });
}