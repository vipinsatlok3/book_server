import { BASE_URL } from "@/config";
import axios from "axios";

export const getData = async (url: string) => {

    if (!(BASE_URL || url)) return null

    const response = await fetch(BASE_URL + url);
    const data = await response.json();
    return data;
}

export const axiosInstance = axios.create({ baseURL: BASE_URL });