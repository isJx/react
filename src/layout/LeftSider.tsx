import { Menu } from "@arco-design/web-react";
import {
  IconBulb,
  IconCommon,
  IconFile,
  IconHome,
  IconLocation,
  IconPrinter,
  IconStamp,
  IconStorage,
  IconUserGroup,
} from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LeftSider: React.FC = (props) => {
  const MenuItem = Menu.Item;
  const SubMenu = Menu.SubMenu;
  const navigate = useNavigate();
  const location = useLocation();

  type State = {
    defaultSelectedKeys: string[];
  };

  const [state, setState] = useState<State>({
    defaultSelectedKeys: [],
  });

  const handleClickMenuItem = (key: string) => {
    navigate(key);
  };

  useEffect(() => {
    setState({ defaultSelectedKeys: [location.pathname] });
  }, [location.pathname]);

  return (
    <div
      className="bg-blue select-none"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <Menu
        style={{ width: 200, height: "100%" }}
        hasCollapseButton
        selectedKeys={state.defaultSelectedKeys}
        onClickMenuItem={handleClickMenuItem}
      >
        <MenuItem key="/layout/home">
          <IconHome />
          帝可得
        </MenuItem>
        <SubMenu
          key="1"
          title={
            <>
              <IconFile /> 工单管理
            </>
          }
        >
          <MenuItem key="/layout/task/business">运营工单</MenuItem>
          <MenuItem key="/layout/task/operation">运维工单</MenuItem>
        </SubMenu>
        <SubMenu
          key="2"
          title={
            <>
              <IconLocation />
              点位管理
            </>
          }
        >
          <MenuItem key="/layout/node/region">区域管理</MenuItem>
          <MenuItem key="/layout/node/node">点位管理</MenuItem>
          <MenuItem key="/layout/node/partner">合作商管理</MenuItem>
        </SubMenu>
        <SubMenu
          key="3"
          title={
            <>
              <IconPrinter />
              设备管理
            </>
          }
        >
          <MenuItem key="/layout/vm/index">设备管理</MenuItem>
          <MenuItem key="/layout/vm/status">设备状态</MenuItem>
          <MenuItem key="/layout/vm/type">设备类型管理</MenuItem>
        </SubMenu>
        <SubMenu
          key="4"
          title={
            <>
              <IconUserGroup />
              人员管理
            </>
          }
        >
          <MenuItem key="/layout/user/index">人员管理</MenuItem>
          <MenuItem key="/layout/user/user-task-stats">人效列表</MenuItem>
          <MenuItem key="/layout/user/user-work">工作量列表</MenuItem>
        </SubMenu>
        <SubMenu
          key="5"
          title={
            <>
              <IconCommon />
              商品管理
            </>
          }
        >
          <MenuItem key="/layout/sku/sku-class">商品类型</MenuItem>
          <MenuItem key="/layout/sku/sku">商品管理</MenuItem>
        </SubMenu>
        <MenuItem key="/layout/policy/index">
          <IconBulb />
          策略管理
        </MenuItem>
        <MenuItem key="/layout/order/index">
          <IconStorage />
          订单管理
        </MenuItem>
        <MenuItem key="/layout/report/index">
          <IconStamp />
          对账管理
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LeftSider;
