import {
  amountCollect,
  collectReport,
  nodeCollect,
  nodeCount,
  orderAmount,
  orderCount,
  partnerCount,
  regionCollect,
  skuTop,
} from "@/api";
import { useEffect, useState } from "react";

import "./index.css";

import { TopValueRes } from "@/api/type";
import { Radio } from "@arco-design/web-react";
import dayjs from "dayjs";

import echarts from "@/echarts";

const RadioGroup = Radio.Group;

export default function Home() {
  type State = {
    total: number;
    success: number;
    ing: number;
    clear: number;
    count: string;
    amount: string;
    topValue: TopValueRes[];
    nodeCount: number;
    partnerCount: number;
  };
  const [state, setState] = useState<State>({
    total: 0,
    success: 0,
    ing: 0,
    clear: 0,
    count: "",
    amount: "",
    topValue: [],
    nodeCount: 0,
    partnerCount: 0,
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

    // 商品热榜
    skuTop(10, "2022-12-01", dayjs().format("YYYY-MM-DD")).then(({ data }) => {
      setState((state) => ({ ...state, topValue: data }));
    });

    nodeCollect().then(({ data }) => {
      var myChart = echarts.init(document.getElementById("partner")!);
      myChart.setOption({
        toolbox: {
          show: true,
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/>总占比: {d}%",
        },
        series: [
          {
            type: "pie",
            radius: [20, 150],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data,
          },
        ],
      });
    });

    nodeCount().then(({ data }) => {
      setState((state) => ({ ...state, nodeCount: data }));
    });

    partnerCount().then(({ data }) => {
      setState((state) => ({ ...state, partnerCount: data }));
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

  const handleRadioChange = (value: string) => {
    if (value === "周") {
      getAmountCollect();
      getRegionCollect();
    }
    if (value === "月") {
      getAmountCollect(
        dayjs().format("YYYY-MM-01"),
        dayjs().format("YYYY-MM-DD")
      );
      getRegionCollect(
        dayjs().format("YYYY-MM-01"),
        dayjs().format("YYYY-MM-DD")
      );
    }
  };

  const renderAmountCollectEcharts = (series: number[], xAxis: string[]) => {
    let chartDom = document.getElementById("main")!;

    // 查看实例是否存在
    let echartsInstance = echarts.getInstanceByDom(chartDom);
    if (echartsInstance) {
      echartsInstance.dispose();
    }

    let myChart = echarts.init(chartDom);

    myChart.setOption({
      title: {
        left: "center",
        text: "销售额趋势图",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        boundaryGap: false,
        type: "category",
        data: xAxis,
      },
      yAxis: {
        name: "单位：元",
        type: "value",
      },
      series: [
        {
          data: series,
          symbol: "circle",
          symbolSize: 5,
          itemStyle: {
            color: "#FF0000",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(213,72,120,0.7)",
              },
              {
                offset: 1,
                color: "rgba(213,72,120,0.05)",
              },
            ]),
          },
          type: "line",
          smooth: true, //平滑折线图
        },
      ],
    });
  };

  const renderRegionCollectEcharts = (series: number[], xAxis: string[]) => {
    let chartDom2 = document.getElementById("main2")!;

    let echartsInstance2 = echarts.getInstanceByDom(chartDom2);
    if (echartsInstance2) {
      echartsInstance2.dispose();
    }

    let myChart2 = echarts.init(chartDom2);

    myChart2.setOption({
      title: [
        {
          left: "center",
          text: "销售额分布",
        },
      ],
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: series,
          type: "bar",
          barWidth: "10%",
        },
      ],
    });
  };

  // 获取销售数据
  const getAmountCollect = (
    startTime: string = dayjs()
      .startOf("week")
      .add(1, "day")
      .format("YYYY-MM-DD"),
    endTime: string = dayjs().format("YYYY-MM-DD")
  ) => {
    amountCollect(1, startTime, endTime).then(({ data }) => {
      const xAxis = data.xAxis.map((item) => {
        const week = dayjs(item).day();
        switch (week) {
          case 1:
            return "星期一";
          case 2:
            return "星期二";
          case 3:
            return "星期三";
          case 4:
            return "星期四";
          case 5:
            return "星期五";
          case 6:
            return "星期六";
          default:
            return "星期日";
        }
      });
      const series = data.series.map((item) => item / 100);
      renderAmountCollectEcharts(series, xAxis);
    });
  };

  const getRegionCollect = (
    startTime: string = dayjs()
      .startOf("week")
      .add(1, "day")
      .format("YYYY-MM-DD"),
    endTime: string = dayjs().format("YYYY-MM-DD")
  ) => {
    regionCollect(startTime, endTime).then(({ data }) => {
      const series = data.series.map((item) => item / 100);
      renderRegionCollectEcharts(series, data.xAxis);
    });
  };

  useEffect(() => {
    init();
    getAmountCollect();
    getRegionCollect();
  }, []);

  return (
    <div>
      <div className="flex items-start">
        <div className="flex w75% flex-wrap pr-20px">
          <div className="work-item w58% bg-#e9f3ff radius-20 p-20px h-206px box-border mr-2%">
            <p className="m-0px text-16px font-semibold">
              工单统计
              <span className="ml-10px text-12px c-#999 font-400">
                2022.12.01 ~ {dayjs().format("YYYY.MM.DD")}
              </span>
            </p>
            <div className="flex justify-around c-#072074 text-36px font-semibold mt-30px">
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

          <div className="count w40% bg-#fbefe8 box-border radius-20 h-206px p-20px ">
            <p className="m-0px text-16px font-semibold">
              销售统计
              <span className="ml-10px text-12px c-#999 font-400">
                2022.12.01 ~ {dayjs().format("YYYY.MM.DD")}
              </span>
            </p>
            <div className="flex justify-around c-#072074 text-36px font-semibold mt-30px">
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

          <div className="mt-20px radius-20 bg-#fff w-100% h-425px p-20px box-border overflow-hidden">
            <div className="flex justify-between">
              <p className="m-0 text-16px font-semibold">
                销售数据
                <span className="ml-10px text-12px c-#999 font-400">
                  2022.12.01 ~ {dayjs().format("YYYY.MM.DD")}
                </span>
              </p>
              <RadioGroup
                onChange={handleRadioChange}
                type="button"
                size="small"
                defaultValue="周"
              >
                <Radio value="周">周</Radio>
                <Radio value="月">月</Radio>
              </RadioGroup>
            </div>
            <div className="flex justify-between h100%">
              <div id="main" className="w49%"></div>
              <div id="main2" className="w49%"></div>
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
              <div key={index} className="flex items-center my-28px">
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
      <div className="flex mt-20px justify-between">
        <div className="w60% mr-20px radius-20 bg-#fff p-20px box-border">
          <p className="m-0 text-16px font-semibold">合作商点位数Top5</p>
          <div className="flex items-center">
            <div id="partner" className="h400px w70%"></div>
            <div className="flex flex-col justify-center info">
              <p className="m-0 mb-5px text-20px pl-35px font-600">
                {state.nodeCount}
              </p>
              <p className="m-0 mb-20px  pl-35px text-12px">点位数</p>
              <p className="m-0 mb-5px text-20px pl-35px font-600">
                {state.partnerCount}
              </p>
              <p className="m-0 mb-5px  pl-35px text-12px">合作商数</p>
            </div>
          </div>
        </div>

        <div className="w40% radius-20 bg-#fff"></div>
      </div>
    </div>
  );
}
