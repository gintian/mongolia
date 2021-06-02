import React, { useState, useEffect } from "react";
import "./style.scss";

function Header() {
  const [timeNow, setTime] = useState();

  const navModule = [
    {
      modules_name: "资源图谱",
    },
    {
      modules_name: "视频监控",
    },
    {
      modules_name: "人脸应用",
    },
    {
      modules_name: "门禁应用",
    },

    {
      modules_name: "实时定位",
    },
    {
      modules_name: "电子巡更",
    },
    {
      modules_name: "消防管理",
    },
    {
      modules_name: "数据看板",
    },
  ];

  useEffect(() => {
    showtime();
  });
  // move time
  const showtime = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var time =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    setTime(time);
    setTimeout(showtime, 1000);
  };

  return (
    <div className="header">
      <div className="header_line"></div>
      <div className="header_content">
        <div className="fogemt">
          <div className="header_c_title">
            <div className="title_left">
              <h1>内蒙古纪委监委智慧留置区</h1>
              <img
                src={require("../../assets/header_img/title_light.png").default}
                alt="light_bg"
              />
            </div>
            <div className="title_right_img">
              <img
                src={require("../../assets/header_img/title_point.png").default}
                alt=""
              />
            </div>
          </div>
          <div className="header_title_list">
            <ul>
              {navModule.map((item, index) => {
                return <li key={index}>{item.modules_name}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="header_time_user">
          <div className="time">
            <span>{timeNow}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
