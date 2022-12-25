import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <div>
      <div className="flex ">
        <div className="flex   w75% mr-20px">
          <div className="w60% bg-#e9f3ff mr-20px radius-20">工单统计</div>
          <div className="w40% bg-#fbefe8 radius-20">销售统计</div>
        </div>
        <div className="w25% bg-#fff radius-20">
          ff
          <p>ok</p>
          <p>ok</p>
          <p>ok</p>
          <p>ok</p>
          <p>ok</p>
          <p>ok</p>
        </div>
      </div>
    </div>
  );
}
