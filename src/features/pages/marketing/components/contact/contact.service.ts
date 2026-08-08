import axios from "axios";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const sendContactMessage = async (
  data: ContactFormData
) => {
  const response = await axios.post(
    "http://localhost:5000/api/contact",
    data
  );

  return response.data;
};