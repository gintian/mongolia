//清远山庄
import React, { Fragment, useState } from "react";
import "./index.scss";

// 引入折线图
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
const Villa = () => {
  const [jdgkData] = useState({
    covers: "607",
    floor: "5.23",
  });

  const [rygkData] = useState({
    educationNum: "30", //廉政中心人数
    guardNum: "12", //看护人员人数
    invesGroupPeopleNum: "10", //专案组人数 (办案人员入驻)
    medicalWorkersNum: "3", //医务人员人数
    supportNum: "22", //后勤人员人数
  });
  const [Floor] = useState([
    "综合指挥楼",
    "留置用房",
    "武警执勤楼",
    "后勤保障楼",
    "9号办公楼",
    "中心办公楼",
    "特警执勤楼",
    "体能训练馆",
  ]);
  const [current] = useState(0);

  return (
    <Fragment>
      <div className="VillaList" style={{ color: "red" }}>
        <div className="VillaLeft">
          <div className="VillaOne">
            <div className="titles">
              <p>场所概况</p>
            </div>

            <div className="titlecenter">
              <p>
                <span style={{ marginRight: "30px", marginTop: "12px" }}>
                  占地
                </span>
                <span
                  style={{ position: "relative", left: "20px", top: "12px" }}
                >
                  建筑面积
                </span>
              </p>
              <p style={{ marginTop: "36px" }}>
                <span style={{ marginRight: "-25px", marginTop: -19 }}>
                  {jdgkData.covers}
                  <a
                    href="##"
                    style={{
                      fontSize: "14px",
                      fontSize: "16px",
                      color: "#2BFAFF",
                      fontWeight: 700,
                      marginLeft: "4px",
                    }}
                  >
                    亩
                  </a>
                </span>
                <span
                  style={{ position: "relative", left: "50px", top: "-18px" }}
                >
                  {jdgkData.floor}
                  <a
                    href="##"
                    style={{
                      fontSize: "14px",
                      fontSize: "16px",
                      color: "#2BFAFF",
                      fontWeight: 700,
                      marginLeft: "4px",
                    }}
                  >
                    万平方米
                  </a>
                </span>
              </p>
            </div>

            <div className="titlebottom">
              <p>清远山庄功能区包括</p>
              <div className="ullist">
                <ul>
                  {Floor.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={index === current && "activelist"}
                      >
                        <i></i>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="VillaTwo">
            <div className="titles">
              <p>管理服务人员配置</p>
            </div>
            <div>
              <div className="twobackgrounde" id="box">
                <div className="slide">
                  <ul>
                    <li>
                      <p>{rygkData.supportNum}</p>
                      <i></i>
                      <p>后勤人数</p>
                    </li>
                    <li>
                      <p className="countNum">{rygkData.medicalWorkersNum}</p>
                      <i></i>
                      <p>医护人数</p>
                    </li>
                    <li>
                      <p className="countNum">{rygkData.educationNum}</p>
                      <i></i>
                      <p>管理人数</p>
                    </li>
                    <li>
                      <p className="countNum">{rygkData.guardNum}</p>
                      <i></i>
                      <p>看护人数</p>
                    </li>
                    <li>
                      <p className="countNum">{rygkData.invesGroupPeopleNum}</p>
                      <i></i>
                      <p>办案人员入驻</p>
                    </li>
                    <li>
                      <i></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="VillaThreeya">
            <div className="titles">
              <p>看护保障情况</p>
            </div>
            <div className="policelist">
              <div>
                <p>
                  <span>武警看护对象</span>
                  <span>24</span>
                </p>
              </div>
              <div>
                <p>
                  <span>特警看护对象</span>
                  <span>18</span>
                </p>
              </div>
            </div>
            <div className="picture">
              <div>
                <i></i>
              </div>
              <div className="icon1">
                <i></i>
              </div>
            </div>
            <div className="nurse">
              <div>
                <p>
                  <span>医生</span>
                  <span>
                    2<i>名</i>
                  </span>
                </p>
                <p>
                  <span>护士</span>
                  <span>
                    1<i>名</i>
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <span>救护车</span>
                  <span>
                    2<i>辆</i>
                  </span>
                </p>
                <p>
                  <span>急救设备</span>
                  <span>
                    1<i>台</i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Villa;
