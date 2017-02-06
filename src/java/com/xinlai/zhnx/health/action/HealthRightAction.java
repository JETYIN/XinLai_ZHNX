package com.xinlai.zhnx.health.action;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.stereotype.Controller;

import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.health.service.HealthRightService;

@Controller
@Namespace("/health/healthRight")
public class HealthRightAction extends BaseAction{
	@Resource
	private HealthRightService healthRightService;
}
