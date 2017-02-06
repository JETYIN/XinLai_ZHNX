package com.xinlai.zhnx.watercloud.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.xinlai.zhnx.watercloud.dao.AgricultureDao;
import com.xinlai.zhnx.watercloud.service.AgricultureService;

@Service("agricultureService")
public class AgricultureServiceImpl implements AgricultureService {

	@Resource
	private AgricultureDao agricultureDao;

	@Override
	public void test() {
		agricultureDao.test();
	}

}
