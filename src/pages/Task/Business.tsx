import { allTaskStatus, search } from "@/api";
import {
  AllTaskStatus,
  CurrentPageRecordsType,
  SearchParamsType,
} from "@/api/type";
import {
  Button,
  Input,
  Select,
  Table,
  TableColumnProps,
} from "@arco-design/web-react";
import { IconPlus, IconRefresh, IconSearch } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";

const Option = Select.Option;

export default function Operate() {
  type State = {
    status: AllTaskStatus[];
    dataList: CurrentPageRecordsType[];
    params: SearchParamsType;
  };
  const [state, setState] = useState<State>({
    status: [],
    dataList: [],
    params: {
      pageIndex: 1,
      pageSize: 15,
      isRepair: false,
      taskCode: "",
      status: "",
      totalCount: "",
    },
  });

  const columns: TableColumnProps[] = [
    {
      title: "序号",
      dataIndex: "name",
      render: (col, record, index) => index + 1,
    },
    {
      title: "工单编号",
      dataIndex: "taskCode",
    },
    {
      title: "设备编号",
      dataIndex: "innerCode",
    },
    {
      title: "工单类型",
      dataIndex: "taskType",
      render: (col, record, index) => {
        return col.typeName;
      },
    },
    {
      title: "工单方式",
      dataIndex: "createType",
      render: (col, record, index) =>
        record.createType == 1 ? "手动" : "自动",
    },
    {
      title: "工单状态",
      dataIndex: "taskStatus",
      render: (col, record, index) => {
        return state.status[record.taskStatus - 1].statusName;
      },
    },
    { title: "运营人员", dataIndex: "userName" },
    { title: "创建日期", dataIndex: "createTime" },
    {
      title: "操作",
      dataIndex: "",
      fixed: "right",
      width: "100px",
      headerCellStyle: { textAlign: "center" },
      render: (col, row, index) => (
        <Button type="text" onClick={() => showDetail(row)}>
          查看详情
        </Button>
      ),
    },
  ];

  const handleInputChange = (value: string) => {
    setState((state) => ({
      ...state,
      params: { ...state.params, taskCode: value },
    }));
  };

  const handleSelectChange = (value: string) => {
    let params = state.params;
    params.status = value;
    setState((state) => ({ ...state, params }));
  };

  const handleReset = () => {
    setState((state) => ({
      ...state,
      params: { ...state.params, taskCode: "", status: "" },
    }));
  };

  const getStatus = () => {
    allTaskStatus().then(({ data }) => {
      setState((state) => ({ ...state, status: data }));
    });
  };

  const getList = () => {
    search(state.params).then(({ data }) => {
      setState((state) => ({
        ...state,
        dataList: data.currentPageRecords,
        params: { ...state.params, totalCount: data.totalCount },
      }));
    });
  };

  const showDetail = (row: CurrentPageRecordsType) => {};

  // 分页变化时的回调；
  const handlePaginationChange = (pageIndex: number, pageSize: number) => {
    setState((state) => ({
      ...state,
      params: { ...state.params, pageIndex: pageIndex, pageSize },
    }));
  };

  // 当前页码发生变化时，重新请求数据
  useEffect(() => {
    getList();
  }, [state.params.pageIndex]);

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      <div className="bg-#fff p-10px">
        <p className="inline-block mr-10px">工单编号：</p>
        <Input
          placeholder="请输入"
          value={state.params.taskCode}
          style={{ width: "200px" }}
          onChange={handleInputChange}
        />
        <p className="inline-block mr-10px ml-20px">工单状态：</p>
        <Select
          placeholder="请选择"
          value={state.params.status}
          style={{ width: "200px" }}
          onChange={handleSelectChange}
        >
          {state.status.map((item) => (
            <Option key={item.statusId} value={item.statusId}>
              {item.statusName}
            </Option>
          ))}
        </Select>
        <Button
          className="ml-20px"
          type="primary"
          onClick={getList}
          icon={<IconSearch />}
        >
          查询
        </Button>
        <Button
          icon={<IconRefresh />}
          className="ml-10px"
          onClick={handleReset}
        >
          重置
        </Button>
      </div>
      <div className="content bg-#fff mt-20px p-10px">
        <div className="btn pb-20px pt-10px">
          <Button status="warning" icon={<IconPlus />}>
            新建
          </Button>
          <Button className="ml-10px">工单配置</Button>
        </div>
        <Table
          columns={columns}
          data={state.dataList}
          rowKey="taskId"
          pagination={{
            current: state.params.pageIndex,
            total: Number(state.params.totalCount) || 0,
            hideOnSinglePage: true,
            sizeCanChange: true,
            defaultPageSize: Number(state.params.pageSize),
            sizeOptions: [5, 10, 15, 20],
            onChange: handlePaginationChange,
          }}
        />
      </div>
    </>
  );
}
