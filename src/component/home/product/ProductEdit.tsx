import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../redux/slice/ProductSlice";
import { FormProduct } from "../../../modal/model";
import ProductForm from "../../../modal/ProductForm";

interface props {
  todo: FormProduct;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductEdit = ({ setOpen, todo }: props) => {
  const dispatch = useDispatch();
  const { reset } = useForm();

  const onSubmit: SubmitHandler<FormProduct> = (data) => {
    data = { ...data, image: URL.createObjectURL(data.image[0]), id: todo.id };
    dispatch(updateProduct(data));
    setOpen(false);
    reset();
  };

  console.log(todo);

  return (
    <div className="bg-opacity-25 bg-black backdrop-blur-sm fixed inset-0 flex justify-center items-center">
      <div className="w-[550px] bg-white rounded-md p-5">
        <div className="flex justify-between mb-3 ">
          <h1 className="text-2xl font-medium">Edit</h1>
          <MdClose
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <hr />
        <ProductForm onSubmit={onSubmit} todo={todo} />
      </div>
    </div>
  );
};

export default ProductEdit;
