import { SessionId } from "../store/session";
import { Auth } from "../types/Auth";
import { LoginParams } from "../types/Login";
import {RegisterParams} from "../types/Register";
import { createAuthInterface, createCommonInterface } from "./config";

export interface Responce {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export const apiPostCreateDialoag = createAuthInterface<SessionId,void>(
  "POST", 
  "create",
  {
    retry: 3,
    retryInterval: 200,
  }
)

export const apiPostAnswer = createAuthInterface<{answer: string},{context: string;sessionId: string}>(
  "POST",
  "answer",
)

export const apiGetVerifyCode = createCommonInterface<Blob,{sessionId: string}>(
  "GET",
  "getVerificationCode/{sessionId}",
  {
    responseData: "blob"
  }
)

export async function apiPostLogin(params: LoginParams): Promise<Auth> {
  const { userName, password, verificationCode, sessionId } = params;
  const url = import.meta.env.VITE_PROTOCOL+ "://"+import.meta.env.VITE_HOST
  const data = await fetch( url + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      userName,
      password,
      verificationCode,
      sessionId,
    }),
  }).then((res) => res.json());
  return data?.data as Auth;
}

// eslint-disable-next-line no-var
// export var apiPostLogin = createCommonInterface<Responce, LoginParams>(
//   "POST",
//   "login",
// )

export const verifyAuth = createAuthInterface<string,string>(
  "GET",
  "verifyAuth",
  {
    RESPONSE_VALUE: 'json',
    responseKey: 'message',
    retry: 3,
    retryInterval: 100,
  }
)

export const apiPostRegister = createCommonInterface<Responce, RegisterParams>(
  "POST",
  "register",
)

export const apiGetVerifyUserName = createCommonInterface<boolean, {userName: string}>(
  "POST",
  "verifyUserNameIsExist",
  {
    responseKey: 'data'
  }
)