import { getAuth } from "../store/auth";

export const TOKEN = `Bearer ${getAuth()?.token}`;