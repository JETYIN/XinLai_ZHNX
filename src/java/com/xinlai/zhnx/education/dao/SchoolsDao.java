package com.xinlai.zhnx.education.dao;

import java.util.List;
import java.util.Map;

public interface SchoolsDao {

	public Map<String, Object> getEduConstitute(String areaCode);
	
	public List<Map<String, Object>> getDataAnaly(String areaCode);
	
	public Map<String, Object> getprimarysecondschooltype(String areaCode);
	
	public Map<String, Object> getprimarysecondschooltype_all();
	
	public List<Map<String, Object>> getprimarysecondschoolclasssize(String areaCode);
	
	public List<Map<String, Object>> getprimarysecondschoolclasssize_all();
	
	public List<Map<String, Object>> getprimarysecondschoolsize(String areaCode);
	
	public List<Map<String, Object>> getprimarysecondschoolsize_all();
	
	public List<Map<String, Object>> getprimarysecondschoolstage(String areaCode);
	
	public List<Map<String, Object>> getprimarysecondschoolstage_all();
	
	public List<Map<String, Object>> getPreSchool(Map<String, Object> data);
}
