import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/slice/ProductSlice";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../modal/ProductForm";
import { FormProduct } from "../../../modal/model";
import { useUser } from "../../../layout";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reset } = useForm<FormProduct>();
  const { open } = useUser();

  const onSubmit: SubmitHandler<FormProduct> = (data) => {
    console.log(data.image);

    data = {
      ...data,
      image: URL.createObjectURL(data.image[0]),
      id: Date.now(),
    };
    dispatch(addProduct(data));
    reset();
    navigate("/home");
  };

  return (
    <div
      className={`${
        open
          ? "w-[calc(100%-300px)] ml-[300px]"
          : "w-[calc(100%-100px)] ml-[100px]"
      } flex justify-center items-center p-10 h-screen max-[750px]:w-full max-[750px]:ml-0  max-[750px]:p-5`}
    >
      <div className="border border-black/50 p-8 rounded w-[900px]">
        <div className="text-2xl font-medium">Add Product</div>
        <ProductForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ProductAdd;
