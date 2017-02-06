package com.xinlai.zhnx.watercloud.action;

import java.util.HashMap;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.watercloud.service.IndustryService;

@Controller
@Namespace("/waterCloud/industry")
public class IndustryAction extends BaseAction {
	
    @Autowired
    IndustryService  industryService;
    
	private static final long serialVersionUID = 3457966433862431129L;
	@Action(value="widget1", results={@Result(name = "widget1", type = "json", params = { "root", "message" })})
	public String widget1() {
		message = new HashMap<String, Object>();
		message.put("title", "万元工业增加值用水量");
		message.put("unit", "（立方米）");
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
		return "widget1";
	}
	@Action(value="widget2", results={@Result(name = "widget2", type = "json", params = { "root", "message" })})
	public String widget2() {
		message = new HashMap<String, Object>();
		message.put("title", "引黄水量");
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
		return "widget2";
	}
	@Action(value="widget3", results={@Result(name = "widget3", type = "json", params = { "root", "message" })})
	public String widget3() {
		message = new HashMap<String, Object>();
		message.put("title", "工业日供水量");
		message.put("unit", "万吨");
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
		return "widget3";
	}
	@Action(value="widget4", results={@Result(name = "widget4", type = "json", params = { "root", "message" })})
	public String widget4() {
		message = new HashMap<String, Object>();
		message.put("title", "现代水利基础设施数量");
		message.put("labels", JSON.parse("[ '2013年', '2014年', '2015年' ]"));
		String series = "[ {"+
		"	name : '银川',"+
		"	data : [ 4000, 8000, 16000 ]"+
		"}, {"+
		"	name : '石嘴山',"+
		"	data : [ 5000, 9000, 14000 ]"+
		"}, {"+
		"	name : '吴忠',"+
		"	data : [ 3000, 9000, 13000 ]"+
		"}, {"+
		"	name : '固原',"+
		"	data : [ 5000, 11000, 15000 ]"+
		"}, {"+
		"	name : '中卫',"+
		"	data : [ 2000, 6000, 11000 ]"+
		"} ]";
		message.put("series", JSON.parse(series));
		return "widget4";
	}
	@Action(value="widget5", results={@Result(name = "widget5", type = "json", params = { "root", "message" })})
	public String widget5() {
	    
		message = new HashMap<String, Object>();
		//message.put("title", "最大耗水量前10大企业");
		//message.put("subTitle", "（立方米）");
		String[] labellist = { "银川", "石嘴山", "吴忠", "固原", "中卫" };
		message = industryService.query(labellist);
		message.put("labels", JSON.parse("['银川', '石嘴山', '吴忠', '固原', '中卫']"));
//		String series = "["+
//				"["+
//				"		{"+
//				"			year : '2013',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		},"+
//				"		{"+
//				"			year : '2014',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		} ],"+
//				"["+
//				"		{"+
//				"			year : '2013',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		},"+
//				"		{"+
//				"			year : '2014',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		} ],"+
//				"["+
//				"		{"+
//				"			year : '2013',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		},"+
//				"		{"+
//				"			year : '2014',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		} ],"+
//				"["+
//				"		{"+
//				"			year : '2013',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		},"+
//				"		{"+
//				"			year : '2014',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		} ],"+
//				"["+
//				"		{"+
//				"			year : '2013',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		},"+
//				"		{"+
//				"			year : '2014',"+
//				"			company : [ '企业1', '企业2', '企业3', '企业4', '企业5',"+
//				"					'企业6', '企业7', '企业8', '企业9', '企业10' ],"+
//				"			data : [ 25560, 15600, 9600, 8600, 5600, 5600,"+
//				"					3600, 2600, 1500, 250 ]"+
//				"		} ] ]";
//		message.put("series", JSON.parse(series));
		return "widget5";
	}
	

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
