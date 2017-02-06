package com.xinlai.zhnx.health.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.xinlai.zhnx.health.dao.RegionalPlatformDao;
import com.xinlai.zhnx.health.service.RegionalPlatformService;

@Service("regionalPlatformService")
public class RegionalPlatformServiceImpl implements RegionalPlatformService {
	@Resource
	private RegionalPlatformDao regionalPlatformDao;
}
