package com.xinlai.zhnx.education.action;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.education.service.SchoolsService;
@Controller
@Namespace("/education/schools")
public class SchoolsAction extends BaseAction{

	private String areaCode;

	@Resource
	SchoolsService schoolsService;
	/**
	 * 根据areaCode查询学校构成
	 * @return
	 */
	@Action(value="getEduConstitute", results={@Result(name = "getEduConstitute", type = "json", params = { "root", "message" })})
	public String getEduConstitute(){
		message = new HashMap<String, Object>();
//		String series = "[" +
//		        "    {" +
//		        "        type:['学前学校数量比','中小学学校数量比','中职学校数量比']," +
//		        "        value:[130000,160000,41000]" +
//		        "    }" +
//		        "]";
		message.put("series", schoolsService.getEduConstitute(areaCode));
		return "getEduConstitute";
	}
	/**
	 * 根据areaCode查询学校数据分析
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
		message.put("series", schoolsService.getDataAnaly(areaCode));
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
//				"	nav : ['办学类型', '办学规模', '班级数规模', '分教育阶段班级数']," +
//				"	series : [" +
//				"	     {" +
//				"	    	 data : [" +
//				"		        {" +
//				"		        	name : '办学类型'," +
//				"		        	unit : ''," +
//				"		        	label : ['小学', '初中', '高中', '特殊教育']," +
//				"		        	data : [88.52, 8.85, 2.42, 0.21]" +
//				"		        }" +
//				"			] " +
//				"	     }, " +
//				"	     {" +
//				"	    	 data : [" +
//				"		        {" +
//				"		        	name : '办学规模'," +
//				"		        	unit : '所'," +
//				"		        	label : ['100人以下', '100-500人', '500-1000人', '1000-1500人', '1500-2000人', '2000人以上']," +
//				"		        	data : [4679, 3560, 3045, 4230, 4230, 1349]" +
//				"		        }" +
//				"			] " +
//				"		}," +
//				"		{" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '50-60人'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [2600, 2500, 2300, 1900, 1600]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '60-70人'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [1400, 1100, 1000, 500, 400]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '70人以上'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [530, 120, 250, 300, 100]" +
//				"		        }" +
//				"			]" +
//				"		}," +
//				"		{" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '小学'," +
//				"		        	unit : '个'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [2700, 2600, 2400, 1900, 1700]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '初中'," +
//				"		        	unit : '个'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [1400, 1000, 900, 500, 200]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '高中'," +
//				"		        	unit : '个'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [130, 120, 100, 200, 100]" +
//				"		        }" +
//				"			]" +
//				"		}," +
//				"		 {" +
//				"	    	 data : [" +
//				"		        {" +
//				"		        	name : '测试'," +
//				"		        	unit : '所'," +
//				"		        	label : ['100人以下', '100-500人', '500-1000人', '1000-1500人', '1500-2000人', '2000人以上']," +
//				"		        	data : [4679, 3560, 3045, 4230, 4230, 1349]" +
//				"		        }" +
//				"			] " +
//				"	     }" +
//				"	]" +
//				"}";
		message.put("series", schoolsService.getPrimarySecondary(areaCode));
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
//				"	nav : ['城镇乡学校数量', '公办普惠幼儿园数', '独附幼儿园数', '班额数', '学校办学规模']," +
//				"	series : [" +
//				"		{" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '城区机构'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [700, 550, 488, 690, 200]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '镇区机构'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [120, 50, 60, 62, 66]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '乡村机构'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [80, 30, 40, 38, 30]" +
//				"		        }" +
//				"			]" +
//				"		}," +
//				"		{" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '公办幼儿园'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [200, 100, 55, 80, 60]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '普惠幼儿园'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [800, 100, 500, 260, 267]" +
//				"		        }" +
//				"			]" +
//				"		}," +
//				"		{" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '独设幼儿园'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [300, 280, 320, 270, 240]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '附设幼儿园'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [800, 100, 500, 260, 267]" +
//				"		        }" +
//				"			]" +
//				"		}," +
//				"		{" +
//				"			data : [" +
//				"		        {" +
//				"		        	name : '托班'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [100, 320, 210, 120, 320]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '小班'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [330, 390, 300, 180, 767]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '中班'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [180, 540, 460, 780, 367]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '大班'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [160, 360, 660, 320, 247]" +
//				"		        }," +
//				"		        {" +
//				"		        	name : '混龄班'," +
//				"		        	unit : '所'," +
//				"		        	label : ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']," +
//				"		        	data : [150, 350, 300, 300, 140]" +
//				"		        }" +
//				"			]" +
//				"		},{" +
//				"			data : [" +
//				"			        {" +
//				"			        	name : '办学规模'," +
//				"			        	unit : '所'," +
//				"			        	label : ['0人', '10-30人', '30-90人', '90-200人', '200-300人', '300人以上']," +
//				"			        	data : [300, 280, 320, 270, 240, 150]" +
//				"			        }" +
//				"				]" +
//				"			}" +
//				"	]" +
//				"}";
		message.put("series", schoolsService.getPreSchool(areaCode));
		return "getPreSchool";
	}
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
}
