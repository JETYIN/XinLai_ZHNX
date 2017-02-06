package com.xinlai.zhnx.education.action;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.education.service.TeachersService;
@Controller
@Namespace("/education/teachers")
public class TeachersAction extends BaseAction{

	private String areaCode;
	
	@Resource
	TeachersService teachersService;
	/**
	 * 根据areaCode查询教职工数量
	 * @return
	 */
	@Action(value="getTeacherCount", results={@Result(name = "getTeacherCount", type = "json", params = { "root", "message" })})
	public String getTeacherCount(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	data : [" +
//				"        {" +
//				"        	name : '总人数'," +
//				"        	unit : '人'," +
//				"        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"        	data : [13000, 12000, 13000, 12000, 10000]" +
//				"        }," +
//				"        {" +
//				"        	name : '男教师'," +
//				"        	unit : '人'," +
//				"        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"        	data : [16000, 15500, 17000, 14000, 14000]" +
//				"        }," +
//				"        {" +
//				"        	name : '女教师'," +
//				"        	unit : '人'," +
//				"        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"        	data : [4100, 6100, 4100, 3500, 3000]" +
//				"        }" +
//				"	]" +
//				"}";
		message.put("series",teachersService.getTeacherCount(areaCode));
		return "getTeacherCount";
	}

	/**
	 * 根据areaCode查询教职工年龄
	 * @return
	 */
	@Action(value="getTeacherAgeCount", results={@Result(name = "getTeacherAgeCount", type = "json", params = { "root", "message" })})
	public String getTeacherAgeCount(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	data : [" +
//				"        {" +
//				"        	name : ''," +
//				"        	unit : '人'," +
//				"        	label : ['25以下', '26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60', '61-65', '65以上']," +
//				"        	data : [58000, 91000, 118000, 135000, 171000, 111000, 86000, 61000, 39000, 21000]" +
//				"        }" +
//				"	]" +
//				"}";
		message.put("series", teachersService.getTeacherAgeCount(areaCode));
		return "getTeacherAgeCount";
	}
	/**
	 * 根据areaCode查询教育阶段教师分布
	 * @return
	 */
	@Action(value="getEduConstitute", results={@Result(name = "getEduConstitute", type = "json", params = { "root", "message" })})
	public String getEduConstitute(){
		message = new HashMap<String, Object>();
//		String series = "[" +
//		        "    {" +
//		        "        type:['中小学教师数量比','高职教师数量比','中职教师数量比','学前教师数量比','特教教师数量比','高校教师数量比']," +
//		        "        value:[9332,6269,7210,5000,3002,8029]" +
//		        "    }" +
//		        "]";
		message.put("series", teachersService.getEduConstitute(areaCode));
		return "getEduConstitute";
	}

	/**
	 * 根据areaCode查询教职工职称、学历分析
	 * @return
	 */
	@Action(value="getDataAnaly", results={@Result(name = "getDataAnaly", type = "json", params = { "root", "message" })})
	public String getDataAnaly(){
		message = new HashMap<String, Object>();
//		String series = "[" +
//		        "    {" +
//		        "        type:['高级职称','小学一级职称','小学二级职称','小学三级职称','中学一级职称','中学二级职称','中学三级职称']," +
//		        "        value:[9332,6269,7210,5000,3002,8029,3002]" +
//		        "    }," +
//		        "    {" +
//		        "        type:['本科毕业','专科毕业','博士毕业','硕士毕业']," +
//		        "        value:[9332,6269,7210,5000]" +
//		        "    }" +
//		        "]";
		message.put("series", teachersService.getDataAnaly(areaCode));
		return "getDataAnaly";
	}
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
	
}
