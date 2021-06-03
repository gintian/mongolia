import React, { useState } from "react";
import "./style.scss";
// import Commission from '../Commission'
// import Basesituation from '../Basesituation'

export default function SeePlate() {
  const [count, setCount] = useState(1);

  return (
    <div id="seePlate">
      <div className="seePlate_top">
        <div
          className={count === 1 ? "item acitve" : "item"}
          onClick={() => setCount(1)}
        >
          目标区数据看板
        </div>
        <div
          className={count === 0 ? "item acitve" : "item"}
          onClick={() => setCount(0)}
        >
          清远山庄数据看板
        </div>
      </div>
      {/* <div className="seePlate_content">
        {count === 0 ? <Commission /> : null}
        {count === 1 ? <Basesituation /> : null}
      </div> */}
    </div>
  );
}
