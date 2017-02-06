package com.xinlai.zhnx.education.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.education.dao.RightDao;
import com.xinlai.zhnx.education.service.RightService;

@Service("eduRightService")
public class RightServiceImpl implements RightService {

	@Resource(name="eduRightDao")
	private RightDao eduRightDao;

	@Override
	public Map<String, Object> getEduRight() {
		String schoolType = "[ '学校总数量', '中小学学校总数量', '学前学校总数量', '中职学校总数量' ]";
		String studentType = "[ '学生总数量', '中小学生总数量', '学前学生总数量', '中职学生总数量' ]";
		Map<String, Object> studentMap = eduRightDao.getStudent();
		Map<String, Object> schoolMap = eduRightDao.getSchool();
		List<Map<String, Object>> teacherList = eduRightDao.getTeacher();
		List<BigDecimal> schoolNumList = new ArrayList<BigDecimal>();
		List<BigDecimal> studentNumList = new ArrayList<BigDecimal>();
		BigDecimal sumschool =  (BigDecimal) schoolMap.get("PreschoolNum");
		sumschool = sumschool.add((BigDecimal) schoolMap.get("PrimarySecondarySchoolNum"));
		sumschool = sumschool.add((BigDecimal) schoolMap.get("VocationalEduSchoolNum"));
		schoolNumList.add(sumschool);
		schoolNumList.add((BigDecimal) schoolMap.get("PreschoolNum"));
		schoolNumList.add((BigDecimal) schoolMap.get("PrimarySecondarySchoolNum"));
		schoolNumList.add((BigDecimal) schoolMap.get("VocationalEduSchoolNum"));
		BigDecimal sumstudent =  (BigDecimal) studentMap.get("PreschoolStuNum");
		sumstudent = sumstudent.add((BigDecimal) studentMap.get("PrimarySecondaryStuNum"));
		sumstudent = sumstudent.add((BigDecimal) studentMap.get("VocationalEduStuNum"));
		studentNumList.add(sumstudent);
		studentNumList.add((BigDecimal) studentMap.get("PreschoolStuNum"));
		studentNumList.add((BigDecimal) studentMap.get("PrimarySecondaryStuNum"));
		studentNumList.add((BigDecimal) studentMap.get("VocationalEduStuNum"));
		List<String> teacherTypeList = new ArrayList<String>();
		List<BigDecimal> teacherNumList = new ArrayList<BigDecimal>();
		for(int i=0;i<teacherList.size();i++)
		{
			Map<String, Object> dataMap = teacherList.get(i);
			teacherTypeList.add((String) dataMap.get("Type")+"总数量");
			teacherNumList.add((BigDecimal) dataMap.get("NumOfType"));
		}
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("schoolType", JSON.parse(schoolType));
		message.put("schoolNum", schoolNumList);
		message.put("studentType", JSON.parse(studentType));
		message.put("studentNum", studentNumList);
		message.put("teacherType", teacherTypeList);
		message.put("teacherNum", teacherNumList);
		return message;
	}
	
}
