package com.xinlai.zhnx.education.action;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.education.service.RightService;

@Controller
@Namespace("/education/right")
public class RightAction extends BaseAction {

	@Resource(name = "eduRightService")
	private RightService eduRightService;
	
	@Action(value="getEduRight", results={@Result(name = "getEduRight", type = "json", params = { "root", "message" })})
	public String getEduRight(){
		message = new HashMap<String, Object>();
		message = eduRightService.getEduRight();
//		String schoolType = "[ '学校总数量', '中小学学校总数量', '学前学校总数量', '中职学校总数量' ]";
//		String schoolNum = "[ 52361, 9361, 5221, 1367 ]";
//		String studentType = "[ '学生总数量', '中小学生总数量', '学前学生总数量', '中职学生总数量' ]";
//		String studentNum = "[ 1402234, 467823, 623488, 310283 ]";
//		String teacherType = "[ '教职工总数量', '中小学教职工总数量', '学前教职工总数量', '中职教职工总数量' ]";
//		String teacherNum = "[ 28393, 13823, 61283, 47824 ]";
//		
//		message.put("schoolType", JSON.parse(schoolType));
//		message.put("schoolNum", JSON.parse(schoolNum));
//		message.put("studentType", JSON.parse(studentType));
//		message.put("studentNum", JSON.parse(studentNum));
//		message.put("teacherType", JSON.parse(teacherType));
//		message.put("teacherNum", JSON.parse(teacherNum));
		
		return "getEduRight";
	}
}
