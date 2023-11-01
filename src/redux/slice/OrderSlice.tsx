import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Completed,
  FormComplete,
  FormOrder,
  FormProduct,
  MonthFormat,
  month,
} from "../../modal/model";
import moment from "moment";

const initialState = {
  order: [] as FormOrder[],
  completed: [] as Completed[],
  rejected: [] as Completed[],
  statisticCount: [] as MonthFormat[][],
};

const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<FormProduct[]>) => {
      const createdAt = moment().format("ll h:mm a");
      let task = {
        data: Object.assign(action.payload),
        orderId: state.order.length + 1,
        status: "InProgress",
        createdAt: createdAt,
      };
      state.order.push(task);
    },
    updateOrder: (state, action: PayloadAction<FormComplete>) => {
      state.order = state.order.map((val) =>
        val.orderId === action.payload.id
          ? {
              ...val,
              status: action.payload.status,
              createdAt: action.payload.createdAt,
            }
          : val
      );
    },
    addCompletedOrder: (state, action: PayloadAction<FormComplete>) => {
      if (
        state.completed.find((val: Completed) =>
          action.payload.createdAt.includes(val.createdAt)
        )
      ) {
        state.completed = state.completed.map((item: Completed) =>
          action.payload.createdAt.includes(item.createdAt)
            ? {
                ...item,
                data: [
                  ...item.data,
                  {
                    id: action.payload.id,
                    status: action.payload.status,
                  },
                ],
              }
            : item
        );
      } else {
        let task = {
          data: [
            {
              id: action.payload.id,
              status: action.payload.status,
            },
          ],
          createdAt: action.payload.createdAt.split(" ")[0],
        };
        console.log(task);
        state.completed.push(task);
      }
    },
    addRejectedOrder: (state, action: PayloadAction<FormComplete>) => {
      if (
        state.rejected.find((val: Completed) =>
          action.payload.createdAt.includes(val.createdAt)
        )
      ) {
        state.rejected = state.rejected.map((item: Completed) =>
          action.payload.createdAt.includes(item.createdAt)
            ? {
                ...item,
                data: [
                  ...item.data,
                  {
                    id: action.payload.id,
                    status: action.payload.status,
                  },
                ],
              }
            : item
        );
      } else {
        let task = {
          data: [{ id: action.payload.id, status: action.payload.status }],
          createdAt: action.payload.createdAt.split(" ")[0],
        };
        console.log(task);
        state.rejected.push(task);
      }
    },
    addOrderbymonth: (state) => {
      if (state.completed.length > 0) {
        let task1: MonthFormat[][] = state.completed.map((index: Completed) =>
          month.map((item: MonthFormat) =>
            index.createdAt == item.name
              ? { ...item, uv: index.data.length }
              : item
          )
        );
        console.log(task1);
        let task2: MonthFormat[][] =
          state.rejected.length > 0
            ? state.rejected.map((index: Completed) =>
                task1[0].map((item: any) =>
                  index.createdAt.includes(item.name)
                    ? { ...item, pv: index.data.length }
                    : item
                )
              )
            : task1;
        console.log(task2[0]);
        if (state.statisticCount.length > 0) {
          state.statisticCount = state.statisticCount.map(
            (val: MonthFormat[]) =>
              val.length > 0 && task2[0] ? task2[0] : val
          );
        } else {
          state.statisticCount.push(task2[0]);
        }
      } else {
        let task1: MonthFormat[][] = state.rejected.map((index: Completed) =>
          month.map((item: MonthFormat) =>
            index.createdAt.includes(item.name)
              ? { ...item, pv: index.data.length }
              : item
          )
        );
        console.log(task1);
        let task2: MonthFormat[][] =
          state.completed.length > 0
            ? state.completed.map((index: Completed) =>
                task1[0].map((item: any) =>
                  index.createdAt.includes(item.name)
                    ? { ...item, uv: index.data.length }
                    : item
                )
              )
            : task1;
        console.log(task2[0]);
        if (state.statisticCount.length > 0) {
          state.statisticCount = state.statisticCount.map(
            (val: MonthFormat[]) =>
              val.length > 0 && task2[0] ? task2[0] : val
          );
        } else {
          state.statisticCount.push(task2[0]);
        }
      }
    },
  },
});

export const {
  addOrder,
  updateOrder,
  addCompletedOrder,
  addRejectedOrder,
  addOrderbymonth,
} = OrderSlice.actions;
export default OrderSlice.reducer;
