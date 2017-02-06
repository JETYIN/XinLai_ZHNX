package com.xinlai.zhnx.poverty.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.poverty.service.CommonService;


@Controller
@Namespace("/poverty/common")
public class CommonAction extends BaseAction{
	
	
	/**
	 * 
	 */
	@Autowired
	CommonService commonService;
	
	private static final long serialVersionUID = -8743318411284528592L;
	
	protected List<Object> areainfolist = new ArrayList<Object>();

	public List<Object> getAreainfolist() {
		return areainfolist;
	}

	public void setAreainfolist(List<Object> areainfolist) {
		this.areainfolist = areainfolist;
	}
	
	protected String areaCode;  

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
	@Action(value="Getareabyid", results={@Result(name = "Getareabyid", type = "json", params = { "root", "areainfolist" })})
	public String Getareabyid(){
		
		
		areainfolist = commonService.queryareabyid(areaCode);
		return "Getareabyid";
	}

}
