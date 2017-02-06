package com.xinlai.zhnx.weather.service.impl;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.xinlai.zhnx.weather.dao.StationDao;
import com.xinlai.zhnx.weather.service.StationService;


@Service("StationService")
public class StationServiceImpl implements StationService{
	
	@Resource
	private StationDao stationDao;
	
	public List<Object> query(){
		
		List<Object> stationlist = stationDao.queryweatherstation();
		return stationlist;
		
	}
}
