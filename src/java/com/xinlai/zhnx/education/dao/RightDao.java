package com.xinlai.zhnx.education.dao;

import java.util.List;
import java.util.Map;

public interface RightDao {
	
	public Map<String, Object> getStudent();
	
	public Map<String, Object> getSchool();
	
	public List<Map<String, Object>> getTeacher();

}
