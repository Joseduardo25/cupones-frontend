interface DataI {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  store: string;
  typeDocument: string;
  numberDocument: string;
  cuopon: string;
}

export const saveRegisterCoupon = async (data: DataI) => {
  try {
    // console.log(`http://localhost:5050/api/v1/user`);
    const response = await fetch(
      `https://cupona-app-server-production.up.railway.app/api/v1/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const dataResponse = await response.json();
    console.log(dataResponse);
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
