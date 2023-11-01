import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Product from "./product";
import { BsCart4 } from "react-icons/bs";
import ProductCart from "../drawer/ProductCart";
import { FormProduct } from "../../modal/model";
import { useUser } from "../../layout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home = () => {
  const { open } = useUser();

  const [show, setShow] = useState<boolean>(false);

  const product = useSelector((state: RootState) => state.product.task);

  const [data, setData] = useState<FormProduct[]>(product);
  useEffect(() => {
    setData(product);
  }, [product]);

  const filterBySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === " ") {
      setData(product);
    } else {
      const filterItem = product.filter((item) => {
        return item.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setData(filterItem);
    }
  };

  return (
    <div
      className={`${
        open
          ? "w-[calc(100%-300px)] ml-[300px]"
          : "w-[calc(100%-100px)] ml-[100px]"
      } p-10 pr-5 overflow-y-auto max-[750px]:w-full max-[750px]:ml-0  max-[750px]:p-5`}
    >
      <div className="flex items-center justify-between">
        <span className="absolute pl-5 top-[51px] max-[750px]:top-[88px]">
          <AiOutlineSearch size={33} />
        </span>
        <input
          type="search"
          placeholder="Search"
          className="placeholder:text-black  rounded-xl border border-black/50 focus:outline-none py-3 pl-16 max-w-[14rem]"
          onChange={filterBySearch}
        />
        <BsCart4
          size={35}
          onClick={() => setShow(true)}
          style={{ cursor: "pointer" }}
        />
        {show && <ProductCart setShow={setShow} />}
      </div>
      <div className="mt-14">
        <Product data={data} />
      </div>
    </div>
  );
};

export default Home;
