import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { month } from "../../modal/model";
import { useUser } from "../../layout";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const Statistics = () => {
  const { open } = useUser();
  const completed = useSelector((state: RootState) => state.orders.completed);
  const rejected = useSelector((state: RootState) => state.orders.rejected);

  const statisticCount = useSelector(
    (state: RootState) => state.orders.statisticCount
  );

  return (
    <div
      className={`${
        open
          ? "w-[calc(100%-300px)] ml-[300px]"
          : "w-[calc(100%-100px)] ml-[100px]"
      } p-10 max-[750px]:w-full max-[750px]:ml-0 max-[750px]:p-5`}
    >
      <div className="mb-14">Statistics</div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={500}
          height={300}
          data={statisticCount[0] ? statisticCount[0] : month}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={22}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis
            type="number"
            domain={[0, 3]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip cursor={false} content={customTooltip} />
          <Bar dataKey="uv" fill="#87b6a1" />
          <Bar dataKey="pv" fill="#DB79A9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;

const customTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="bg-white p-3 text-sm grid gap-2 rounded-md">
        <div className="text-lg">
          <b>{label}</b>
        </div>
        <div className="text-[#87b6a1]">
          Order Completed : <b>{payload?.[0].value}</b>
        </div>
        <div className="text-[#DB79A9]">
          Order Rejected : <b>{payload?.[1].value}</b>
        </div>
      </div>
    );
  }
  return null;
};
