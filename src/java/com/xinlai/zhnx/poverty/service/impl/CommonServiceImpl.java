package com.xinlai.zhnx.poverty.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.xinlai.zhnx.poverty.dao.CommonDao;
import com.xinlai.zhnx.poverty.service.CommonService;


@Service("CommonService")
public class CommonServiceImpl implements CommonService{

	@Resource
	private CommonDao commonDao;
	
	
	
	public List<Object> queryareabyid(String areaid) {
		
		List<Object> arealist = commonDao.queryareabyid(areaid);
		return arealist;
	}

}
