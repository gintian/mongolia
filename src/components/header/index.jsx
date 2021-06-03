import React, { useState, useEffect } from "react";
import "./style.scss";
import { useDispatch, useMappedState } from "redux-react-hook";
import Seeplate from "../../components/seeplate";

function Header() {
  const dispatch = useDispatch();
  const [timeNow, setTime] = useState();
  const top_count = useMappedState((state) => state.top_navigation_count);
  const top_page = useMappedState((state) => state.top_navigation_module);
  const navModule = [
    {
      modules_name: "资源图谱",
      wherePage: "resourceMapping",
    },
    {
      modules_name: "视频监控",
      wherePage: "videoMonitoring",
    },
    {
      modules_name: "人脸应用",
      wherePage: "faceApplication",
    },
    {
      modules_name: "门禁应用",
      wherePage: "accessControlApplications",
    },

    {
      modules_name: "实时定位",
      wherePage: "realTimePositioning",
    },
    {
      modules_name: "电子巡更",
      wherePage: "electronicPatrolling",
    },
    {
      modules_name: "消防管理",
      wherePage: "fireManagement",
    },
    {
      modules_name: "数据看板",
      wherePage: "dataBoard",
    },
  ];

  useEffect(() => {
    showtime();
  }, [top_count]);
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
  // handle top
  const handle_top = (item, index) => {
    console.log("点的哪个", item);
    dispatch({ type: "handleTop", top_navigation_count: index });
    dispatch({ type: "handleModule", top_navigation_module: item.wherePage });
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
                return (
                  <li
                    className={top_count === index ? "active_LI" : null}
                    onClick={() => handle_top(item, index)}
                    key={index}
                  >
                    {item.modules_name}
                  </li>
                );
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
      {top_page == "resourceMapping" ? <Seeplate /> : null}
    </div>
  );
}
export default Header;
