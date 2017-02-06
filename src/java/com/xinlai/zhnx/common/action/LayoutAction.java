package com.xinlai.zhnx.common.action;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.stereotype.Controller;

import com.xinlai.zhnx.common.service.LayoutService;

@Controller
@Namespace("/common/layout")
@Results({
		@Result(name = "setLayout", type = "json", params = { "root", "message" }),
		@Result(name = "getLayout", type = "json", params = { "root", "message" }) })
public class LayoutAction extends BaseAction {

	private static final long serialVersionUID = 2427999333796214503L;

	@Resource
	private LayoutService layoutService;

	private String layoutInfo;

	@Action(value = "/setLayout")
	public String setLayout() {
		layoutService.setLayout(layoutInfo);
		message = new HashMap<String, Object>();
		message.put("success", true);
		return "setLayout";
	}

	@Action("/getLayout")
	public String getLayout() {
		message = new HashMap<String, Object>();
		message.put("layout", layoutService.getLayout());
		return "getLayout";
	}

	public String getLayoutInfo() {
		return layoutInfo;
	}

	public void setLayoutInfo(String layoutInfo) {
		this.layoutInfo = layoutInfo;
	}

}
