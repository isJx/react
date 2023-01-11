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
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const LeftSider: React.FC = (props) => {
  const MenuItem = Menu.Item;
  const SubMenu = Menu.SubMenu;
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

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
        style={{ minWidth: 200, height: "100%" }}
        hasCollapseButton
        selectedKeys={state.defaultSelectedKeys}
        onClickMenuItem={handleClickMenuItem}
      >
        <MenuItem key="/layout/home">
          <IconHome />
          {t("帝可得")}
        </MenuItem>
        <SubMenu
          key="1"
          title={
            <>
              <IconFile /> {t("工单管理")}
            </>
          }
        >
          <MenuItem key="/layout/task/business">{t("运营工单")}</MenuItem>
          <MenuItem key="/layout/task/operation">{t("运维工单")}</MenuItem>
        </SubMenu>
        <SubMenu
          key="2"
          title={
            <>
              <IconLocation />
              {t("点位管理")}
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
              {t("设备管理")}
            </>
          }
        >
          <MenuItem key="/layout/vm/index">{t("设备管理")}</MenuItem>
          <MenuItem key="/layout/vm/status">{t("设备状态")}</MenuItem>
          <MenuItem key="/layout/vm/type">{t("设备类型管理")}</MenuItem>
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
              {t("商品管理")}
            </>
          }
        >
          <MenuItem key="/layout/sku/sku-class">{t("商品类型")}</MenuItem>
          <MenuItem key="/layout/sku/sku">{t("商品管理")}</MenuItem>
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
