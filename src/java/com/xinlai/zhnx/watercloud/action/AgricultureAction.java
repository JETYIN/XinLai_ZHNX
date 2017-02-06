package com.xinlai.zhnx.watercloud.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;

@Controller
@Namespace("/waterCloud/agriculture")
public class AgricultureAction extends BaseAction {

	private static final long serialVersionUID = -5987244192174601836L;
	
	
	@Action(value="widget1", results={@Result(name = "widget1", type = "json", params = { "root", "message" })})
	public String widget1() {
		message = new HashMap<String, Object>();
		message.put("title", "防汛抗旱");

		List<String> labels = new ArrayList<String>();
		labels.add("汛期流速");
		labels.add("降雨量");
		message.put("labels", labels);

		List<String> units = new ArrayList<String>();
		units.add("L/S");
		units.add("MM");
		message.put("units", units);

		List<Map<String, Object>> series = new ArrayList<Map<String, Object>>();
		String[] names = { "银川", "石嘴山", "吴忠", "固原", "中卫" };
		for (int i = 0; i < names.length; i++) {
			Map<String, Object> ser = new HashMap<String, Object>();
			ser.put("name", names[i]);
			List<Double> data = new ArrayList<Double>();
			data.add(Math.floor(Math.random() * 50));
			data.add(Math.floor(Math.random() * 1000));
			ser.put("data", data);
			series.add(ser);
		}

		message.put("series", series);
		return "widget1";
	}
	@Action(value="widget2", results={@Result(name = "widget2", type = "json", params = { "root", "message" })})
	public String widget2() {
		message = new HashMap<String, Object>();
        String series = "[{"+
	        "    city: '银川',"+
	        "    data: [0, 3, 8, 1]"+
	        "}, {"+
	        "    city: '石嘴山',"+
	        "    data: [0, 7, 3, 6]"+
	        "}, {"+
	        "    city: '吴忠',"+
	        "    data: [0, 4, 5, 4]"+
	        "}, {"+
	        "    city: '固原',"+
	        "    data: [0, 5, 2, 3]"+
	        "}, {"+
	        "    city: '中卫',"+
	        "    data: [0, 6, 7, 5]"+
	        "}]";
		message.put("series", JSON.parse(series));
		message.put("labels", JSON.parse("[' ', '2013年', '2014年', '2015年']"));
		
		message.put("title", "水利防灾减灾建设");
		message.put("subTitle", "水库容量");
		message.put("unit", "亿立方米");
		
		return "widget2";
	}
	@Action(value="widget3", results={@Result(name = "widget3", type = "json", params = { "root", "message" })})
	public String widget3() {
		message = new HashMap<String, Object>();
		message.put("data", JSON.parse("[{passNum: 9, allNum: 25, numName: '水库水位站'}]"));
		message.put("title", "水库水位站");
		return "widget3";
	}
	@Action(value="widget4", results={@Result(name = "widget4", type = "json", params = { "root", "message" })})
	public String widget4() {
		message = new HashMap<String, Object>();
		message.put("data", JSON.parse("[{passNum: 0, allNum: 46, numName: '河道水文站'}]"));
		message.put("title", "河道水文站");
		return "widget4";
		
	}
	@Action(value="widget5", results={@Result(name = "widget5", type = "json", params = { "root", "message" })})
	public String widget5() {
		message = new HashMap<String, Object>();
		message.put("data", JSON.parse("[{passNum: 1, allNum: 53, numName: '河道水位站'}]"));
		message.put("title", "河道水位站");
		return "widget5";
	}
	@Action(value="widget6", results={@Result(name = "widget6", type = "json", params = { "root", "message" })})
	public String widget6() {
		message = new HashMap<String, Object>();
		message.put("title", "引调提水工程数");
		message.put("unit", "（公里）");
		message.put("years", JSON.parse("[ '2013年', '2014年', '2015年' ]"));
		String series = "[ {"+
			"	city : '银川',"+
			"	data : [ 2250, 3670, 4440 ]"+
			"}, {"+
			"	city : '石嘴山',"+
			"	data : [ 2768, 2367, 4780 ]"+
			"}, {"+
			"	city : '吴忠',"+
			"	data : [ 3540, 1679, 5080 ]"+
			"}, {"+
			"	city : '固原',"+
			"	data : [ 1467, 4527, 2500 ]"+
			"}, {"+
			"	city : '中卫',"+
			"	data : [ 4680, 5500, 1500 ]"+
			"} ]";
		message.put("series", JSON.parse(series));
		return "widget6";
	}
	@Action(value="widget7", results={@Result(name = "widget7", type = "json", params = { "root", "message" })})
	public String widget7() {
		message = new HashMap<String, Object>();
		message.put("title", "治理水土流失面积");
		message.put("unit", "（平方公里）");
		message.put("years", JSON.parse("[ '2013年', '2014年', '2015年' ]"));
		String series = "[ {"+
			"	city : '银川',"+
			"	data : [ 2250, 3670, 4440 ]"+
			"}, {"+
			"	city : '石嘴山',"+
			"	data : [ 2768, 2367, 4780 ]"+
			"}, {"+
			"	city : '吴忠',"+
			"	data : [ 3540, 1679, 5080 ]"+
			"}, {"+
			"	city : '固原',"+
			"	data : [ 1467, 4527, 2500 ]"+
			"}, {"+
			"	city : '中卫',"+
			"	data : [ 4680, 5500, 1500 ]"+
			"} ]";
		message.put("series", JSON.parse(series));
		return "widget7";
	}
	@Action(value="widget8", results={@Result(name = "widget8", type = "json", params = { "root", "message" })})
	public String widget8() {
		message = new HashMap<String, Object>();
		message.put("title", "关闭工业企业自备井");
		message.put("unit", "（眼）");
		message.put("years", JSON.parse("[ '2013年', '2014年', '2015年' ]"));
		String series = "[ {"+
			"	city : '银川',"+
			"	data : [ 2250, 3670, 4440 ]"+
			"}, {"+
			"	city : '石嘴山',"+
			"	data : [ 2768, 2367, 4780 ]"+
			"}, {"+
			"	city : '吴忠',"+
			"	data : [ 3540, 1679, 5080 ]"+
			"}, {"+
			"	city : '固原',"+
			"	data : [ 1467, 4527, 2500 ]"+
			"}, {"+
			"	city : '中卫',"+
			"	data : [ 4680, 5500, 1500 ]"+
			"} ]";
		message.put("series", JSON.parse(series));
		return "widget8";
	}
	@Action(value="widget9", results={@Result(name = "widget9", type = "json", params = { "root", "message" })})
	public String widget9() {
		message = new HashMap<String, Object>();
		message.put("title", "水量信息");
		message.put("unit", "万人");
		message.put("citys", JSON.parse("[ '银川', '石嘴山', '吴忠', '固原', '中卫' ]"));
		String series = "[ {"+
		"	year : '汛期水量',"+
		"	data : [ 2.25, 3.67, 4.44, 3.22, 5.18 ]"+
		"}, {"+
		"	year : '水库平均水量',"+
		"	data : [ 3.25, 2.67, 3.44, 4.22, 4.18 ]"+
		"} ]";
		message.put("series", JSON.parse(series));
		return "widget9";
	}

