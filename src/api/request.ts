import { SessionId } from "../store/session";
import { Auth } from "../types/Auth";
import { LoginParams } from "../types/Login";
import {RegisterParams} from "../types/Register";
import { createAuthInterface, createCommonInterface, createFormInterface, getAuthorization } from "./config";
import { AiList } from '../types/AiListItem';
import { User } from "../types/User";

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

export const apiGetAiList = createAuthInterface<AiList>(
  "GET",
  "getAiList",
  {
    responseKey: 'aiList'
  }
)

export const apiGetUser = createAuthInterface<User, void>(
  "GET",
  "getCurrentUser",
  {
    responseKey: 'data'
  }
)

export const apiUploadFile = createFormInterface<{ message: string; filePath: string }, FormData>(
    "POST",
    "upload",
);

export async function apiUploadFile2(file: File): Promise<{ message: string; filePath: string }> {
    const url = import.meta.env.VITE_PROTOCOL + "://" + import.meta.env.VITE_HOST + "/upload";
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            ...getAuthorization(),
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("File upload failed");
    }

    return response.json();
}