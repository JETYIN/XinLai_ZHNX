package com.xinlai.zhnx.education.service;

import java.util.List;
import java.util.Map;

public interface SchoolsService {
	
	public List<Object> getEduConstitute(String areaCode);

	public Map<String, Object> getDataAnaly(String areaCode);
	
	public Map<String, Object> getPrimarySecondary(String areaCode);

	public Map<String, Object> getPreSchool(String areaCode);
}
