import React, { Component, Fragment } from "react";
import "./index.scss";
//引入echarts
import * as echarts from "echarts";
// 水波图
import "echarts-liquidfill";

class Targetdata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //左最下饼图
      yearSexData: {
        menNum: "88", //男性人数
        womenNum: "72", //女性人数
      },
      //底部饼图数据 start
      yearIn: [
        {
          attr: "留置人员年龄饼图",
          name: "40以上",
          value: 14,
        },
        {
          attr: "留置人员年龄饼图",
          name: "40-60",
          value: 14,
        },
        {
          attr: "留置人员年龄饼图",
          name: "60以下",
          value: 14,
        },
      ], //底部饼图数据end
      lz1qgkData: {
        detainNum: "104", //在办案件数量
        mindRoomFreeNum: "4", //智慧留置房间空闲中中数量
        mindRoomTotalNum: "13", //智慧留置房间总数
        mindRoomUseNum: "9", //智慧留置房间使用中数量
        mindRoomUsePercent: "0", //智慧留置房间使用率--只保留整数部分
        ordinaryRoomFreeNum: "2", //普通留置房间空闲中中数量
        ordinaryRoomTotalNum: "14", //普通留置房间总数
        ordinaryRoomUseNum: "12", //普通留置房间使用中数量
        ordinaryRoomUsePercent: "0", //普通留置房间使用率--只保留整数部分
        roomTotalNum: "27", //留置室总数
        mindNum: "0",
        mindNumPercent: "0",
        ordinaryNum: "51",
        ordinaryNumPercent: "100",
      }, //lz1qgkDat  普通留置室态势
      //普通滞留室 start
      lzsqkData: {
        ordinaryRoomFreeNum: "2", //空闲中数量
        ordinaryRoomTotalNum: "14", //房间总数
        ordinaryRoomUseNum: "12", //使用数量
        usePercent: "40", //使用百分比—只保留整数
      }, // 普通滞留室 end
      historyCaseData: {
        value: "433",
      },
      // 谈话室情况 start
      talkSutationData: {
        roomFreeNum: "3",
        roomTotalNum: "11",
        roomUseNum: "8",
        usePercent: "50",
      }, //谈话室数 end
      // 智慧滞留室 start
      runSuationData: {
        mindRoomFreeNum: "4", //智慧留置房间空闲中中数量
        mindRoomTotalNum: "13", //智慧留置房间总数
        mindRoomUseNum: "9", //智慧留置房间使用中数量
        usePercent: "100", //智慧留置房间使用率--只保留整数部分
      }, // 智慧滞留室 end

      // 智慧留置运行态势
      runSuationCountData: {}, // 运行态势总人数
      runSuationZXData: [], // 运行态势折线
      // 滞留预警
      zProductData: {
        value: "504",
      }, // 滞留成本
      zxData: [], //总节省看护人次接口地址
      //根据留置房间编码获取留置人员信息
      DetainRiskInfo_total: 10, //系统评估符合智慧留置人数
      ConservePersonTotal: 0, //总节省看护人次
      kanhuTotal: [{ value: 48 }, { value: 12 }], //总节省看护人次
      //系统评估符合智慧留置人数
      riskList: {
        highNum: 8,
        midNum: 10,
        lowNum: 12,
      },
      // 左底部
      lzTypeNumData: {
        mainNum: "12", //被调查人
        importantNum: "12", //重要涉案人
        briberyNum: "10", //涉嫌行贿犯罪
        joinNum: "12", //涉嫌共同职务犯罪
      },
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.ShuiBO();
      this.ShuiBO2();
      this.ShuiBO3();
    }, 1000);
    this.PersonEChats();
  }
  componentWillMount() {}
  // 当前留置对象情况
  PersonEChats() {
    const optionrate = {
      color: ["#00FFE1 ", "#009DFC ", "#F5BD06"],
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "45%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
            normal: {
              show: true, // 显示 隐藏
              position: "outside", // 标签的位置
              //  formatter: '{c}',   // 标签回调自定义函数
              textStyle: {
                color: "#2BFAFF",
                fontSize: 14,
              },
            },
          },
          labelLine: {
            normal: {
              show: true,
              length: 20,
              lineStyle: {
                color: "#e4e4e4",
              },
            },
          },
          data: this.state.yearIn,
          center: ["38%", "25.4%"],
        },
      ],
    };
    const rateChart = echarts.init(document.getElementById("personEcharts"));
    rateChart.setOption(optionrate);
  }

  //水波图第一个
  ShuiBO() {
    let chartDom = document.getElementById("shuibotu1");
    let myChart = echarts.init(chartDom);
    let option;
    option = {
      // 提示框组件
      tooltip: {
        trigger: "item", // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        textStyle: {
          color: "#fff", // 文字颜色
        },
        // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
        // 水球图: {a}（系列名称），{b}（无），{c}（数值）
        // 使用函数模板   传入的数据值 -> value: number|Array,
        formatter: function (value) {
          return value.seriesName + ": " + value.data * 100 + "%";
        },
      },
      series: [
        {
          type: "liquidFill",
          name: "", // 系列名称，用于tooltip的显示，legend 的图例筛选
          radius: "62%", // 水球图的半径
          center: ["50%", "45%"], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
          // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
          // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
          shape: "circle",
          phase: 0, // 波的相位弧度 不设置  默认自动
          direction: "right", // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
          outline: {
            show: true,
            borderDistance: 0, // 边框线与图表的距离 数字
            itemStyle: {
              opacity: 1, // 边框的透明度   默认为 1
              borderWidth: 1, // 边框的宽度
              shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
              shadowColor: "#8BCBD0", // 边框的阴影颜色,
              borderColor: "#8BCBD0", // 边框颜色
            },
          },
          // 图形样式
          itemStyle: {
            color: "#FFDA02", // 水球显示的背景颜色
            opacity: 1, // 波浪的透明度
            shadowBlur: 10, // 波浪的阴影范围
          },
          backgroundStyle: {
            color: "#FFD60E", // 水球未到的背景颜色
            opacity: 0.2,
          },
          // 图形的高亮样式
          emphasis: {
            itemStyle: {
              opacity: 0.8, // 鼠标经过波浪颜色的透明度
            },
          },
          // 图形上的文本标签
          label: {
            fontSize: 20,
            fontWeight: 400,
            color: "#fff",
          },
          // data: [0.50] // 系列中的数据内容数组
          data: [Number(this.state.lzsqkData.usePercent) / 100],
        },
      ],
    };
    option && myChart.setOption(option);
  }
  ShuiBO2() {
    let chartDom = document.getElementById("shuibotu2");
    let myChart = echarts.init(chartDom);
    let option;
    option = {
      // 提示框组件
      tooltip: {
        trigger: "item", // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        textStyle: {
          color: "#fff", // 文字颜色
        },
        // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
        // 水球图: {a}（系列名称），{b}（无），{c}（数值）
        // 使用函数模板   传入的数据值 -> value: number|Array,
        formatter: function (value) {
          return value.seriesName + ": " + value.data * 100 + "%";
        },
      },
      series: [
        {
          type: "liquidFill",
          name: "", // 系列名称，用于tooltip的显示，legend 的图例筛选
          radius: "62%", // 水球图的半径
          center: ["50%", "45%"], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
          // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
          // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
          shape: "circle",
          phase: 0, // 波的相位弧度 不设置  默认自动
          direction: "right", // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
          outline: {
            show: true,
            borderDistance: 0, // 边框线与图表的距离 数字
            itemStyle: {
              opacity: 1, // 边框的透明度   默认为 1
              borderWidth: 1, // 边框的宽度
              shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
              shadowColor: "#8BCBD0", // 边框的阴影颜色,
              borderColor: "#8BCBD0", // 边框颜色
            },
          },
          // 图形样式
          itemStyle: {
            color: "#22E5D1 ", // 水球显示的背景颜色
            opacity: 1, // 波浪的透明度
            shadowBlur: 10, // 波浪的阴影范围
          },
          backgroundStyle: {
            color: "#0DCA6E", // 水球未到的背景颜色
            opacity: 0.2,
          },
          // 图形的高亮样式
          emphasis: {
            itemStyle: {
              opacity: 0.8, // 鼠标经过波浪颜色的透明度
            },
          },
          // 图形上的文本标签
          label: {
            fontSize: 20,
            fontWeight: 400,
            color: "#fff",
          },
          // data: [0.50] // 系列中的数据内容数组
          data: [Number(this.state.runSuationData.usePercent) / 100],
        },
      ],
    };
    option && myChart.setOption(option);
  }
  ShuiBO3() {
    let chartDom = document.getElementById("shuibotu3");
    let myChart = echarts.init(chartDom);
    let option;
    option = {
      // 提示框组件
      tooltip: {
        trigger: "item", // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        textStyle: {
          color: "#fff", // 文字颜色
        },
        // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
        // 水球图: {a}（系列名称），{b}（无），{c}（数值）
        // 使用函数模板   传入的数据值 -> value: number|Array,
        formatter: function (value) {
          return value.seriesName + ": " + value.data * 100 + "%";
        },
      },
      series: [
        {
          type: "liquidFill",
          name: "", // 系列名称，用于tooltip的显示，legend 的图例筛选
          radius: "62%", // 水球图的半径
          center: ["50%", "45%"], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
          // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
          // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
          shape: "circle",
          phase: 0, // 波的相位弧度 不设置  默认自动
          direction: "right", // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
          outline: {
            show: true,
            borderDistance: 0, // 边框线与图表的距离 数字
            itemStyle: {
              opacity: 1, // 边框的透明度   默认为 1
              borderWidth: 1, // 边框的宽度
              shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
              shadowColor: "#8BCBD0", // 边框的阴影颜色,
              borderColor: "#8BCBD0", // 边框颜色
            },
          },
          // 图形样式
          itemStyle: {
            color: "#18DFFF", // 水球显示的背景颜色
            opacity: 1, // 波浪的透明度
            shadowBlur: 10, // 波浪的阴影范围
          },
          backgroundStyle: {
            color: "#0273FF", // 水球未到的背景颜色
            opacity: 0.2,
          },
          // 图形的高亮样式
          emphasis: {
            itemStyle: {
              opacity: 0.8, // 鼠标经过波浪颜色的透明度
            },
          },
          // 图形上的文本标签
          label: {
            fontSize: 20,
            fontWeight: 400,
            color: "#fff",
          },
          //data: [0.50] // 系列中的数据内容数组
          data: [Number(this.state.talkSutationData.usePercent) / 100],
        },
      ],
    };
    option && myChart.setOption(option);
  }
  render() {
    const {
      ConservePersonTotal,
      DetainRiskInfo_total,
      yearSexData,
      lzsqkData,
      runSuationData,
      lz1qgkData,
      historyCaseData,
      talkSutationData,
      riskList,
      lzTypeNumData,
    } = this.state;
    return (
      <Fragment>
        <div className="Targetdatalist">
          {/* 左边看板 */}
          <div className="TargetdataLeft">
            {/* 场所留置案件概况 */}
            <div className="TargetdataOne">
              <div className="titles">
                <p>场所留置案件概况</p>
              </div>
              <div className="anjian">
                <div>
                  <p className="num">在办案件数量</p>
                  <p className="nums">{lz1qgkData.detainNum}</p>
                </div>
                <div>
                  <p className="num">历史案件数量</p>
                  <p className="nums">{historyCaseData.value}</p>
                </div>
              </div>
            </div>
            {/* 房间使用情况 */}
            <div className="TargetdataThree">
              <div className="titles">
                <p>房间使用情况</p>
              </div>
              <div className="liuzhishui">
                <div className="left">
                  <div>
                    <ul>
                      <li>
                        <p className="putong">普通留置室</p>
                        <div className="list">
                          <div
                            id="shuibotu1"
                            style={{ width: 100, height: 90 }}
                          ></div>

                          <p className="www">
                            <span className="total">总数</span>
                            <span>{lzsqkData.ordinaryRoomTotalNum}</span>
                          </p>
                          <p className="www">
                            <span className="yishiy">使用中</span>
                            <span>{lzsqkData.ordinaryRoomUseNum}</span>
                          </p>
                          <p className="www">
                            <span className="free">空闲中</span>
                            <span>{lzsqkData.ordinaryRoomFreeNum}</span>
                          </p>
                        </div>
                      </li>
                      <li>
                        <p className="putong">智慧留置室</p>
                        <div className="lists">
                          <div
                            id="shuibotu2"
                            style={{ width: 100, height: 90 }}
                          ></div>
                          <p className="www">
                            <span className="total">总数</span>
                            <span>{runSuationData.mindRoomTotalNum}</span>
                          </p>
                          <p className="www">
                            <span className="yishiy">使用中</span>
                            <span>{runSuationData.mindRoomUseNum}</span>
                          </p>
                          <p className="www">
                            <span className="free">空闲中</span>
                            <span>{runSuationData.mindRoomFreeNum}</span>
                          </p>
                        </div>
                      </li>

                      <li>
                        <p className="putong">谈话室情况</p>
                        <div className="listss">
                          <div
                            id="shuibotu3"
                            style={{ width: 100, height: 90 }}
                          ></div>
                          <p className="www">
                            <span className="total">房间总数</span>
                            <span>{talkSutationData.roomTotalNum}</span>
                          </p>
                          <p className="www">
                            <span className="yishiy">使用中</span>
                            <span>{talkSutationData.roomUseNum}</span>
                          </p>
                          <p className="www">
                            <span className="free">空闲中</span>
                            <span>{talkSutationData.roomFreeNum}</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* 当前留置对象情况 */}
            <div className="Currentsituation">
              <div className="titles">
                <p>当前留置对象情况</p>
              </div>
              <div className="topContent">
                <p className="man">
                  <span>男性</span>
                  <span>{yearSexData.menNum}</span>
                </p>
                <p className="woman">
                  <span>{yearSexData.womenNum}</span>
                  <span>女性</span>
                </p>
              </div>
              <div className="topEcharts">
                <div className="ct2_contentBJ"></div>
                <div id="personEcharts"></div>
              </div>

              <div className="qinshu">
                <ul>
                  <li>
                    <span>被调查人</span>
                    <span>{lzTypeNumData.mainNum}</span>
                  </li>
                  <li>
                    <span>涉嫌行贿犯罪</span>
                    <span>{lzTypeNumData.briberyNum}</span>
                  </li>
                  <li>
                    <span>重要涉案人</span>
                    <span>{lzTypeNumData.importantNum}</span>
                  </li>
                  <li>
                    <span>涉嫌共同职务犯罪</span>
                    <span>{lzTypeNumData.joinNum}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 右边看板 */}
          <div className="TargetdataRight">
            {/* 对象安全风险评估 */}
            <div className="Currentsituation">
              <div className="titles">
                <p>对象安全风险评估</p>
              </div>
              <div className="title2">
                <p>
                  系统评估符合智慧留置人数<span>{DetainRiskInfo_total}</span>
                </p>
              </div>
              <div className="echarts">
                <div className="ct2_content">
                  <div className="ct2_contentBJ"></div>
                  <div id="r1Echarts_content"></div>
                </div>

                <div className="dangerous">
                  <ul>
                    <li>
                      <span>高风险</span>
                      <span>{riskList.highNum}</span>
                    </li>
                    <li>
                      <span>中风险</span>
                      <span>{riskList.midNum}</span>
                    </li>
                    <li>
                      <span>低风险</span>
                      <span>{riskList.lowNum}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* 看护模式 */}
            <div className="TargetdataTwo">
              <div className="titles">
                <p>看护模式</p>
              </div>
              <div className="echats">
                <div className="ct2_content">
                  <div className="ct2_contentBJ"></div>
                  <div id="r2Echarts_content"></div>
                  <div className="legent_bg">
                    <p>智慧看护：</p>
                  </div>
                  <span className="legendNum">
                    {this.state.kanhuTotal[0].value}
                  </span>
                  <div className="legent_bg lg2">
                    <p>近身看护：</p>
                  </div>
                  <span className="legendNum ln2">
                    {this.state.kanhuTotal[1].value}
                  </span>
                </div>
                <div className="ct2_content">
                  <div className="ct2_contentBJ right"></div>
                  <div id="r3Echarts_content"></div>
                </div>
              </div>
            </div>
            {/* 智慧留置成本运行状态 */}
            <div className="Targetdataeleven">
              <div className="titles">
                <p>智慧留置成本运行状态</p>
              </div>
              <div className="title2">
                <p>
                  总节省看护人次<span>{ConservePersonTotal}</span>
                </p>
              </div>
              <div className="echats">
                <div
                  id="jieshenhlist"
                  style={{
                    width: 400,
                    height: 200,
                    marginLeft: "40px",
                    top: 20,
                  }}
                ></div>
              </div>
            </div>
          </div>
          {/* <footer>
            <div className="footprint"></div>
          </footer> */}
        </div>
      </Fragment>
    );
  }
}

export default Targetdata;
