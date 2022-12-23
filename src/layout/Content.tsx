import { Outlet } from "react-router-dom";

const Content: React.FC = () => {
  return (
    <div style={{ height: "calc(100vh - 60px)" }}>
      <Outlet />
    </div>
  );
};

export default Content;
