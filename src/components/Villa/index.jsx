import React, {
  Component,
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./index.scss";
import {
  jdgk,
  lz1qgk,
  cglzq,
  yjc,
  nqbt,
  wqbt,
  rygk,
  khll,
  wjbt,
  tjbt,
  SPCount,
} from "../../api/mainApi";
import * as echarts from "echarts";
import { Build, createMap, Model } from "../../utils/map3d";
import { useMappedState } from "redux-react-hook";

// // import "echarts"
// import echarts from 'echarts/lib/echarts';
// 引入柱状图
// import  'echarts/lib/chart/bar';
// 引入折线图
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
const Villa = () => {
  const map = useMappedState((state) => state.map3d_light);
  const [jdgkData, setjdgkData] = useState({
    covers: "607",
    floor: "5.23",
  });

  //设置默认当前选中
  const [lz1qgkData, setlz1qgkData] = useState([]);
  const [cglzqData, setcglzqData] = useState([]);
  const [cgzxData, setcgzxData] = useState([]);
  const [yjcData, setyjcData] = useState({});
  const [nqbtData, setnqbtData] = useState([]);
  const [wqbtData, setwqbtData] = useState({});
  const [SPcount, setScount] = useState({});
  const [rygkData, setrygkData] = useState({
    educationNum: "30", //廉政中心人数
    guardNum: "12", //看护人员人数
    invesGroupPeopleNum: "10", //专案组人数 (办案人员入驻)
    medicalWorkersNum: "3", //医务人员人数
    supportNum: "22", //后勤人员人数
  });
  const [khllData, setkhllData] = useState({});
  const [wjbtData, setwjbtData] = useState([]);
  const [tjbtData, settjbtData] = useState([]);
  const [Floor, setFloor] = useState([
    "综合指挥楼",
    "留置用房",
    "武警执勤楼",
    "后勤保障楼",
    "9号办公楼",
    "中心办公楼",
    "特警执勤楼",
    "体能训练馆",
  ]);
  const [current, setcurrent] = useState(0);
  const [isShow, setActive] = useState(false); // 奇幻基地概况背景

  const [showVideo, setVideo] = useState(false);

  useEffect(() => {
    GetData();
    // Load();
  }, [map]);
  const SortEcharts = (item, index) => {
    const optionrate = {
      color: ["#FF6E78", "#4A92FE", "#7EFEB2", "#FFDD61"],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ",
      },
      legend: {
        data: ["30以下12", "31-40 10", "41-50 12", "51-60 5", "60以上 6"],
        icon: "bar", //图例形状设置,
        textStyle: { color: "#fff" },
        type: "scroll",
        orient: "vertical",
        show: true,
        right: 90,
        itemHeight: 10,
        itemWidth: 10,
      },
      series: [
        {
          name: "未解除对象",
          type: "pie",
          selectedMode: "single",
          radius: ["20%", "30%"],
          label: {
            position: "inner",
            fontSize: 8,
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 22, name: "6个月以上", itemStyle: { color: "#00F5E3" } },
            { value: 30, name: "5-6个月", itemStyle: { color: "#FF6B54" } },
            { value: 50, name: "4-5个月", itemStyle: { color: "#00B1FF" } },
            { value: 70, name: "1-2个月", itemStyle: { color: "#00A86F" } },
            { value: 90, name: "2-3个月", itemStyle: { color: "#F4F83A" } },
            { value: 31, name: "3-4个月", itemStyle: { color: "#FF9C4E" } },
          ],
          center: ["28%", "30%"], // 这个属性调整图像的位置！！！！！
        },
        {
          name: "解除对象",
          type: "pie",
          radius: ["60%", "40%"],
          labelLine: {
            length: 30,
          },
          label: {
            // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            formatter: "{b|{b}：}{c}  ",
            // backgroundColor: '#F6F8FC',
            // borderColor: '#8C8D8E',
            borderWidth: 1,
            // borderRadius: 4,

            rich: {
              a: {
                color: "#6E7079",
                lineHeight: 22,
                align: "center",
              },
              hr: {
                borderColor: "#fff",
                width: "100%",
                borderWidth: 0,
                height: 0,
              },
              b: {
                color: "#83A697",
                fontSize: 12,
              },
              d: {
                fontSize: 12,
                padding: [-10, 0, 10, 0],
              },
              per: {
                color: "#9EC6B3",

                // backgroundColor: '#4C5058',
                padding: [0, 0],
                borderRadius: 3,
              },
            },
          },
          data: [
            { value: 12, name: "30以下12", itemStyle: { color: "#4B91F6" } },
            { value: 10, name: "31-40 10", itemStyle: { color: "#0076DA" } },
            { value: 12, name: "41-50 12", itemStyle: { color: "#008856" } },
            { value: 5, name: "51-60 5", itemStyle: { color: "#32A392" } },
            { value: 6, name: "60以上 6", itemStyle: { color: "#00799C" } },
          ],
          center: ["28%", "30%"], // 这个属性调整图像的位置！！！！！
        },
      ],
    };

    const rateChart = echarts.init(document.getElementById("echartsMainaas"));
    rateChart.setOption(optionrate);
  };
  const GetData = (item, index) => {
    // //基地概况
    jdgk()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          setjdgkData(res.data);
          // this.setState({
          //     jdgkData: res.data,

          // })
        }
      })
      .catch((error) => {});

    // 留置区概况
    lz1qgk()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          // this.setState({
          //     lz1qgkData: res.data,
          // })

          setlz1qgkData(res.data);
        }
      })
      .catch((error) => {});
    // 常规留置区 那个折线
    cglzq()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          // 拆分全部的数据
          var totalDta = res.data;
          var cglzqData = [];
          var cglz = [];
          for (var i = 0; i < totalDta.length; i++) {
            const item = totalDta[i];
            if (item.attr === "智慧留置") {
              cglzqData.push(item);
            } else if (item.attr === "普通留置") {
              cglz.push(item);
            }
          }

          setcglzqData(cglzqData);

          setcgzxData(cglzqData);

          // this.setState({
          //     cglzqData: cglzqData,
          //     cgzxData: cglz
          // })
        }
      })
      .catch((error) => {});
    // // 留置态势分析  已解除对象
    yjc()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          setyjcData(res.data);
          // this.setState({
          //     yjcData: res.data,
          // })
        }
      })
      .catch((error) => {});
    // 内圈饼图
    nqbt()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          var color = [
            "#00F5E3",
            "#FF6B54",
            "#00B1FF",
            "#00A86F",
            "#F4F83A",
            "#FF9C4E",
          ];

          var neceng = res.data;
          //    var necengName=[]
          //    var necengValue=[]
          for (let index = 0; index < neceng.length; index++) {
            var element = neceng[index];
            element.push({
              itemStyle: { color: color[index] },
            });
          }
          setnqbtData(neceng);
          // this.setState({
          //     // nqbtData: res.data,
          //     nqbtData: neceng,
          // })
        }
      })
      .catch((error) => {});
    //外圈饼图
    wqbt()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          var color = [
            "#4B91F6",
            "#0076DA",
            "#008856",
            "#32A392",
            "#F4F83A",
            "#00799C",
          ];
          var neceng = res.data;
          for (let index = 0; index < neceng.length; index++) {
            var element = neceng[index];
            element.push({
              itemStyle: { color: color[index] },
            });
          }
          setwqbtData(neceng);
          // this.setState({
          //     wqbtData: neceng,
          // })
        }
      })
      .catch((error) => {});

    // 人员概况
    rygk()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          setrygkData(res.data);
        }
      })
      .catch((error) => {});
    // 看护力量
    khll()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          setkhllData(res.data);
          // this.setState({
          //     khllData: res.data,
          // })
        }
      })
      .catch((error) => {});

    // 留置人员武警或特警看护人数
    SPCount()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          setScount(res.data);
          // this.setState({
          //     wjbtData: res.data,
          // })
        }
      })
      .catch((error) => {});
    // 武警饼图
    wjbt()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          setwjbtData(res.data);
          // this.setState({
          //     wjbtData: res.data,
          // })
        }
      })
      .catch((error) => {});
    // 特警饼图
    tjbt()
      .then((res) => {
        if (res.msg === "SUCCESS") {
          settjbtData(res.data);
          // this.setState({
          //     tjbtData: res.data,
          // })
        }
      })
      .catch((error) => {});
  };
  //
  const NMdw = (item, index, key) => {
    setcurrent(key, 222);
    switch (item) {
      case 1:
        var pos = {
          x: -60267.1875,
          y: 2254.06884765625,
          z: 3742.784423828125,
          pitch: 27.494932174682617,
          yaw: -89.56238555908203,
          roll: -0.00042541822767816484,
        };
        createMap.FlyToPosition(map, pos);
        createMap.closeWkWang(map);
        Model.showModel(map, "FW_V001_JZ0001_WK", true);
        break;
      case 2:
        var pos = {
          x: -49790.984375,
          y: 6229.2734375,
          z: 4151.35107421875,
          pitch: 18.84988021850586,
          yaw: -90.21843719482422,
          roll: -0.00042762281373143196,
        };
        createMap.FlyToPosition(map, pos);
        createMap.closeWkWang(map);
        Model.showModel(map, "FW_V001_JZ0013_WK", true);
        break;
      case 3:
        var pos = {
          x: -34495.5234375,
          y: -12565.8154296875,
          z: 2386.9072265625,
          pitch: 24.381622314453125,
          yaw: -89.46861267089844,
          roll: 0.00007405239011859521,
        };
        createMap.FlyToPosition(map, pos);
        createMap.closeWkWang(map);
        Model.showModel(map, "FW_V001_JZ0016_WK", true);
        break;
      case 4:
        var pos = {
          x: 5136.9755859375,
          y: 2272.5390625,
          z: 5583.8141479492188,
          pitch: 23.700645446777344,
          yaw: -90.93480682373047,
          roll: 0.000042891108023468405, //x:-50663.6953125,y:-10446.08203125,z:3158.668212890625,pitch:22.07482147216797,yaw:-88.81202697753906,roll:0.00007462623034371063
        };
        createMap.FlyToPosition(map, pos);
        createMap.closeWkWang(map);
        Model.showModel(map, "FW_V001_JZ0022_WK", true);
        // Model.showModel(map,"FW_0",flag)
        break;
      case 5:
        var pos = {
          x: -70873.5234375,
          y: -5572.84423828125,
          z: 3226.913818359375,
          pitch: 14.999996185302734,
          yaw: -89.84342193603516,
          roll: -0.0004278034612070769,
        };
        createMap.FlyToPosition(map, pos);
        createMap.closeWkWang(map);
        Model.showModel(map, "FW_V001_JZ0005_WK", true);
        break;
      case 6:
        var pos = {
          x: -68445.2421875,
          y: 2297.602294921875,
          z: 2298.486328125,
          pitch: 21.010589599609375,
          yaw: -178.28135681152344,
          roll: 0.00007428106619045138,
        };
        createMap.FlyToPosition(map, pos);
        createMap.closeWkWang(map);
        Model.showModel(map, "FW_V001_JZ0007_WK", true);
        break;
      case 7:
        var pos = {
          x: -60354.56640625,
          y: -12672.6083984375,
          z: 3926.86376953125,
          pitch: 33.986656188964844,
          yaw: -89.56243896484375,
          roll: 0.000051483770221238956,
        };

        createMap.FlyToPosition(map, pos);
        createMap.closeWkWang(map);
        Model.showModel(map, "FW_V001_JZ0003_WK", true);
        break;
      default:
        var pos = {
          // x:-60368.05078125,y:-11872.455078125,z:4592.99609375,pitch:32.9999885559082,yaw:-89,roll:0.00012012497609248385
          x: -70955.6328125,
          y: -4493.45947265625,
          z: 2136.913818359375,
          pitch: 24.305198669433594,
          yaw: -179.8128204345703,
          roll: 0.0000729647945263423,
        };
        createMap.FlyToPosition(map, pos);
        createMap.closeWkWang(map);
        Model.showModel(map, "FW_V001_JZ0006_WK", true);
      // Model.showModel(map,"FW_1",flag)
    }
  };
  const Load = () => {
    var box = document.querySelector("#box");
    var slide = document.querySelector(".slide");
    var arraw = document.querySelector(".arraw");
    var lis = document.querySelectorAll(".slide ul li");
    var json = [
      //  包含了5张图片里面所有的样式
      {
        //  1
        width: 100,
        top: 20,
        left: 100,
        opacity: 20,
        z: 2,
        id: 1,
      },
      {
        // 2
        width: 150,
        top: 70,
        left: 40,
        opacity: 60,
        z: 3,
        id: 2,
      },
      {
        // 3
        width: 200,
        top: 120,
        left: 170,
        opacity: 100,
        z: 4,
        id: 3,
      },
      {
        // 4
        width: 150,
        top: 70,
        left: 250,
        opacity: 60,
        z: 3,
        id: 4,
      },
      {
        //5
        width: 100,
        top: 20,
        left: 250,
        opacity: 20,
        z: 2,
        id: 5,
      },
    ];
    box.addEventListener("mouseover", function () {
      //  console.log('aaa')
      animate(arraw, { opacity: 0 });
    });
    box.addEventListener("mouseout", function () {
      animate(arraw, { opacity: 0 });
    });

    var next = document.querySelector(".next");
    var prev = document.querySelector(".prev");
    var timer = null;
    var flag = true;
    next.addEventListener("click", function () {
      // alert('next');
      // console.log(json);
      // console.log('================')
      clearInterval(timer);
      if (flag == true) {
        move(true);
        flag = false;
      }
      //console.log(json);
    });
    next.addEventListener("mouseleave", function () {
      clearInterval(timer);
      //alert('next')
      run();
      //console.log(json);
    });
    prev.addEventListener("click", function () {
      clearInterval(timer);
      // alert('prev')
      if (flag == true) {
        move(false);
        flag = false;
      }
    });
    prev.addEventListener("mouseleave", function () {
      // alert('prev')
      // clearInterva(timer);
      run();
    });

    move();
    run();
    function run() {
      clearInterval(timer);
      timer = setInterval(function () {
        // console.log('run')
        if (flag == true) {
          flag = false;
          move(true);
        }
        // console.log(json)
      }, 1000);
    }

    function move(x) {
      if (x != undefined) {
        if (x) {
          json.push(json.shift());
        } else {
          json.unshift(json.pop());
        }
      }

      for (var i = 0; i < json.length; i++) {
        animate(
          lis[i],
          {
            width: json[i].width,
            top: json[i].top,
            left: json[i].left,
            opacity: json[i].opacity,
            zIndex: json[i].z,
          },
          function () {
            flag = true;
          }
        );
      }
    }

    function animate(obj, json, callback) {
      // 先停止定时器
      clearInterval(obj.timers);
      obj.timers = setInterval(function () {
        var stoped = true;
        // console.log('sss')
        for (var k in json) {
          // var leader = parseInt(getStyle(obj, k));
          var leader = 0;
          if (k == "opacity") {
            leader = Math.round(getStyle(obj, k) * 100) || 100;
          } else {
            // console.log(json[k]);
            leader = parseInt(getStyle(obj, k)) || 0;
          }
          //         console.log(leader);
          // json[k]是目标位置
          var step = (json[k] - leader) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          leader = leader + step;
          if (k == "opacity") {
            obj.style[k] = leader / 100;
            obj.style["filter"] = "alpha(opacity=" + leader + ")";
          } else if (k == "zIndex") {
            obj.style["zIndex"] = json[k];
            //  console.log(666);
          } else {
            obj.style[k] = leader + "px";
          }
          if (leader != json[k]) {
            stoped = false;
          }
        }
        if (stoped) {
          // console.log('stop')
          clearInterval(obj.timers);
          callback && callback();
        }
      }, 80);
    }
    //获取属性值
    function getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return window.getComputedStyle(obj, null)[attr];
      }
    }
  };
  const Moudle = () => {
    setVideo(true);
  };
  const closeVideo = () => {
    setVideo(false);
  };
  return (
    <Fragment>
      <div className="VillaList" style={{ color: "red" }}>
        {/* 左边 */}
        <div className="VillaLeft">
          {/* 第一快 */}
          <div className="VillaOne">
            <div className="titles">
              <p>场所概况</p>
            </div>
            {Object.keys(jdgkData).length > 0 ? (
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
            ) : (
              <div className="titlecenter">
                <p>
                  <span style={{ marginRight: "-20px", marginTop: "20px" }}>
                    占地
                  </span>
                  <span
                    style={{ position: "relative", left: "60px", top: "15px" }}
                  >
                    建筑面积
                  </span>
                </p>
                <p style={{ marginTop: "36px" }}>
                  <span style={{ marginRight: "-65px", marginTop: -18 }}>
                    607亩
                  </span>
                  <span
                    style={{ position: "relative", left: "80px", top: -25 }}
                  >
                    5.23
                    <a href="##" style={{ fontSize: "14px" }}>
                      万平方米
                    </a>
                  </span>
                </p>
              </div>
            )}
            <div className="titlebottom">
              <p onClick={() => Moudle()}>清远山庄功能区包括</p>
              <div className="ullist">
                <ul>
                  {Floor.map((item, index) => {
                    return (
                      <li
                        onClick={() => NMdw(index + 1, item, index)}
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
          {/* 第二块 */}
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
          {/* 第三块 */}
          <div className="VillaThreeya">
            <div className="titles">
              <p>看护保障情况</p>
            </div>
            {Object.keys(khllData).length > 0 ? (
              <div className="policelist">
                <div>
                  <p>
                    <span>武警看护对象</span>
                    <span>{khllData.policeTotal}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>特警看护对象</span>
                    <span>{khllData.swatTotal}</span>
                  </p>
                </div>

                <div>
                  <p>
                    <span>武警看护对象</span>
                    <span>{SPcount.swat}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>特警看护对象</span>
                    <span>{SPcount.police}</span>
                  </p>
                </div>
              </div>
            ) : (
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
            )}

            <div className="picture">
              <div>
                <i></i>
              </div>
              <div className="icon1">
                <i></i>
              </div>
            </div>
            {Object.keys(khllData).length > 0 ? (
              <div className="nurse">
                <div>
                  <p>
                    <span>医生</span>
                    <span>
                      {khllData.doctor}
                      <i>名</i>
                    </span>
                  </p>
                  <p>
                    <span>护士</span>
                    <span>
                      {khllData.nurse}
                      <i>名</i>
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>救护车</span>
                    <span>
                      {khllData.ambulance}
                      <i>辆</i>
                    </span>
                  </p>
                  <p>
                    <span>急救设备</span>
                    <span>
                      {khllData.equipment}
                      <i>台</i>
                    </span>
                  </p>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Villa;
