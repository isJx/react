import { regionSearch } from "@/api";
import { RegionSearchReq, TableData } from "@/api/type";
import {
  Button,
  Input,
  Notification,
  Table,
  TableColumnProps,
} from "@arco-design/web-react";
import { RefInputType } from "@arco-design/web-react/es/Input/interface";
import { IconPlus, IconSearch } from "@arco-design/web-react/icon";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import ChangeComponent from "./components/ChangeComponent";

const ButtonGroup = Button.Group;

export default function Region() {
  const { t } = useTranslation();
  const inputRef = useRef<RefInputType>(null);

  type State = {
    params: RegionSearchReq;
    data: TableData[];
    totalCount: number;
    modalVisible: boolean;
    currentItemData: TableData;
  };

  const [state, setState] = useState<State>({
    params: { pageIndex: 1, pageSize: 10, name: "" },
    data: [],
    totalCount: 0,
    modalVisible: false,
    currentItemData: {},
  });

  const columns: TableColumnProps[] = [
    {
      title: "序号",
      render(col, item, index) {
        return index + 1;
      },
    },
    { title: "区域名称", dataIndex: "name" },
    { title: "点位数", dataIndex: "nodeCount" },
    { title: "备注说明", dataIndex: "remark" },
    {
      title: "操作",
      width: "250px",
      fixed: "right",
      render(col, item, index) {
        return Operate(item);
      },
    },
  ];

  const handleSearch = () => {
    setState((state) => ({
      ...state,
      params: { ...state.params, name: inputRef.current?.dom.value },
    }));
  };

  const init = () => {
    regionSearch(state.params).then(({ data }) => {
      setState((state) => ({
        ...state,
        data: data.currentPageRecords,
        totalCount: Number(data.totalCount),
      }));
    });
  };

  const handleDelete = () => {
    Notification.error({
      title: "提示",
      content: "演示系统，不支持此操作！",
    });
  };

  const handlePaginationChange = (pageNumber: number, pageSize: number) => {
    setState((state) => ({
      ...state,
      params: { ...state.params, pageIndex: pageNumber },
    }));
  };

  const handleChange = (item: TableData) => {
    setState((state) => ({
      ...state,
      modalVisible: true,
      currentItemData: item,
    }));
  };

  const updateModal = () => {
    setState((state) => ({ ...state, modalVisible: false }));
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [state.params.pageIndex, state.params.name]);

  function Operate(item: TableData) {
    return (
      <ButtonGroup>
        <Button type="text">查看详情</Button>
        <Button type="text" onClick={() => handleChange(item)}>
          修改
        </Button>
        <Button type="text" status="danger" onClick={handleDelete}>
          删除
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <>
      <div className="bg-#fff p-10px">
        <p className="mr-10px inline-block">{t("区域搜索")}：</p>
        <Input className="w250px mr-10px" allowClear ref={inputRef} />
        <Button type="primary" icon={<IconSearch />} onClick={handleSearch}>
          {t("查询")}
        </Button>
      </div>
      <div className="bg-#fff mt-20px p-10px box-border">
        <Button status="warning" icon={<IconPlus />}>
          {t("新建")}
        </Button>
        <div className="mt-10px">
          <Table
            columns={columns}
            data={state.data}
            rowKey="id"
            pagination={{
              total: state.totalCount,
              current: state.params.pageIndex,
              onChange: handlePaginationChange,
            }}
          />
        </div>
      </div>
      {state.modalVisible ? (
        <ChangeComponent
          updateModal={updateModal}
          currentItemData={state.currentItemData}
          init={init}
        />
      ) : (
        ""
      )}
    </>
  );
}
