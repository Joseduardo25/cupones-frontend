"use client";
import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import { CuponI } from "../interfaces";
import { generateExcelFile } from "../utils/generateXlsx";

const CuponesPage = () => {
  const [dataCupons, setDataCupons] = useState<CuponI[] | []>([]);

  useEffect(() => {
    getInfo().then((info) => {
      setDataCupons(info);
    });
  }, []);

  const getInfo = async () => {
    try {
      console.log(`${process.env.NEXT_PUBLIC_DB_URL}cupon`);

    // cambiar url para produccion
      const response = await fetch(`https://cupones-backend-production.up.railway.app/api/v1/cupon`);
      const data = await response.json();
      return data.cupons;
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFile = () => {};

  return (
    <div className="h-screen overflow-y-auto ">
      <div className="mx-auto container mt-10 flex justify-between">
        <h1>Cupones</h1>
        <div className="">
          <button onClick={() => generateExcelFile(dataCupons)}>
            descargar cupones
          </button>
        </div>
      </div>
      <main>
        <div className="container mx-auto mt-10">
          <TableList cupones={dataCupons} />
        </div>
      </main>
    </div>
  );
};

export default CuponesPage;