
const SVR_PORT = 3000;
const API_PORT = 5000;

const serverAddress = (path) => {
  return `${window.location.protocol}//${window.location.hostname}:${SVR_PORT}/${path}`;
}

const removeServerAddress = (path) => {
  return path.replace(`${window.location.protocol}//${window.location.hostname}:${SVR_PORT}/`, '');
}

const apiServerAddress = (path) => {
  return `${window.location.protocol}//${window.location.hostname}:${API_PORT}/api/${path}`;
}

export {serverAddress, apiServerAddress, removeServerAddress};