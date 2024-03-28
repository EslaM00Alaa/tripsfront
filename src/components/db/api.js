import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.hurghadaskyhightrips.com/api',

});

export default instance;
