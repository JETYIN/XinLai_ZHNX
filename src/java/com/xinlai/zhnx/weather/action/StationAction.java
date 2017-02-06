package com.xinlai.zhnx.weather.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.weather.service.StationService;


@Controller
@Namespace("/weather/station")
public class StationAction extends BaseAction{
	
	@Autowired
	StationService stationService;

	private static final long serialVersionUID = -2980262154360635866L;
	
	@Action(value="Stationinfo", results={@Result(name = "Stationinfo", type = "json", params = { "root", "message" })})
	public String Stationinfo() {
		message = new HashMap<String, Object>();
		List<Object> stationlist = new ArrayList();
		stationlist = stationService.query();
		message.put("series", stationlist);
		return "Stationinfo";
		
	}
}
