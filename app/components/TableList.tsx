import React from "react";
import { CuponI } from "../interfaces";

interface Prop {
  cupones: CuponI[] | [];
}

const TableList = ({ cupones }: Prop) => {
  console.log({ cupones });
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Código del Cupón
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          {cupones.map((cupon) => {
            return (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {cupon.code}
                  </th>
                  <td className="px-6 py-4">
                    {cupon.valid ? (
                      <span className="text-green-600 font-bold">
                        Disponible
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">Utilizado</span>
                    )}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;