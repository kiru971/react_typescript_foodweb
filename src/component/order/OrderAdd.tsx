import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FormOrder, FormProduct } from "../../modal/model";
import { IoMdClose } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
import { GiBackwardTime } from "react-icons/gi";
import {
  addCompletedOrder,
  addOrderbymonth,
  addRejectedOrder,
  updateOrder,
} from "../../redux/slice/OrderSlice";
import moment from "moment";

interface props {
  data: FormOrder[];
}

const OrderAdd = ({ data }: props) => {
  const orderList = useSelector((state: RootState) => state.orders.order);
  const dispatch = useDispatch();

  const handleReject = (item: FormOrder) => {
    alert("Your order has been cancelled");
    let id = item.orderId;
    let status = "Rejected";
    const createdAt = moment().format("ll h:mm a");
    let task = { id, status, createdAt };
    dispatch(updateOrder(task));
    dispatch(addRejectedOrder(task));
    dispatch(addOrderbymonth());
  };

  const handleStatus = (item: FormOrder) => {
    alert("Your order is successfully completed");
    let id = item.orderId;
    let status = "Completed";
    const createdAt = moment().format("ll h:mm a");
    let task = { id, status, createdAt };
    dispatch(updateOrder(task));
    dispatch(addCompletedOrder(task));
    dispatch(addOrderbymonth());
  };

  return (
    <>
      <div className="text-xl">Order List</div>
      <div className="my-5 flex flex-wrap gap-y-2">
        {orderList?.map((item) => (
          <div
            key={item.orderId}
            className={`border p-2 mr-4 flex  items-center gap-3 text-xl rounded-md ${
              item.status === "InProgress"
                ? "border-yellow-500 text-yellow-500"
                : item.status === "Completed"
                ? "border-[#87b6a1] text-[#87b6a1]"
                : "border-[#DB79A9] text-[#DB79A9]"
            }`}
          >
            {item.status === "InProgress" ? (
              <GiBackwardTime fill="rgb(234 179 8)" size={25} />
            ) : item.status === "Completed" ? (
              <AiOutlineCheck fill="#87b6a1" size={25} />
            ) : (
              <IoMdClose fill="#DB79A9" size={25} />
            )}
            #{item.orderId}
          </div>
        ))}
      </div>
      <div className="mt-10 flex gap-10 flex-wrap">
        {data?.map((item) => {
          return (
            <div key={item.orderId}>
              <div className="h-96 w-72 border border-black/50 rounded-md bg-white p-3 pb-5 flex flex-col gap-4">
                <div className="flex flex-col font-medium mb-3">
                  Order # {item.orderId}
                  <small className="text-[#797b7e] font-normal">
                    {item.createdAt}
                  </small>
                </div>
                <div className="h-[200px] overflow-y-auto">
                  {item.data.map((val: FormProduct, index: number) => {
                    return (
                      <div key={val.id}>
                        <div className="flex gap-3 mb-3">
                          <div className="h-20 w-20">
                            <img
                              src={val.image}
                              alt="order"
                              className="rounded-full"
                            />
                          </div>
                          <div className="w-[calc(100%-75px)]">
                            <div>{val.title}</div>
                            <div className="text-sm text-[#797b7e] mt-[2px]">
                              {val.description}
                            </div>
                            <div className="flex text-sm justify-between pt-1">
                              <p>₹{val.price * (val.quantity || 0)}</p>
                              <p>Qty: {val.quantity}</p>
                            </div>
                          </div>
                        </div>
                        {index < item.data.length - 1 && (
                          <hr
                            className={`${
                              index < item.data.length - 1 ? "ml-20" : ""
                            } border-[1.5px] mb-3`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <hr className="border-[1.5px]" />
                <div className="flex justify-between">
                  <div className="text-sm text-[#797b7e]">
                    x{item.data.length}Items
                  </div>
                  <div className="flex">
                    <div className="mr-3">
                      {item.status !== "Completed" && (
                        <button
                          className="border border-[#DB79A9] p-1 px-[7px] rounded-md  flex items-center gap-2 text-[#DB79A9]"
                          onClick={() => handleReject(item)}
                          disabled={item.status !== "InProgress"}
                        >
                          <IoMdClose fill="#DB79A9" size={25} />
                          {item.status === "Rejected" && (
                            <div className="text-sm">REJECTED</div>
                          )}
                        </button>
                      )}
                    </div>
                    <div>
                      {item.status !== "Rejected" && (
                        <button
                          className="border border-[#87b6a1] p-1 px-[7px] rounded-md flex items-center gap-2 text-[#87b6a1]"
                          onClick={() => handleStatus(item)}
                          disabled={item.status !== "InProgress"}
                        >
                          <AiOutlineCheck fill="#87b6a1" size={25} />
                          {item.status === "Completed" && (
                            <div className="text-sm">COMPLETED</div>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderAdd;
