import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import OrderAdd from "./OrderAdd";
import { useUser } from "../../layout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FormOrder } from "../../modal/model";

const Order = () => {
  const { open } = useUser();
  const orderList = useSelector((state: RootState) => state.orders.order);

  const [data, setData] = useState<FormOrder[]>(orderList);

  useEffect(() => {
    setData(orderList);
  }, [orderList]);

  const filterBySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setData(orderList);
    } else {
      const filterItem = orderList.filter((item) => {
        return Number(item.orderId) === Number(e.target.value);
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
      } p-10 max-[750px]:w-full max-[750px]:ml-0 max-[750px]:p-5`}
    >
      <div className="flex items-center justify-between">
        <span className="absolute pl-5 top-[51px] max-[750px]:top-[88px]">
          <AiOutlineSearch size={33} />
        </span>
        <input
          type="search"
          placeholder="Search"
          onChange={filterBySearch}
          className="placeholder:text-black  rounded-xl border border-black/50 focus:outline-none py-3 pl-16 w-64"
        />
      </div>
      <div className="mt-14">
        <OrderAdd data={data} />
      </div>
    </div>
  );
};

export default Order;
