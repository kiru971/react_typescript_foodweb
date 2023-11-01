export type FormProduct = {
  id: number;
  title: string;
  image: any;
  description: string;
  price: number;
  quantity?: number;
};
export interface FormOrder {
  orderId: number;
  data: [];
  status: string;
  createdAt: string;
}

export interface props {
  open?: boolean;
  show?: boolean;
  handleClose?: () => void;
  handleShow?: () => void;
}

export interface FormComplete {
  id: number;
  status: string;
  createdAt: string;
}

export interface FormCompleted {
  id: number;
  status: string;
}

export interface Completed {
  data: FormCompleted[];
  createdAt: string;
}

export interface MonthFormat {
  name: string;
  uv: number;
  pv: number;
}

export const month: MonthFormat[] = [
  {
    name: "Jan",
    uv: 0,
    pv: 0,
  },
  {
    name: "Feb",
    uv: 0,
    pv: 0,
  },
  {
    name: "Mar",
    uv: 0,
    pv: 0,
  },
  {
    name: "Apr",
    uv: 0,
    pv: 0,
  },
  {
    name: "May",
    uv: 0,
    pv: 0,
  },
  {
    name: "Jun",
    uv: 0,
    pv: 0,
  },
  {
    name: "Jul",
    uv: 0,
    pv: 0,
  },
  {
    name: "Aug",
    uv: 0,
    pv: 0,
  },
  {
    name: "Sep",
    uv: 0,
    pv: 0,
  },
  {
    name: "Oct",
    uv: 0,
    pv: 0,
  },
  {
    name: "Nov",
    uv: 0,
    pv: 0,
  },
  {
    name: "Dec",
    uv: 0,
    pv: 0,
  },
];
