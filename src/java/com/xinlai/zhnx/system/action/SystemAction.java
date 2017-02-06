package com.xinlai.zhnx.system.action;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.system.service.SystemService;

@Controller
@Namespace("/system/system")
public class SystemAction extends BaseAction{
	
	@Resource
	private SystemService systemService;
	
	@Action(value="getBaseData", results={@Result(name = "getBaseData", type = "json", params = { "root", "message" })})
	public String getBaseData(){
		message = new HashMap<String, Object>();
		Map<String, Object> series = new HashMap<String, Object>();
		series = systemService.getBaseData();
//		String series = "{" +
//		"	'area': {" +
//		"		'code': '640000000000'," +
//		"		'name': '宁夏回族自治区'" +
//		"	}," +
//		"	'menu': [" +
//		"		{" +
//		"			'name': '教育云'," +
//		"			'id':'2',"+
//		"			'children': [" +
//		"			  {" +
//		"				'name': '学生情况'," +
//		"				'url': 'module/education/students.html'," +
//		"				'urlRight' : 'module/education/studentsRight.html'," +
//		"				'available': true" +
//		"			  }," +
//		"			  {" +
//		"				'name': '学校情况'," +
//		"				'url': 'module/education/schools.html'," +
//		"				'urlRight' : 'module/education/schoolsRight.html'," +
//		"				'available': true" +
//		"			  }," +
//		"			  {" +
//		"				'name': '教职工情况'," +
//		"				'url': 'module/education/teachers.html'," +
//		"				'urlRight' : 'module/education/teachersRight.html'," +
//		"				'available': true" +
//		"			  }," +
//		"			  {" +
//		"				'name': '三通两平台'," +
//		"				'url': 'module/education/resourcePlatform.html'," +
//		"				'urlRight' : 'module/education/resourcePlatformRight.html'," +
//		"				'available': true" +
//		"			  }" +
//		"			]" +
//		"		}" +
//		"	]," +
//		"   'globalMetric': [" +
//		"        {" +
//		"            'key': '全区总面积'," +
//		"            'value': '6.64'," +
//		"            'unit': '万平方千米'" +
//		"        }," +
//		"        {" +
//		"            'key': '全区人口总数'," +
//		"            'value': '662.00'," +
//		"            'unit': '万人'" +
//		"        }" +
//		"   ]" +
//		"}";
		message.put("series", series);
		return "getBaseData";
	}
}
