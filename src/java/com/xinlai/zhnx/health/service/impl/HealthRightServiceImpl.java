package com.xinlai.zhnx.health.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.xinlai.zhnx.health.dao.HealthRightDao;
import com.xinlai.zhnx.health.service.HealthRightService;

@Service("healthRightService")
public class HealthRightServiceImpl implements HealthRightService {
	@Resource
	private HealthRightDao healthRightDao;
}
