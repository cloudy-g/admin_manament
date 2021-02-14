import axios from 'axios';


export function request(config) {
  let instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 4000
  });
  return instance(config);
}