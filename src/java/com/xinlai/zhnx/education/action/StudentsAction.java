package com.xinlai.zhnx.education.action;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.education.service.StudentsService;
@Controller
@Namespace("/education/students")
public class StudentsAction extends BaseAction{
	
	private String areaCode;
	
	@Resource
	StudentsService studentsService;
	/**
	 * 根据areaCode查询学生构成
	 * @return
	 */
	@Action(value="getEduConstitute", results={@Result(name = "getEduConstitute", type = "json", params = { "root", "message" })})
	public String getEduConstitute(){
		message = new HashMap<String, Object>();
//		String series = "[" +
//		        "        {" +
//		        "            type:['中小学学生数量比','学前学生数量比','中职学生数量比']," +
//		        "            value:[160000,120000,41000]" +
//		        "        }" +
//		        "]";
		message.put("series", studentsService.getEduConstitute(areaCode));
		return "getEduConstitute";
	}
	
	/**
	 * 根据areaCode查询学生数据分析
	 * @return
	 */
	@Action(value="getDataAnaly", results={@Result(name = "getDataAnaly", type = "json", params = { "root", "message" })})
	public String getDataAnaly(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	data : [" +
//				"        {" +
//				"        	name : '学前教育'," +
//				"        	unit : '人'," +
//				"        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"        	data : [13000, 12000, 13000, 12000, 10000]" +
//				"        }," +
//				"        {" +
//				"        	name : '中小学教育'," +
//				"        	unit : '人'," +
//				"        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"        	data : [16000, 15500, 17000, 14000, 14000]" +
//				"        }," +
//				"        {" +
//				"        	name : '中职教育'," +
//				"        	unit : '人'," +
//				"        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"        	data : [4100, 6100, 4100, 3500, 3000]" +
//				"        }" +
//				"	]" +
//				"}";
		message.put("series", studentsService.getDataAnaly(areaCode));
		return "getDataAnaly";
	}
	
	/**
	 * 根据areaCode查询中小学教育数据
	 * @return
	 */
	@Action(value="getPrimarySecondary", results={@Result(name = "getPrimarySecondary", type = "json", params = { "root", "message" })})
	public String getPrimarySecondary(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	nav : ['在校生数据分析', '在校生男女比例', '留守儿童数据分析', '特教学生数据分析']," +
//				"	series : [" +
//				"	     {" +
//				"	    	 data : [" +
//				"		        {" +
//				"		        	name : '小学'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [130000, 120000, 100000, 80000, 60000]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '初中'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [50600, 46300, 42200, 32200, 31100]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '高中'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [22100, 16100, 13200, 15000, 13100]" +
//				"		        }" +
//				"			] " +
//				"	     }, " +
//				"	     {" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '总数'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [420000, 320000, 270000, 230000, 210000]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '男生数'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [220000, 170000, 140000, 120000, 110000]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '女生数'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [200000, 150000, 130000, 110000, 10000]" +
//				"		        }" +
//				"			]" +
//				"		}," +
//				"		{" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '单亲'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [41000, 32000, 27000, 23000, 21000]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '双亲'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [22000, 17500, 14000, 12000, 11000]" +
//				"		        }" +
//				"			]" +
//				"		}," +
//				"		{" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '视力残疾'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [500, 270, 210, 200, 300]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '听力残疾'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [170, 150, 100, 100, 80]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '智力残疾'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [100, 100, 80, 80, 30]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '肢体残疾'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [120, 120, 90, 70, 50]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '其他残疾'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [200, 200, 100, 100, 100]" +
//				"		        }" +
//				"			]" +
//				"		}" +
//				"	]" +
//				"}";
		message.put("series", studentsService.getPrimarySecondary(areaCode));
		return "getPrimarySecondary";
	}

	/**
	 * 根据areaCode查询学前教育
	 * @return
	 */
	@Action(value="getPreSchool", results={@Result(name = "getPreSchool", type = "json", params = { "root", "message" })})
	public String getPreSchool(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	nav : ['在园幼儿数据分析', '城镇乡幼儿情况', '学前留守幼儿数据']," +
//				"	series : [" +
//				"	     {" +
//				"	    	 data : [" +
//				"		        {" +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [54000, 47000, 32000, 28800, 26800]" +
//				"		        }" +
//				"			] " +
//				"	     }, " +
//				"	     {" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '城区'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [22000, 12000, 17000, 13000, 11000]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '镇区'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [12000, 12000, 13000, 10000, 9000]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '乡村'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [13000, 12000,14000, 9000, 8000]" +
//				"		        }" +
//				"			]" +
//				"		}," +
//				"		{" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '幼儿'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [41000, 32000, 27000, 23000, 21000]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '留守儿童'," +
//				"		        	unit : '人'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [12000, 7000, 4000, 5000, 3000]" +
//				"		        }" +
//				"			]" +
//				"		}" +
//				"	]" +
//				"}";
		message.put("series", studentsService.getPreSchool(areaCode));
		return "getPreSchool";
	}
	
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
}
