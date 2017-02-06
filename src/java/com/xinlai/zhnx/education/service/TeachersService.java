package com.xinlai.zhnx.education.service;

import java.util.List;
import java.util.Map;

public interface TeachersService {

	
	//TODO 根据areaCode查询教职工数量
	public Map<String,Object> getTeacherCount(String areaCode);
	
	//TODO 根据areaCode查询教育阶段教师分布
	public List<Map<String,Object>> getEduConstitute(String areaCode);
	
	//TODO 根据areaCode查询教职工职称、学历分析
	public List<Map<String,Object>> getDataAnaly(String areaCode);
	
	//TODO 根据areaCode查询教职工年龄
	public Map<String,Object> getTeacherAgeCount(String areaCode);
}
