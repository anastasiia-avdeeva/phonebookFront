import axios from "axios";

const baseURL = "http://localhost:3001/api/persons";

const getResponseData = (request) => request.then((response) => response.data);

const getAllPersons = () => getResponseData(axios.get(baseURL));

const createPerson = (newPerson) =>
  getResponseData(axios.post(baseURL, newPerson));

const updatePerson = (changedPersonObj) =>
  getResponseData(
    axios.put(`${baseURL}/${changedPersonObj.id}`, changedPersonObj)
  );

const deletePerson = (personId) => {
  const request = axios.delete(`${baseURL}/${personId}`);
  return request.then((response) => {
    console.log("Response status", response.status);
    return personId;
  });
};

export default { getAllPersons, createPerson, updatePerson, deletePerson };
