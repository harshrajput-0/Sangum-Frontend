import axios from "axios";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendContactMessage = async (data: ContactFormData) => {
  const response = await axios.post(`${API_URL}/api/contact`, data);
  return response.data;
};