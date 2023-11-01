import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  addCart,
  deleteProduct,
  totalCart,
} from "../../../redux/slice/ProductSlice";
import ProductEdit from "./ProductEdit";
import ProductCart from "../../drawer/ProductCart";
import { FormProduct } from "../../../modal/model";

interface props {
  data: FormProduct[];
}

const Product = ({ data }: props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [editId, setEdit] = useState<number>();

  const handleDelete = (id: number) => {
    alert("Are sure you want to delete?");
    dispatch(deleteProduct(id));
  };
  const handleOrder = (id: number) => {
    setToggle(true);
    dispatch(addCart(id));
    dispatch(totalCart());
  };
  const handleEdit = (id: number) => {
    setOpen(true);
    setEdit(id);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl">Product List</div>
        <button
          className="uppercase bg-[#F95E07] text-white rounded-md p-2"
          onClick={() => navigate("/home/add")}
        >
          Add New Product
        </button>
      </div>
      <div className="flex gap-10 mt-14 flex-wrap">
        {data?.map((val, index) => (
          <div
            key={index}
            className="h-1/2 w-72 border border-black/50 rounded-md bg-white p-6 flex flex-col gap-4"
          >
            <div className="h-56 product">
              <img src={`${val.image}`} alt="product" className="rounded-md" />
            </div>
            <div>
              <h1 className="text-xl font-medium">{val.title}</h1>
              <small className="text-sm text-slate-500">
                {val.description}
              </small>
            </div>
            <div className="flex justify-between">
              <p className="flex">Price: ₹{val.price}</p>
              <div className="flex gap-1 ">
                <AiFillEdit
                  size={22}
                  fill="#87b6a1"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(val.id)}
                />
                {open && val.id === editId && (
                  <ProductEdit setOpen={setOpen} todo={val} />
                )}
                <AiFillDelete
                  size={22}
                  fill="#db79a9"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(val.id)}
                />
              </div>
            </div>
            <button
              className="bg-black rounded text-white p-2 uppercase"
              onClick={() => handleOrder(val.id)}
            >
              Add To Cart
            </button>
            {toggle && <ProductCart setShow={setToggle} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
