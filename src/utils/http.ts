import { useAuth } from "context/auth-context";
import { stringify } from "qs";
import * as auth from "auth-provider";
import React from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toLocaleLowerCase() === "get") {
    endpoint += `?${stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "Log in please" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      // The difference with axios is that if it is not ok (e.g. 401,500), fetch must be rejected manually and will not enter the catch exception. fetch's catch will only occur if the network connection is disconnected and fails
      // while axios can directly throw an exception (into the catch callback) when the return status is not 2xx
      return Promise.reject(data);
    }
  });
};
export const useHttp = () => {
  const { user } = useAuth();
  // TS Operators
  // Utility type
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
