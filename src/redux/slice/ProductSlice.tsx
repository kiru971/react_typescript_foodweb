import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FormProduct {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  quantity?: number;
}

const initialState = {
  task: [
    {
      id: 1,
      title: "Vegetable Mixups",
      description: "Vegetable Fritters with Egg",
      price: 100,
      image: "../mix-veg-recipe-2.jpg",
    },
  ] as FormProduct[],
  cart: [] as FormProduct[],
  cartTotal: 0 as number,
};

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<FormProduct>) => {
      state.task.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.task = state.task.filter((val) => val.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<FormProduct>) => {
      state.task = state.task.map((val) =>
        val.id === action.payload.id ? action.payload : val
      );
    },
    addCart: (state, action: PayloadAction<number>) => {
      const data = state.task.find((item) => item.id === action.payload);
      if (data) {
        if (state.cart.find((index) => index.id === data.id)) {
          state.cart = state.cart.map((index) =>
            index.id === data.id
              ? { ...index, quantity: index.quantity && index.quantity + 1 }
              : index
          );
        } else {
          let task = { ...data, quantity: 1 };
          state.cart.push(task);
        }
      }
    },
    deleteCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    resetCart: (state) => {
      state.cart = [];
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      if (state.cart.find((index) => index.id === action.payload)) {
        state.cart = state.cart.map((index) =>
          index.id === action.payload
            ? { ...index, quantity: index.quantity && index.quantity + 1 }
            : index
        );
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      if (state.cart.find((index) => index.id === action.payload)) {
        state.cart = state.cart.map((index) =>
          index.id === action.payload
            ? { ...index, quantity: index.quantity && index.quantity - 1 }
            : index
        );
      }
    },
    totalCart: (state) => {
      let total = [];
      total = state.cart?.map((val) => {
        let ter = 0;
        if (val.price) {
          let price = val.price * (val.quantity || 0);
          ter += price;
          return ter;
        }
        return 0;
      });
      let total1 =
        total.length > 0 &&
        total?.reduce(
          (val: number | undefined, curr: number | undefined) =>
            (val = (val || 0) + (curr || 0))
        );
      state.cartTotal = (total1 && total1) || 0;
    },
    resetTotal: (state) => {
      state.cartTotal = 0;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  addCart,
  deleteCart,
  increaseQuantity,
  decreaseQuantity,
  totalCart,
  resetCart,
  resetTotal,
} = ProductSlice.actions;
export default ProductSlice.reducer;
