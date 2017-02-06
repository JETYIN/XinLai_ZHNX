package com.xinlai.zhnx.weather.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.weather.service.ForecastService;
@Controller
@Namespace("/weather/forecast")
public class ForecastAction extends BaseAction{

	private static final long serialVersionUID = 7953190348209257169L;

	private String areaCode;
	
	@Resource
	private ForecastService forecastService;
	
	/**
	 * 根据areaCode查询当地的下周七天天气预报
	 * @return
	 */
	@Action(value="getTrendForecast", results={@Result(name = "getTrendForecast", type = "json", params = { "root", "message" })})
	public String getTrendForecast(){
		message = forecastService.getTrendForecast(areaCode);
		return "getTrendForecast";
	}
	/**
	 * 根据areaCode查询当地的生活指数
	 * @return
	 */
	@Action(value="getLifeIndex", results={@Result(name = "getLifeIndex", type = "json", params = { "root", "message" })})
	public String getLifeIndex(){
		message = new HashMap<String, Object>();
		message.put("series", forecastService.getLifeIndex(areaCode));
		return "getLifeIndex";
	}
	/**
	 * 查询警告信息
	 * @return
	 */
	@Action(value="getWarMsgRoll", results={@Result(name = "getWarMsgRoll", type = "json", params = { "root", "message" })})
	public String getWarMsgRoll(){
		message = new HashMap<String, Object>();
		message.put("series", forecastService.getWarMsgRoll());
		return "getWarMsgRoll";
	}
	/**
	 * 天气临近预报
	 * @return
	 */
	@Action(value="getTodayTrendForecast", results={@Result(name = "getTodayTrendForecast", type = "json", params = { "root", "message" })})
	public String getTodayTrendForecast(){
		message = new HashMap<String, Object>();
		message.put("series", forecastService.getTodayTrendForecast(areaCode));
		return "getTodayTrendForecast";
	}

	/**
	 * 根据areaCode查询地图信息
	 * @return
	 */
	@Action(value="getMapInfo", results={@Result(name = "getMapInfo", type = "json", params = { "root", "message" })})
	public String getMapInfo(){
		message = new HashMap<String, Object>();
		List<Map<String, Object>> series = new ArrayList<Map<String,Object>>();
		series.add(forecastService.getMapInfo(areaCode));
		message.put("series", series);
		return "getMapInfo";
	}
	
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
}
