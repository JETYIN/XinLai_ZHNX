package com.xinlai.zhnx.education.service;

import java.util.List;
import java.util.Map;

/*
 * 学生情况数据服务接口
 */

public interface StudentsService {
	//TODO 查询全区统计信息 
	public List<Map<String,Object>> getEduConstitute(String areaCode);
	//TODO 根据areaCode查询每个市的学生情况
	public Map<String,Object> getDataAnaly(String areaCode);
	//TODO 根据areaCode查询中小学教育数据
	public Map<String,Object> getPrimarySecondary(String areaCode);	
	//TODO 根据areaCode查询学前教育
	public Map<String,Object> getPreSchool(String areaCode);

}
