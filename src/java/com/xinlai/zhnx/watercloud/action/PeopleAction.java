package com.xinlai.zhnx.watercloud.action;

import java.util.HashMap;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;

@Controller
@Namespace("/waterCloud/people")
public class PeopleAction extends BaseAction {
	private static final long serialVersionUID = 3457966433862431129L;
	@Action(value="widget1", results={@Result(name = "widget1", type = "json", params = { "root", "message" })})
	public String widget1() {
		message = new HashMap<String, Object>();
		message.put("title", "启动智能人饮系统县数");
		message.put("labels", JSON.parse("[ '2013年', '2014年', '2015年' ]"));
		String series = "[ {" +
		"	name : '银川'," +
		"	data : [ 4, 8, 16 ]" +
		"}, {" +
		"	name : '石嘴山'," +
		"	data : [ 5, 9, 14 ]" +
		"}, {" +
		"	name : '吴忠'," +
		"	data : [ 3, 9, 13 ]" +
		"}, {" +
		"	name : '固原'," +
		"	data : [ 5, 11, 15 ]" +
		"}, {" +
		"	name : '中卫'," +
		"	data : [ 2, 6, 11 ]" +
		"} ]";
		message.put("series", JSON.parse(series));
		return "widget1";
	}
	@Action(value="widget2", results={@Result(name = "widget2", type = "json", params = { "root", "message" })})
	public String widget2() {
		message = new HashMap<String, Object>();
		message.put("title", "供水保障率");
		message.put("labels", JSON.parse("[ '2013年', '2014年', '2015年' ]"));
		String series = "[ {" +
		"	name : '银川'," +
		"	data : [ 0.4, 0.8, 0.16 ]" +
		"}, {" +
		"	name : '石嘴山'," +
		"	data : [ 0.5, 0.9, 0.14 ]" +
		"}, {" +
		"	name : '吴忠'," +
		"	data : [ 0.3, 0.9, 0.13 ]" +
		"}, {" +
		"	name : '固原'," +
		"	data : [ 0.5, 0.11, 0.15 ]" +
		"}, {" +
		"	name : '中卫'," +
		"	data : [ 0.2, 0.6, 0.11 ]" +
		"} ]";
		message.put("series", JSON.parse(series));
		return "widget2";
	}
	@Action(value="widget3", results={@Result(name = "widget3", type = "json", params = { "root", "message" })})
	public String widget3() {
		message = new HashMap<String, Object>();
		message.put("title", "管理成本降低");
		message.put("years", JSON.parse("[ '2013年', '2014年', '2015年' ]"));
		String series = "[ {" +
		"	city : '银川'," +
		"	data : [ 0.12, 0.33, 0.55 ]" +
		"}, {" +
		"	city : '石嘴山'," +
		"	data : [ 0.28, 0.44, 0.60 ]" +
		"}, {" +
		"	city : '吴忠'," +
		"	data : [ 0.38, 0.55, 0.71 ]" +
		"}, {" +
		"	city : '固原'," +
		"	data : [ 0.49, 0.65, 0.88 ]" +
		"}, {" +
		"	city : '中卫'," +
		"	data : [ 0.50, 0.75, 0.92 ]" +
		"} ]";
		message.put("series", JSON.parse(series));
		return "widget3";
	}
	@Action(value="widget4", results={@Result(name = "widget4", type = "json", params = { "root", "message" })})
	public String widget4() {
		message = new HashMap<String, Object>();
		message.put("title", "饮水困难师生");
		message.put("unit", "（万名）");
		message.put("citys", JSON.parse("[ '银川', '石嘴山', '吴忠', '固原', '中卫' ]"));
		String series = "[ {"+
		"	year : '2013年',"+
		"	data : [ 2.25, 3.67, 4.44, 3.22, 5.18 ]"+
		"}, {"+
		"	year : '2014年',"+
		"	data : [ 3.25, 2.67, 3.44, 4.22, 4.18 ]"+
		"}, {"+
		"	year : '2015年',"+
		"	data : [ 4.25, 4.67, 2.44, 5.22, 3.18 ]"+
		"} ]";
		message.put("series", JSON.parse(series));
		return "widget4";
	}
	@Action(value="widget5", results={@Result(name = "widget5", type = "json", params = { "root", "message" })})
	public String widget5() {
		message = new HashMap<String, Object>();
		message.put("title", "饮水困难人员");
		message.put("unit", "（亿立方米）");
		message.put("citys", JSON.parse("[ '银川', '石嘴山', '吴忠', '固原', '中卫' ]"));
		String series = "[ {"+
		"	year : '2013年',"+
		"	data : [ 2.25, 3.67, 4.44, 3.22, 5.18 ]"+
		"}, {"+
		"	year : '2014年',"+
		"	data : [ 3.25, 2.67, 3.44, 4.22, 4.18 ]"+
		"}, {"+
		"	year : '2015年',"+
		"	data : [ 4.25, 4.67, 2.44, 5.22, 3.18 ]"+
		"} ]";
		message.put("series", JSON.parse(series));
		return "widget5";
	}
	@Action(value="widget6", results={@Result(name = "widget6", type = "json", params = { "root", "message" })})
	public String widget6() {
		message = new HashMap<String, Object>();
		message.put("title", "水量信息");
		message.put("labels", JSON.parse("['银川', '石嘴山', '吴忠', '固原', '中卫']"));
		String series = "[{" +
				"	name:['2015年']," +
				"	data:[10]" +
				"},{" +
				"	name:['2015年']," +
				"	data:[9]" +
				"},{" +
				"	name:['2015年']," +
				"	data:[15]" +
				"},{" +
				"	name:['2015年']," +
				"	data:[3]" +
				"},{" +
				"	name:['2015年']," +
				"	data:[8]" +
				"}]";
		message.put("series", JSON.parse(series));
		return "widget6";
	}
	@Action(value="widget7", results={@Result(name = "widget7", type = "json", params = { "root", "message" })})
	public String widget7() {
		message = new HashMap<String, Object>();
		message.put("title", "工程数量");
		message.put("unit", "（千项）");
		message.put("citys", JSON.parse("[ '银川', '石嘴山', '吴忠', '固原', '中卫' ]"));
		String series = "[ {"+
		"	year : '2013年',"+
		"	data : [ 2.25, 3.67, 4.44, 3.22, 5.18 ]"+
		"}, {"+
		"	year : '2014年',"+
		"	data : [ 3.25, 2.67, 3.44, 4.22, 4.18 ]"+
		"}, {"+
		"	year : '2015年',"+
		"	data : [ 4.25, 4.67, 2.44, 5.22, 3.18 ]"+
		"} ]";
		message.put("series", JSON.parse(series));
		return "widget7";
	}
	@Action(value="widget8", results={@Result(name = "widget8", type = "json", params = { "root", "message" })})
	public String widget8() {
		message = new HashMap<String, Object>();
		message.put("title", "水表数量");
		message.put("unit", "（成名）");
		message.put("citys", JSON.parse("[ '银川', '石嘴山', '吴忠', '固原', '中卫' ]"));
		String series = "[ {"+
		"	year : '2013年',"+
		"	data : [ 2.25, 3.67, 4.44, 3.22, 5.18 ]"+
		"}, {"+
		"	year : '2014年',"+
		"	data : [ 3.25, 2.67, 3.44, 4.22, 4.18 ]"+
		"}, {"+
		"	year : '2015年',"+
		"	data : [ 4.25, 4.67, 2.44, 5.22, 3.18 ]"+
		"} ]";
		message.put("series", JSON.parse(series));
		return "widget8";
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
