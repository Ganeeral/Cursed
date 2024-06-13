"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthIcon, CloseIcon, HideIcon } from "@/ui/icons";
import cn from "classnames";
import Link from "next/link";
import "@/app/globals.css";
import HeaderCursed from "@/components/header/headerCursed";
import Footer from "@/components/footer/footer";

const RegistrPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [usernameExistsError, setUsernameExistsError] = useState("");
  const { push } = useRouter();

  const validateUsername = async () => {
    if (!login) {
      setUsernameError("Введите логин");
    } else if (!/^[a-zA-Z]+$/.test(login)) {
      setUsernameError("Логин может содержать только латинские буквы");
    } else {
      setUsernameError("");
      try {
        const response = await fetch("http://Cursed/src/api/checkUsername.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login }),
        });
        const data = await response.json();
        if (data.exists) {
          setUsernameExistsError("Имя пользователя уже существует");
        } else {
          setUsernameExistsError("");
        }
      } catch (error) {
        console.error("Username check error:", error);
      }
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Введите пароль");
    } else if (password.length < 6) {
      setPasswordError("Пароль должен содержать не менее 6 символов");
    } else {
      setPasswordError("");
    }
  };

  const validateRepeatPassword = () => {
    if (!repeatPassword) {
      setRepeatPasswordError("Повторите пароль");
    } else if (repeatPassword !== password) {
      setRepeatPasswordError("Пароли не совпадают");
    } else {
      setRepeatPasswordError("");
    }
  };

  const checkFormValidity = useCallback(() => {
    if (
      !usernameError &&
      !passwordError &&
      !repeatPasswordError &&
      !usernameExistsError &&
      login &&
      password &&
      repeatPassword
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    usernameError,
    passwordError,
    repeatPasswordError,
    usernameExistsError,
    login,
    password,
    repeatPassword,
  ]);

  useEffect(() => {
    checkFormValidity();
  }, [checkFormValidity]);

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    await validateUsername();
    validatePassword();
    validateRepeatPassword();

    if (formIsValid) {
      try {
        const response = await fetch("http://Cursed/src/api/register.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password, repeatPassword }),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success(
            "Регистрация завершена! Перенаправление на страницу входа..."
          );
          setTimeout(() => {
            push("/auth");
          }, 0);
        } else {
          setUsernameExistsError(data.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <HeaderCursed />
      <div className="container-main">
        <AuthIcon className="scale-50 -translate-x-20 mobile:-translate-x-0 mobile:scale-75 tablet-s:scale-100" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="min-w-[300px] my-10 max-w-[670px] w-full flex flex-col gap-y-4 mx-2">
          <div className="rounded-[36px] p-4 flex flex-col gap-y-8">
            <div className="relative flex justify-center "></div>

            <form
              method="post"
              className={cn(
                "px-4 py-4 flex justify-center items-center flex-col rounded-3xl gap-y-12"
              )}
              onSubmit={handleRegistration}
            >
              <div className="flex flex-col gap-y-6 w-full">
                <div className="flex flex-col gap-y-3 max-w-[576px] w-full">
                  <label className="text-yellow-cream text-lg leading-5">
                    Логин
                  </label>
                  <input
                    value={login}
                    onChange={handleUsernameChange}
                    onBlur={validateUsername}
                    type="text"
                    className={cn(
                      "border placeholder:text-yellow-cream placeholder:text-base divide-solid border-yellow-cream bg-inherit h-[56px] rounded-xl outline-none px-2 text-yellow-cream text-xl w-full",
                      {
                        "border-fire-red": usernameError || usernameExistsError,
                      }
                    )}
                  />
                  {usernameExistsError && (
                    <p className="text-fire-red text-xs">
                      {usernameExistsError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-y-3 max-w-[576px] w-full">
                  <div className="flex justify-between w-full">
                    <label className="text-yellow-cream text-lg leading-5">
                      Пароль
                    </label>
                    <div className="cursor-pointer">
                      <HideIcon onClick={togglePasswordVisibility} />
                    </div>
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={validatePassword}
                    className={cn(
                      "border placeholder:text-yellow-cream placeholder:text-base divide-solid border-yellow-cream bg-inherit h-[56px] rounded-xl outline-none px-2 text-yellow-cream text-xl w-full",
                      { "border-fire-red": passwordError }
                    )}
                  />
                  {passwordError && (
                    <p className="text-fire-red text-xs">{passwordError}</p>
                  )}
                </div>
                <div className="flex flex-col gap-y-3 max-w-[576px] w-full">
                  <div className="flex justify-between w-full">
                    <label className="text-yellow-cream text-lg leading-5">
                      Повторите пароль
                    </label>
                    <div className="cursor-pointer">
                      <HideIcon onClick={togglePasswordVisibility} />
                    </div>
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    onBlur={validateRepeatPassword}
                    className={cn(
                      "border placeholder:text-yellow-cream placeholder:text-base divide-solid border-yellow-cream bg-inherit h-[56px] rounded-xl outline-none px-2 text-yellow-cream text-xl w-full",
                      { "border-fire-red": passwordError }
                    )}
                  />
                  {repeatPasswordError && (
                    <p className="text-fire-red text-xs">{repeatPasswordError}</p>
                  )}
                </div>

                <div className="flex flex-col gap-y-4">
                  <button
                    type="submit"
                    className={cn(
                      "w-full max-w-[576px] text-xl leading-5 rounded-[40px] p-5 bg-[#1F1F1F] text-white duration-300 hover:bg-searchText",
                      { "opacity-50 cursor-not-allowed": !formIsValid }
                    )}
                    disabled={!formIsValid}
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="text-yellow-cream flex gap-x-2 flex-wrap justify-center font-medium text-base">
            У вас есть аккаунт?
            <Link
              className="text-fire-red font-medium text-base"
              href="/auth"
            >
              Войти
            </Link>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <Footer />
    </>
  );
};

export default RegistrPage;