	@Action(value="widget10", results={@Result(name = "widget10", type = "json", params = { "root", "message" })})
	public String widget10() {
		message = new HashMap<String, Object>();
		message.put("title", "水质达标率银川");
		message.put("value", 64);
		message.put("city", "银川");
		message.put("valueLeft", 25);
		message.put("valueBottom", 50);
		message.put("id", 1);
		String dataSet = "[ {"+
				"	year : '2013',"+
				"	value : 64"+
				"}, {"+
				"	year : '2014',"+
				"	value : 72"+
				"}, {"+
				"	year : '2015',"+
				"	value : 81"+
				"} ]";
				message.put("dataSet", JSON.parse(dataSet));
		return "widget10";
	}

	@Action(value="widget11", results={@Result(name = "widget11", type = "json", params = { "root", "message" })})
	public String widget11() {
		message = new HashMap<String, Object>();
		message.put("title", "水质达标率石嘴山");
		message.put("value", 72);
		message.put("city", "石嘴山");
		message.put("valueLeft", 25);
		message.put("valueBottom", 50);
		message.put("id", 2);
		String dataSet = "[ {"+
				"	year : '2013',"+
				"	value : 72"+
				"}, {"+
				"	year : '2014',"+
				"	value : 69"+
				"}, {"+
				"	year : '2015',"+
				"	value : 76"+
				"} ]";
				message.put("dataSet", JSON.parse(dataSet));
		return "widget11";
	}
	@Action(value="widget12", results={@Result(name = "widget12", type = "json", params = { "root", "message" })})
	public String widget12() {
		message = new HashMap<String, Object>();
		message.put("title", "水质达标率吴忠");
		message.put("value", 67);
		message.put("city", "吴忠");
		message.put("valueLeft", 25);
		message.put("valueBottom", 50);
		message.put("id", 3);
		String dataSet = "[ {"+
				"	year : '2013',"+
				"	value : 67"+
				"}, {"+
				"	year : '2014',"+
				"	value : 62"+
				"}, {"+
				"	year : '2015',"+
				"	value : 77"+
				"} ]";
				message.put("dataSet", JSON.parse(dataSet));
		return "widget12";
	}
	@Action(value="widget13", results={@Result(name = "widget13", type = "json", params = { "root", "message" })})
	public String widget13() {
		message = new HashMap<String, Object>();
		message.put("title", "水质达标率固原");
		message.put("value", 42);
		message.put("city", "固原");
		message.put("valueLeft", 25);
		message.put("valueBottom", 50);
		message.put("id", 4);
		String dataSet = "[ {"+
				"	year : '2013',"+
				"	value : 42"+
				"}, {"+
				"	year : '2014',"+
				"	value : 75"+
				"}, {"+
				"	year : '2015',"+
				"	value : 80"+
				"} ]";
				message.put("dataSet", JSON.parse(dataSet));
		return "widget13";
	}
	@Action(value="widget14", results={@Result(name = "widget14", type = "json", params = { "root", "message" })})
	public String widget14() {
		message = new HashMap<String, Object>();
		message.put("title", "水质达标率中卫");
		message.put("value", 78);
		message.put("city", "中卫");
		message.put("valueLeft", 25);
		message.put("valueBottom", 50);
		message.put("id", 5);
		String dataSet = "[ {"+
				"	year : '2013',"+
				"	value : 78"+
				"}, {"+
				"	year : '2014',"+
				"	value : 75"+
				"}, {"+
				"	year : '2015',"+
				"	value : 77"+
				"} ]";
				message.put("dataSet", JSON.parse(dataSet));
		return "widget14";
	}
	@Action(value="widget15", results={@Result(name = "widget15", type = "json", params = { "root", "message" })})
	public String widget15() {
		message = new HashMap<String, Object>();
		message.put("title", "雨情统计");
		message.put("xAxisLabels", "（量级）");
		message.put("yAxisLabels", "（数量）");
		String series = "[{"+
        "    name: '降雨',"+
        "    data: [[10, 5], [20, 4], [26, 4], [29, 3], [30, 4], [35, 0], [50, 0], [100, 0], [250, 0]]"+
        "}]";
		message.put("series", JSON.parse(series));
		return "widget15";
	}
	// 右侧页面
	@Action(value="widgetRight1", results={@Result(name = "widgetRight1", type = "json", params = { "root", "message" })})
	public String widgetRight1() {
		message = new HashMap<String, Object>();
		message.put("title", "即时通讯");
		message.put("unit", "个");
		message.put("dataName", JSON.parse("[ [ 'zhuTiName', '即时通讯' ]]"));
//		message.put("dataSet", JSON.parse("[ [ '注册用户', 843 ], [ '群组数', 209 ], [ '在线人数', 578 ] ]"));
		String dataSet = "[ {"+
				"	name : '注册用户',"+
				"	value : 843,"+
				"	color : 'rgb(37,162,239)'"+
				"}, {"+
				"	name : '群组数',"+
				"	value : 209,"+
				"	color : 'rgb(10,60,120)'"+
				"},{"+
				"	name : '在线人数',"+
				"	value : 578,"+
				"	color : 'url(#Layer0_0_FILL)'"+
				"} ]";
				message.put("dataSet", JSON.parse(dataSet));
		return "widgetRight1";
	}
	@Action(value="widgetRight2", results={@Result(name = "widgetRight2", type = "json", params = { "root", "message" })})
	public String widgetRight2() {
		message = new HashMap<String, Object>();
		message.put("title", "督查督办");
		message.put("unit", "件");
//		message.put("dataSet", JSON.parse("[ [ '已办结', 843 ], [ '督办件', 209 ] ]"));
		message.put("dataName", JSON.parse("[ [ 'zhuTiName', '督查督办' ]]"));
		String dataSet = "[ {"+
				"	name : '已办结',"+
				"	value : 843,"+
				"	color : 'rgb(37,162,239)'"+
				"}, {"+
				"	name : '督办件',"+
				"	value : 209,"+
				"	color : 'rgb(10,60,120)'"+
				"}]";
				message.put("dataSet", JSON.parse(dataSet));
		return "widgetRight2";
	}
	@Action(value="widgetRight3", results={@Result(name = "widgetRight3", type = "json", params = { "root", "message" })})
	public String widgetRight3() {
		message = new HashMap<String, Object>();
		message.put("title", "公文处理");
		message.put("unit", "件");
//		message.put("dataSet", JSON.parse("[ [ '发文逾期数', 843 ], [ '收文逾期数', 209 ], [ '发文数', 578 ], [ '收文数', 578 ] ]"));
		message.put("dataName", JSON.parse("[ [ 'zhuTiName', '公文处理' ]]"));
		String dataSet = "[ {"+
				"	name : '发文逾期数',"+
				"	value : 843,"+
				"	color : 'rgb(37,162,239)'"+
				"}, {"+
				"	name : '收文逾期数',"+
				"	value : 209,"+
				"	color : 'rgb(10,60,120)'"+
				"},{"+
				"	name : '发文数',"+
				"	value : 578,"+
				"	color : 'url(#Layer0_0_FILL)'"+
				"}, {"+
				"	name : '收文数',"+
				"	value : 578,"+
				"	color : 'rgb(10,26,60)'"+
				"} ]";
				message.put("dataSet", JSON.parse(dataSet));
		return "widgetRight3";
	}
	@Action(value="widgetRight4", results={@Result(name = "widgetRight4", type = "json", params = { "root", "message" })})
	public String widgetRight4() {
		message = new HashMap<String, Object>();
		message.put("title", "主体类型");
		String data = "[ [ {"+
		"	axis : '施工企业',"+
		"	value : 0.22"+
		"}, {"+
		"	axis : '勘察设计企业',"+
		"	value : 0.12"+
		"}, {"+
		"	axis : '招标代理机构',"+
		"	value : 0.18"+
		"}, {"+
		"	axis : '监理企业',"+
		"	value : 0.17"+
		"}, {"+
		"	axis : '工程质量检测机构',"+
		"	value : 0.33"+
		"} ] ]";
		message.put("data", JSON.parse(data));
		return "widgetRight4";
	}
	@Action(value="widgetRight5", results={@Result(name = "widgetRight5", type = "json", params = { "root", "message" })})
	public String widgetRight5() {
		message = new HashMap<String, Object>();
		message.put("title", "企业信用等级");
		message.put("unit", "数量");
		message.put("xMarks", JSON.parse("[ '', '施工企业', '勘察设计企业', '监理企业', '招标代理机构' ]"));
		String serious = "[ {"+
		"	type : 'AAA(A)',"+
		"	data : [0, 40, 10, 15, 5 ]"+
		"}, {"+
		"	type : 'AA(A)',"+
		"	data : [0, 30, 43, 23, 10 ]"+
		"}, {"+
		"	type : 'A(A)',"+
		"	data : [0, 20, 13, 10, 10 ]"+
		"}, {"+
		"	type : 'B',"+
		"	data : [0, 10, 21, 20, 35 ]"+
		"} ]";
		message.put("serious", JSON.parse(serious));
		return "widgetRight5";
	}
	@Action(value="widgetRight6", results={@Result(name = "widgetRight6", type = "json", params = { "root", "message" })})
	public String widgetRight6() {
		message = new HashMap<String, Object>();
		message.put("title", "在建项目");
		message.put("unit", "投资额（万）");
		message.put("labels", JSON.parse("[ '2010', '2011', '2012', '2013', '2014', '2015', '2016' ]"));
		message.put("Counts", JSON.parse("[ 50, 80, 100, 850, 90, 120, 70 ]"));
		return "widgetRight6";
	}

}
