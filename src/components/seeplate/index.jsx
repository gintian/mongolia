import React, { useState } from "react";
import "./style.scss";
import Targetdata from "../Targetdata";
import Villa from "../Villa";

export default function SeePlate() {
  const [count, setCount] = useState(0);

  return (
    <div id="seePlate">
      <div className="seePlate_top">
        <div
          className={count === 0 ? "item acitve" : "item"}
          onClick={() => setCount(0)}
        >
          目标区数据看板
        </div>
        <div
          className={count === 1 ? "item acitve" : "item"}
          onClick={() => setCount(1)}
        >
          清远山庄数据看板
        </div>
      </div>
      <div className="seePlate_content">
        {count === 0 ? <Targetdata /> : null}
        {count === 1 ? <Villa /> : null}
      </div>
    </div>
  );
}
