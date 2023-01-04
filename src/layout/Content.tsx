import { Outlet } from "react-router-dom";

const Content: React.FC = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
      }}
      className="p20px box-border"
    >
      <Outlet />
    </div>
  );
};

export default Content;
