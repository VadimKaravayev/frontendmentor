import axios from "axios";

const baseUrl = "http://127.0.0.1:3001";

const getSubscriberByEmail = async (email) => {
  const response = await axios.get(
    `${baseUrl}/subscribers?email=${email}&_limit=1`
  );
  console.log("response", response);
  return response.data;
};

const addSubscriber = async (email) => {
  const response = await axios.post(`${baseUrl}/subscribers`, { email });
  console.log("response", response);
  return response.data;
};

export { getSubscriberByEmail, addSubscriber };
