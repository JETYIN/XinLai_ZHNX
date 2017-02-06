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
import com.xinlai.zhnx.weather.service.ActualService;
@Controller
@Namespace("/weather/actual")
public class ActualAction extends BaseAction{
	
	private String areaCode;
	protected List<Map<String, Object>> mapinfolist = new ArrayList<Map<String, Object>>();
	
	@Resource
	private ActualService actualService;
	
	/**
	 * 根据areaCode查询当地的实况天气信息
	 * @return
	 */
	@Action(value="getActualWeather", results={@Result(name = "getActualWeather", type = "json", params = { "root", "message" })})
	public String getActualWeather(){
		message = new HashMap<String, Object>();
		message.put("series", actualService.getActualWeather(areaCode));
		return "getActualWeather";
	}
	
	/**
	 * 根据areaCode查询当地的生活指数
	 * @return
	 */
	@Action(value="getLifeIndex", results={@Result(name = "getLifeIndex", type = "json", params = { "root", "message" })})
	public String getLifeIndex(){
		message = new HashMap<String, Object>();
		message.put("series", actualService.getLifeIndex(areaCode));
		return "getLifeIndex";
	}
	
	/**
	 * 根据areaCode查询当地的最高气温
	 * @return
	 */
	@Action(value="getMaxTemp", results={@Result(name = "getMaxTemp", type = "json", params = { "root", "message" })})
	public String getMaxTemp(){
		message = new HashMap<String, Object>();
		message.put("value", actualService.getMaxTemp(areaCode));
		return "getMaxTemp";
	}
	
	/**
	 * 根据areaCode查询当地的最低气温
	 * @return
	 */
	@Action(value="getMinTemp", results={@Result(name = "getMinTemp", type = "json", params = { "root", "message" })})
	public String getMinTemp(){
		message = new HashMap<String, Object>();
		message.put("value", actualService.getMinTemp(areaCode));
		return "getMinTemp";
	}
	
	/**
	 * 根据areaCode查询当地的平均气温
	 * @return
	 */
	@Action(value="getAvgTemp", results={@Result(name = "getAvgTemp", type = "json", params = { "root", "message" })})
	public String getAvgTemp(){
		message = new HashMap<String, Object>();
		message.put("value", actualService.getAvgTemp(areaCode));
		return "getAvgTemp";
	}

	/**
	 * 根据areaCode查询当地的最高风速
	 * @return
	 */
	@Action(value="getMaxWind", results={@Result(name = "getMaxWind", type = "json", params = { "root", "message" })})
	public String getMaxWind(){
		message = new HashMap<String, Object>();
		message.put("value", actualService.getMaxWind(areaCode));
		return "getMaxWind";
	}
	
	/**
	 * 根据areaCode查询当地的最低风速
	 * @return
	 */
	@Action(value="getMinWind", results={@Result(name = "getMinWind", type = "json", params = { "root", "message" })})
	public String getMinWind(){
		message = new HashMap<String, Object>();
		message.put("value", actualService.getMinWind(areaCode));
		return "getMinWind";
	}
	
	/**
	 * 根据areaCode查询当地的平均风速
	 * @return
	 */
	@Action(value="getAvgWind", results={@Result(name = "getAvgWind", type = "json", params = { "root", "message" })})
	public String getAvgWind(){
		message = new HashMap<String, Object>();
		message.put("value", actualService.getAvgWind(areaCode));
		return "getAvgWind";
	}
	/**
	 * 根据areaCode查询当地的最高降雨量
	 * @return
	 */
	@Action(value="getMaxPrec", results={@Result(name = "getMaxPrec", type = "json", params = { "root", "message" })})
	public String getMaxPrec(){
		message = new HashMap<String, Object>();
		message.put("value", actualService.getMaxRain(areaCode));
		return "getMaxPrec";
	}
	
	/**
	 * 根据areaCode查询当地的最低降雨量
	 * @return
	 */
	@Action(value="getMinPrec", results={@Result(name = "getMinPrec", type = "json", params = { "root", "message" })})
	public String getMinPrec(){
		message = new HashMap<String, Object>();
		message.put("value", actualService.getMinRain(areaCode));
		return "getMinPrec";
	}
	
	/**
	 * 根据areaCode查询当地的平均降雨量
	 * @return
	 */
	@Action(value="getAvgPrec", results={@Result(name = "getAvgPrec", type = "json", params = { "root", "message" })})
	public String getAvgPrec(){
		message = new HashMap<String, Object>();
		message.put("value", actualService.getAvgRain(areaCode));
		return "getAvgPrec";
	}
	
	/**
	 * 根据areaCode查询当天24小时内的气温
	 * @return
	 */
	@Action(value="getTempHistory", results={@Result(name = "getTempHistory", type = "json", params = { "root", "message" })})
	public String getTempHistory(){
		message = new HashMap<String, Object>();
		message.put("series", actualService.getTodayTemp(areaCode));
		return "getTempHistory";
	}
	/**
	 * 根据areaCode查询当天24小时内的风速
	 * @return
	 */
	@Action(value="getWindHistory", results={@Result(name = "getWindHistory", type = "json", params = { "root", "message" })})
	public String getWindHistory(){
		message = new HashMap<String, Object>();
		message.put("series", actualService.getTodayWind(areaCode));
		return "getWindHistory";
	}
	/**
	 * 根据areaCode查询当天24小时内的降水
	 * @return
	 */
	@Action(value="getPrecHistory", results={@Result(name = "getPrecHistory", type = "json", params = { "root", "message" })})
	public String getPrecHistory(){
		message = new HashMap<String, Object>();
		message.put("series", actualService.getTodayRain(areaCode));
		return "getPrecHistory";
	}
	
	/**
	 * 根据areaCode查询地图信息
	 * @return
	 */
	@Action(value="getMapInfo", results={@Result(name = "getMapInfo", type = "json", params = { "root", "message" })})
	public String getMapInfo(){
		message = new HashMap<String, Object>();
		List<Map<String, Object>> series = new ArrayList<Map<String,Object>>();
		series.add(actualService.getMapInfo(areaCode));
		message.put("series", series);
		return "getMapInfo";
	}
	public List<Map<String, Object>> getMapinfolist() {
		return mapinfolist;
	}

	public void setMapinfolist(List<Map<String, Object>> mapinfolist) {
		this.mapinfolist = mapinfolist;
	}

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
}
