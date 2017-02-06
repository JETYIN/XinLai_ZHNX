package com.xinlai.zhnx.education.dao;

import java.util.List;
import java.util.Map;

public interface StudentsDao {
	
	public Map<String, Object> getEduConstitute(String areaCode);

	public List<Map<String, Object>> getDataAnaly(String areaCode);
	
	public List<Map<String, Object>> getPrimarySecondary_zxsj(String areaCode);
	
	public List<Map<String, Object>> getPrimarySecondary_zxnn(String areaCode);
	
	public List<Map<String, Object>> getPrimarySecondary_lset(String areaCode);
	
	public List<Map<String, Object>> getPrimarySecondary_djxs(String areaCode);
	
	public List<Map<String, Object>> getPreSchool(String areaCode);
	
	public List<Map<String, Object>> getPreSchoolLBC(String areaCode);
}
