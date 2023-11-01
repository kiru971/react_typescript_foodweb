import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AiOutlineClose } from "react-icons/ai";
import {
  decreaseQuantity,
  deleteCart,
  increaseQuantity,
  resetCart,
  resetTotal,
  totalCart,
} from "../../redux/slice/ProductSlice";
import { addOrder } from "../../redux/slice/OrderSlice";
import { useNavigate } from "react-router-dom";

interface props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductCart = ({ setShow }: props) => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.product.cart);
  const Total = useSelector((state: RootState) => state.product.cartTotal);

  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(deleteCart(id));
    dispatch(totalCart());
  };
  const handleIncrease = (id: number) => {
    dispatch(increaseQuantity(id));
    dispatch(totalCart());
  };
  const handleDecrease = (id: number) => {
    dispatch(decreaseQuantity(id));
    dispatch(totalCart());
  };
  const handlePlace = () => {
    alert("Please Confirm Your order");
    dispatch(addOrder(cart));
    dispatch(resetCart());
    dispatch(resetTotal());
    navigate("/order");
  };

  return (
    <div className="transition transform duration-700 ease-in-out delay-700 w-[400px] h-screen fixed right-0 inset-y-0 bg-black text-white flex justify-between flex-col">
      <div className="p-4 pb-0">
        <div className="flex justify-between my-10">
          <div className="text-xl">Product Cart</div>
          <AiOutlineClose
            onClick={() => setShow(false)}
            style={{ cursor: "pointer" }}
            size={20}
          />
        </div>
        {cart.length > 0 ? (
          cart?.map((val, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="h-20 w-20 rounded cart">
                    <img src={val.image} alt="cart" />
                  </div>
                  <div>
                    <div>{val.title}</div>
                    <small className="text-slate-500">{val.description}</small>
                    <div>Qty: {val.quantity}</div>
                  </div>
                </div>
                <div className="flex items-center flex-col gap-[2px]">
                  <AiOutlineClose
                    color="yellow"
                    onClick={() => handleRemove(val.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <div>₹ {val.price * (val.quantity || 0)}</div>
                  <div>
                    <button
                      className="bg-white text-black px-[5px]"
                      onClick={() => handleIncrease(val.id)}
                    >
                      +
                    </button>
                    <button
                      className="px-[7px] bg-slate-500"
                      onClick={() => handleDecrease(val.id)}
                      disabled={val.quantity === 1}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
              <hr className="my-5 border-slate-300/50 border" />
            </div>
          ))
        ) : (
          <div>Add some product in the cart :)</div>
        )}
      </div>
      <div className=" bg-[#1b1a20] h-40 p-3">
        <div className="mb-8 flex justify-between">
          <div className="text-xl text-slate-400">Total Price</div>
          <div>₹{Total.toFixed(2)}</div>
        </div>
        <button
          className="uppercase bg-black flex w-full py-2 justify-center rounded-md text-xl"
          onClick={handlePlace}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
