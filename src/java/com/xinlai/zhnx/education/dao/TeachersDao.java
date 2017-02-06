package com.xinlai.zhnx.education.dao;

import java.util.List;
import java.util.Map;

public interface TeachersDao {

	List<Map<String, Object>> getTeacher(Map data);
	
	List<Map<String, Object>> getEduConstitute(Map data);
}
