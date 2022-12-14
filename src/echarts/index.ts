// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";

import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  GridComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  TitleComponent,
  UniversalTransition,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  PieChart,
]);

export default echarts;
