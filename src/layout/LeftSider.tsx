import { Menu } from "@arco-design/web-react";
import { IconBug, IconHome } from "@arco-design/web-react/icon";
import { useLocation, useNavigate } from "react-router-dom";

const LeftSider: React.FC = () => {
  const MenuItem = Menu.Item;
  const SubMenu = Menu.SubMenu;
  const navigate = useNavigate();
  const location = useLocation();

  let defaultSelectedKeys: string[] = [];

  const handleClickMenuItem = (key: string) => {
    navigate(key);
  };

  defaultSelectedKeys = [location.pathname];
  return (
    <div className="bg-blue " style={{ height: "calc(100vh - 60px)" }}>
      <Menu
        style={{ width: 200, height: "100%" }}
        hasCollapseButton
        defaultSelectedKeys={defaultSelectedKeys}
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
              <IconBug /> 工单管理
            </>
          }
        >
          <MenuItem key="/layout/task/business">运营工单</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default LeftSider;
