"use client";

import { IUserLogin, IUser } from "@/types/users";
import { Button, Input, PasswordInput } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";

const { set, get } = Cookie;

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState<IUserLogin>({ number: "", password: "" });

  useEffect(() => {
    if (!get) return;
    if (get("isLogin")) return router.replace("/");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!(user.number || user.password)) return;

    try {
      interface IDataProps {
        token: string;
        user: IUser;
        success: Boolean;
      }

      const {
        data: { success, user: userData },
      } = await axios.post<IDataProps>("/api/login", user);

      if (success) {
        set("user", JSON.stringify(userData), { path: "/" });
        set("isLogin", "true", { path: "/" });
        router.replace("/");
      }

      throw new Error();
    } catch (error: any) {
      console.log(error);
      return new Error(error);
    }
  };

  return (
    <div className="flex gap-3 flex-col">
      <h1 className="text-xl font-bold">Login Page</h1>
      <Input
        placeholder="Enter Your Number"
        type="string"
        onChange={handleChange}
        value={user.number}
        name="number"
      />
      <PasswordInput
        placeholder="Enter Your Password"
        onChange={handleChange}
        value={user.password}
        name="password"
      />
      <Button className="bg-blue-600 hover:bg-blue-600" onClick={handleSubmit}>
        Login Now
      </Button>
    </div>
  );
}
