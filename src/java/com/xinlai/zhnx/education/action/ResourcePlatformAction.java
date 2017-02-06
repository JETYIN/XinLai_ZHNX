package com.xinlai.zhnx.education.action;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.education.service.ResourcePlatformService;
@Controller
@Namespace("/education/resourcePlatform")
public class ResourcePlatformAction extends BaseAction{

	private String areaCode;

	@Resource
	ResourcePlatformService resourcePlatformService;
	/**
	 * 教育资源公共服务平台
	 * @return
	 */
	@Action(value="getEduSTLPTResource", results={@Result(name = "getEduSTLPTResource", type = "json", params = { "root", "message" })})
	public String getEduSTLPTResource(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	values : [7048, 20466, 6435]," +
//				"	rato : [96, 60, 100]" +
//				"}";
		String type = "教育资源公共服务平台";
		message.put("series", resourcePlatformService.getEduSTLPTResource(type));
		return "getEduSTLPTResource";
	}

	/**
	 * 教育管理公共服务平台
	 * @return
	 */
	@Action(value="getEduSTLPTManagement", results={@Result(name = "getEduSTLPTManagement", type = "json", params = { "root", "message" })})
	public String getEduSTLPTManagement(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	rato : [100, 60, 100]" +
//				"}";
		String type = "教育管理公共服务平台";
		message.put("series", resourcePlatformService.getEduSTLPTManagement(type));
		return "getEduSTLPTManagement";
	}

	/**
	 * 优质教育资源班班通
	 * @return
	 */
	@Action(value="getEduSTLPTBBT", results={@Result(name = "getEduSTLPTBBT", type = "json", params = { "root", "message" })})
	public String getEduSTLPTBBT(){
		message = new HashMap<String, Object>();
//		String series1 = "{" +
//				"	title : '近三年数字教育资源数量'," +
//				"	series : {" +
//				"		data : [" +
//				"	        {" +
//				"	        	unit : '个'," +
//				"	        	label : [2013, 2014, 2015]," +
//				"	        	data : [2821, 3469, 3887]" +
//				"	        }" +
//				"		]" +
//				"	}" +
//				"}";
//		String series2 = "{" +
//				"	title : '近三月数字教育资源下载量和上传量'," +
//				"	series : {" +
//				"		data : [" +
//				"	        {" +
//				"	        	name : '上传量'," +
//				"	        	unit : '次'," +
//				"	        	label : [8, 9, 10]," +
//				"	        	data : [2821, 3469, 3887]" +
//				"	        }," +
//				"	        {" +
//				"	        	name : '下载量'," +
//				"	        	unit : '次'," +
//				"	        	label : [8, 9, 10]," +
//				"	        	data : [1521, 1896, 1741]" +
//				"	        }" +
//				"		]" +
//				"	}" +
//				"}";
		message.put("series1", resourcePlatformService.getEduSTLPTBBT_year());
		message.put("series2", resourcePlatformService.getEduSTLPTBBT_mon());
		return "getEduSTLPTBBT";
	}

	/**
	 * 网络宽带空间人人通
	 * @return
	 */
	@Action(value="getEduSTLPTXXTRRT", results={@Result(name = "getEduSTLPTXXTRRT", type = "json", params = { "root", "message" })})
	public String getEduSTLPTXXTRRT(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	nav : ['网络学习人人通', '网络宽带校校通']," +
//				"	data1 : {" +
//				"		value : ['4.7万人', '42万人', '16万人']," +
//				"		type : ['注册基础教育教师空间', '注册学生用户空间', '职业教育专任教师空间']," +
//				"		text : ['占教师总数', '占学生总数', '占专任总数']," +
//				"		ratio : [76.0, 41.0, 100.0]" +
//				"	}," +
//				"	data2 : { " +
//				"		ratio : [82.0, 66.0, 60.0]," +
//				"		type : ['学校接入互联网', '配备多媒体教学设备', '学校信息化环境完善']" +
//				"	}" +
//				"}";
		message.put("series", resourcePlatformService.getEduSTLPTXXTRRT());
		return "getEduSTLPTXXTRRT";
	}
	
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
	
}
