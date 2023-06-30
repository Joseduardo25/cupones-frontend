import React from "react";

interface Prop {
  children: JSX.Element[] | JSX.Element;
}

const Modal = ({ children }: Prop) => {
  return (
    <div className="absolute h-5/6 top-10 left-10 right-10 backdrop-blur ">
      <div className="flex items-center justify-center h-full p-4 bg-transparent bg-white rounded-xl blur-none">
        {children}
      </div>
    </div>
  );
};

export default Modal;
