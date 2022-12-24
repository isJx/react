import { Menu } from "@arco-design/web-react";
import { IconBug, IconHome } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LeftSider: React.FC = () => {
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
    <div className="bg-blue " style={{ height: "calc(100vh - 60px)" }}>
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
