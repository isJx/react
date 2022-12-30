import { collectReport, orderAmount, orderCount, skuTop } from "@/api";
import { useEffect, useState } from "react";

import "./index.css";

import { TopValueRes } from "@/api/type";
import dayjs from "dayjs";

export default function Home() {
  type State = {
    total: number;
    success: number;
    ing: number;
    clear: number;
    count: string;
    amount: string;
    topValue: TopValueRes[];
  };
  const [state, setState] = useState<State>({
    total: 0,
    success: 0,
    ing: 0,
    clear: 0,
    count: "",
    amount: "",
    topValue: [],
  });

  const init = () => {
    // 工单统计;
    collectReport(
      "2022-12-01 00:00:00",
      dayjs().format("YYYY-MM-DD 23:59:59")
    ).then(({ data }) => {
      let total = 0,
        success = 0,
        ing = 0,
        clear = 0;
      data.map((item) => {
        total += item.total || 0;
        success += item.completedTotal || 0;
        ing += item.progressTotal || 0;
        clear += item.cancelTotal || 0;
      });

      setState((state) => ({ ...state, total, success, ing, clear }));
    });

    orderCount(
      "2022-12-01 00:00:00",
      dayjs().format("YYYY-MM-DD 23:59:59")
    ).then(({ data }) => {
      setState((state) => ({ ...state, count: data }));
    });

    orderAmount(
      "2022-12-01 00:00:00",
      dayjs().format("YYYY-MM-DD 23:59:59")
    ).then(({ data }) => {
      const amount = (Number(data) / 10000).toFixed(2);
      setState((state) => ({ ...state, amount: amount }));
    });

    skuTop(10, "2022-12-01", dayjs().format("YYYY-MM-DD")).then(({ data }) => {
      setState((state) => ({ ...state, topValue: data }));
    });
  };

  const getIcon = (value: number) => {
    switch (value) {
      case 0:
        return "first";
      case 1:
        return "second";
      case 2:
        return "third";
      default:
        return "default";
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="flex ">
        <div className="flex   w75% mr-20px">
          <div className="work-item w60% bg-#e9f3ff mr-20px radius-20 p-20px h-126px">
            <p className="m-0px text-16px font-semibold">
              工单统计
              <span className="ml-10px text-12px c-#999 font-400">
                2022.12.01 ~ {dayjs().format("YYYY.MM.DD")}
              </span>
            </p>
            <div className="flex justify-around c-#072074 text-36px font-semibold mt-15px">
              <div className="item">
                <p>{state.total}</p>
                <p>工单总数（个）</p>
              </div>
              <div className="item">
                <p>{state.success}</p>
                <p>完成工单（个）</p>
              </div>
              <div className="item">
                <p>{state.ing}</p>
                <p>进行工单（个）</p>
              </div>
              <div className="item">
                <p>{state.clear}</p>
                <p>取消工单（个）</p>
              </div>
            </div>
          </div>

          <div className="count w40% bg-#fbefe8 box-border radius-20 h-126px p-20px ">
            <p className="m-0px text-16px font-semibold">
              销售统计
              <span className="ml-10px text-12px c-#999 font-400">
                2022.12.01 ~ {dayjs().format("YYYY.MM.DD")}
              </span>
            </p>
            <div className="flex justify-around c-#072074 text-36px font-semibold mt-15px">
              <div className="text-#ff5757">
                <p className="m-0px">{state.count}</p>
                <p className="text-#de9690 text-12px m-0px">订单量（个）</p>
              </div>
              <div className="text-#ff5757">
                <p className="m-0px">{state.amount}</p>
                <p className="text-#de9690 text-12px m-0px">销售额（万元）</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w25% bg-#fff radius-20 p-20px ">
          <p className="m-0px text-16px font-semibold">
            商品热榜
            <span className="ml-10px text-12px c-#999 font-400">
              2022.12.01 ~ {dayjs().format("YYYY.MM.DD")}
            </span>
          </p>
          {state.topValue.map((item, index) => {
            return (
              <div key={index} className="flex items-center my-17px">
                <div
                  className={
                    getIcon(index) +
                    " mr-10px w-25px h-25px text-center text-10px font-400 pt-3px"
                  }
                >
                  {index + 1}
                </div>
                <div className="flex flex-1 justify-between ">
                  <span className="font-500 c-#333">{item.skuName}</span>
                  <span className="text-#737589 text-14px font-400">
                    {item.count}单
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
