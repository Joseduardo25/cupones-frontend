"use client"; //
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import toast, { Toaster } from "react-hot-toast";
import { saveRegisterCoupon } from "./utils/apis";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Confetti from "react-confetti";
import Link from 'next/link';
import styles from "./styles/Styles.module.css";
import tv from "../public/tv.png";
// import useWindowSize from "react-use/lib/useWindowSize";

interface FormI {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  store: string;
  typeDocument: string;
  numberDocument: string;
  cuopon: string;
}

const HomePage = () => {
  const [form, setForm] = useState<FormI>({} as FormI);
  const notifyWarning = () => toast.error("Existe un campo vacío");
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [steps, setSteps] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const {
    cuopon,
    email,
    name,
    lastName,
    numberDocument,
    phone,
    store,
    typeDocument,
  } = form;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      [
        cuopon,
        email,
        lastName,
        name,
        numberDocument,
        phone,
        store,
        typeDocument,
      ].includes("")
    ) {
      console.log("hay un campo vacio");
      notifyWarning();
      return;
    }
    setIsLoading(true);
    saveRegisterCoupon(form).then((res) => {
      if (res.message == "User created") {
        setIsLoading(false);
        setSteps(true);
      }else if (res.message == "No existe el cupón") {
        setIsInvalid(true);
        setSteps(false);
      }else{
        console.log("all ready")
      }
    });
  }
  
  const goBack = () => {
    setIsLoading(false);
    setIsInvalid(false);
  };

  return (
    <>
      <div 
      // className="flex items-center justify-center h-screen"
      className={`md:flex items-center justify-center min-h-screen pb-24 relative ${styles.bgGradient}`}
      >
        <div>
          <Toaster />
        </div>
        {isLoading && (
          <Modal>
            <Loader />
          </Modal>
        )}
        {steps && (
          <>
            <Confetti width={width} height={height} />

            <Modal>
              <div className="flex flex-col items-center justify-center w-1/2 text-center">
                <div className="h-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-full text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl text-blue-700">
                  Felicidades, se registró correctamente el cupón
                </h1>
              </div>
            </Modal>
          </>
        )}
            {isInvalid && 
              <Modal>
              <div className="flex flex-col items-center justify-center w-1/2 h-1/2 text-center">
                <div className="h-80">
                  <svg 
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    // aria-hidden="true"
                    className="w-full text-red-500"
                  >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl text-blue-700">
                  El cupon es invalido o ya fue registrado anteriormente
                </h1>
                <Link
                  href="/"
                >
                  <button
                    type="button"
                    className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={goBack}
                    >
                    Aceptar
                  </button>    
                </Link>
              </div>
            </Modal>
            }
        <div className="md:flex md:container md:mx-auto w-full p-2 md:p-10">
          <div className="md:w-1/2 flex flex-col justify-center items-center">
              <Image
                src={logo}
                alt={"Logo de CrediVargas"}
                height={150}
                width={250}
                className=""
              />
              <span className="text-white text-1xl">Del 10 al 31 de Julio</span>
              <button className="px-5 pt-2 rounded-full bg-orange-600 text-white font-normal mt-2">
                !Gana con la Cuponera Credi Vargas!
              </button>
              <Image
                src={tv}
                alt={"Logo de CrediVargas"}
                height={100}
                width={350}
                className=""
              />
          </div>
          <form className={`md:p-10 bg-white rounded-2xl md:w-1/2 p-1 shadow-lg`} onSubmit={handleSubmit}>
            <h1 className="mb-10 text-4xl font-bold text-center">
              Registra tu cupón
            </h1>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  name="name"
                  // required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Vargas"
                  name="lastName"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="987-654-321"
                  name="phone"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label
                  htmlFor="typeDocument"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Seleccione el tipo de documento
                </label>
                <select
                  id="typeDocument"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="typeDocument"
                  onChange={handleChange}
                >
                  <option value="">Seleccione el tipo de documento</option>
                  <option value="DNI">DNI</option>
                  <option value="C.EXTRANJERIA">C.Extranjeria</option>
                  <option value="PASAPORTE">Pasaporte</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="numberDocument"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Número de documento
              </label>
              <input
                type="tel"
                id="numberDocument"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="00000000"
                name="numberDocument"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="store"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Selecciona la tienda
              </label>
              <select
                id="store"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="store"
                onChange={handleChange}
              >
                <option value="">Seleccione la tienda</option>
                <option value="pucallpa1_tarapaca">Pucallpa l - Tarapaca</option>
                <option value="pucallpa2_centenario">Pucallpa ll - Centenario</option>
                <option value="iquitos">Iquitos</option>
                <option value="jaen">Jaén</option>
                <option value="tarapoto">Tarapoto</option>
                <option value="yurimaguas">Yurimaguas</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@gmail.com"
                required
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="cuopon"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cupón
              </label>
              <input
                type="text"
                id="cuopon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-sky-500"
                required
                name="cuopon"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Regístrate
              </button>
              <Image
                src={logo}
                alt={"Logo de CrediVargas"}
                height={100}
                width={150}
                className=""
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;
