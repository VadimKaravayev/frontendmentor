import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUser = async (email) => {
  const response = await axios.get(
    `http://127.0.0.1:3001/subscribers?email=${email}`
  );
  return response.data;
};
const addUser = async (email) => {
  const response = await axios.post("http://127.0.0.1:3001/subscribers", {
    email,
  });
  return response.data;
};

const checkAndAddSubscriber = createAsyncThunk(
  "subscriber/checkAndAddSubscriber",
  async (email) => {
    const user = await getUser(email);
    console.log("getUser", user);
    if (user.length) {
      throw new Error(`User with email ${email} already exists`);
    }
    const data = await addUser(email);
    console.log("addUser", data);
    return data;
  }
);

export { checkAndAddSubscriber };
