import React from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { FormProduct } from "./model";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface props {
  onSubmit: SubmitHandler<FormProduct>;
  todo?: FormProduct;
}

const ProductForm = ({ onSubmit, todo }: props) => {
  const schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    image: yup.mixed().test("required", "Image is Required", (value) => {
      if (value) return true;
      return false;
    }),
    price: yup.number().positive().integer().required("Price is Required"),
    quantity: yup.number(),
    id: yup.number(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProduct>({
    resolver: yupResolver(schema) as Resolver<FormProduct, any>,
  });
  console.log(errors);
  return (
    <form
      className="mt-10 flex flex-col gap-8 form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-10 w-full">
        <div className="flex-1">
          <div className="mb-2">
            <label className="text-lg">Product Name</label>
          </div>
          <input
            defaultValue={todo?.title}
            {...register("title")}
            type="text"
            className={`p-2 mb-1 w-full border ${
              errors.title?.message ? "border-red-500" : "border-black/50"
            }  rounded focus:outline-none`}
          />
          {errors.title?.message && (
            <small className="text-[16px]">{errors.title.message}</small>
          )}

          <div className="mb-2 mt-5">
            <label className="text-lg">Description</label>
          </div>
          <textarea
            defaultValue={todo?.description}
            {...register("description")}
            className={`p-3 w-full border ${
              errors.description?.message ? "border-red-500" : "border-black/50"
            } rounded focus:outline-none`}
          />
          {errors.description?.message && (
            <small className="text-[16px]">{errors.description.message}</small>
          )}

          <div className="mb-2 mt-5">
            <label className="text-lg">Price</label>
          </div>
          <input
            defaultValue={todo?.price}
            {...register("price")}
            type="number"
            className={`p-2 w-full border ${
              errors.price?.message ? "border-red-500" : "border-black/50"
            } rounded focus:outline-none`}
          />
          {errors.price?.message && (
            <small className="text-[16px]">
              {errors.price.message && "Price is required"}
            </small>
          )}
        </div>
        <div className="flex-1">
          <div>
            <label className="text-lg">Product Image</label>
          </div>
          <input
            {...register("image")}
            type="file"
            className="p-2 pl-0 w-full"
          />
          {errors.image?.message && (
            <small className="text-[16px]">Image is Required</small>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#F95E07] text-white p-2 text-xl rounded"
      >
        SUBMIT
      </button>
    </form>
  );
};

export default ProductForm;
