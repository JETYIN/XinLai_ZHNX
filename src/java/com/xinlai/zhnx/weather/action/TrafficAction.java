package com.xinlai.zhnx.weather.action;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.weather.service.TrafficService;
@Controller
@Namespace("/weather/traffic")
public class TrafficAction extends BaseAction{

	private String areaCode;
	
	private String siteID;
	
	private String stationID;
	
	@Resource
	private TrafficService trafficService;

	/**
	 * 查询交通气象站信息
	 * @return
	 */
	@Action(value="getTrifficStation", results={@Result(name = "getTrifficStation", type = "json", params = { "root", "message" })})
	public String getTrifficStation(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	dataset : [" +
//				"		{" +
//				"			station : '小洪沟'," +
//				"			data : ['28℃', '22℃', '0.2mm/min', '5000m', '2m/s']" +
//				"		}, " +
//				"		{" +
//				"			station : '李旺'," +
//				"			data : ['27℃', '22℃', '0.2mm/min', '5000m', '2m/s']" +
//				"		}," +
//				"		{" +
//				"			station : '同心'," +
//				"			data : ['26℃', '22℃', '0.2mm/min', '5000m', '2m/s']" +
//				"		}," +
//				"		{" +
//				"			station : '沿川子'," +
//				"			data : ['25℃', '22℃', '0.2mm/min', '5000m', '2m/s']" +
//				"		}," +
//				"		{" +
//				"			station : '六盘山'," +
//				"			data : ['24℃', '22℃', '0.2mm/min', '5000m', '2m/s']" +
//				"		}," +
//				"		{" +
//				"			station : '固原'," +
//				"			data : ['23℃', '22℃', '0.2mm/min', '5000m', '2m/s']" +
//				"		}," +
//				"		{" +
//				"			station : '三营'," +
//				"			data : ['22℃', '22℃', '0.2mm/min', '5000m', '2m/s']" +
//				"		}" +
//				"	]" +
//				"}";
		message.put("series", trafficService.getTrifficStation());
		return "getTrifficStation";
	}
	
	/**
	 * 查询高速路信息
	 * @return
	 */
	@Action(value="getHighwayForecast", results={@Result(name = "getHighwayForecast", type = "json", params = { "root", "message" })})
	public String getHighwayForecast(){
		message = new HashMap<String, Object>();
//		String series = "[" +
//				"    {" +
//				"    	type : '高速'," +
//				"    	dataset : {" +
//				"    		site : ['惠农', '平罗', '贺兰', '银川兴庆区', '永宁', '青铜峡', '吴忠市利通区', '红寺堡', '同心', '中宁', '中卫沙坡头', '银川兴庆区'," +
//				"    		        '永宁', '灵武', '盐池', '同心', '海原', '原州区', '泾源', '中卫沙坡头', '中宁', '红寺堡', '盐池', '贺兰', '银川金凤区'," +
//				"    		        '银川兴庆区', '银川西夏区', '永宁', '大武口', '贺兰', '平罗', '银川西夏区']," +
//				"    		road : ['京藏高速(G6)', '京藏高速(G6)', '京藏高速(G6)','京藏高速(G6)','京藏高速(G6)','京藏高速(G6)','京藏高速(G6)','京藏高速(G6)'," +
//				"    		        '京藏高速(G6)','京藏高速(G6)','京藏高速(G6)', '青银高速(G20)', '青银高速(G20)','青银高速(G20)','青银高速(G20)'," +
//				"    		        '福银高速(G70)', '福银高速(G70)','福银高速(G70)','福银高速(G70)','定武高速(G2012)', '定武高速(G2012)','定武高速(G2012)','定武高速(G2012)'," +
//				"    		        '银川绕城高速', '银川绕城高速','银川绕城高速','银川绕城高速','银川绕城高速','石银高速', '石银高速', '石银高速', '石银高速', '石银高速']," +
//				"    		weather : ['storm', 'tornado', 'NightCloudy', 'windiness', 'Downpour', 'dust','fall', 'fog', 'hail', 'Lightrain', 'windiness', 'rain'," +
//				"    		           'storm', 'tornado', 'NightCloudy', 'windiness', 'Downpour', 'dust', 'fall', 'fog', 'hail', 'Lightrain', 'windiness', 'rain', " +
//				"    		           'storm', 'tornado', 'NightCloudy', 'windiness', 'Downpour', 'dust', 'fall', 'fog']," +
//				"    		Temp : [[14, 28], [12, 25], [13, 28], [14, 27], [12, 26], [13, 25],[14, 28], [12, 25], [13, 28], [14, 27], [12, 26], [13, 25], " +
//				"    		        [11, 22], [15, 28], [14, 28], [10, 18], [14, 18], [14, 25],[14, 28], [12, 25], [13, 28], [14, 27], [12, 26], [13, 25]," +
//				"    		        [11, 22], [15, 28], [14, 28], [10, 18], [14, 18], [14, 25],[14, 28], [12, 25]]," +
//				"    		Type : ['交通实况气象条件', '能见度指数', '路面湿滑指数', '横风指数', '爆胎指数', '行车提示']," +
//				"    		value : [[0, 1, 2, 1, 1, '路面防滑'],[0, 2, 2, 1, 1, '路面防滑'],[0, 3, 2, 1, 1, '路面防滑'],[0, 4, 2, 1, 1, '路面防滑'],[0, 5, 2, 1, 1, '路面防滑'],"
//							+ "[0, 5, 2, 1, 1, '路面防滑'],[0, 6, 2, 1, 1, '路面防滑'],[0, 7, 2, 1, 1, '路面防滑'],[0, 8, 2, 1, 1, '路面防滑'],[0, 9, 2, 1, 1, '路面防滑'],"
//							+ "[0, 10, 2, 1, 1, '路面防滑'],[0, 11, 2, 1, 1, '路面防滑'],[0, 12, 2, 1, 1, '路面防滑'],[0, 13, 2, 1, 1, '路面防滑'],[0, 14, 2, 1, 1, '路面防滑'],"
//							+ "[0, 15, 2, 1, 1, '路面防滑'],[0, 16, 2, 1, 1, '路面防滑'],[0, 17, 2, 1, 1, '路面防滑'],[0, 18, 2, 1, 1, '路面防滑'],[0, 19, 2, 1, 1, '路面防滑'],"
//							+ "[0, 20, 2, 1, 1, '路面防滑'],[0, 21, 2, 1, 1, '路面防滑'],[0, 22, 2, 1, 1, '路面防滑'],[0, 23, 2, 1, 1, '路面防滑'],[0, 24, 2, 1, 1, '路面防滑'],"
//							+ "[0, 25, 2, 1, 1, '路面防滑'],[0, 26, 2, 1, 1, '路面防滑'],[0, 27, 2, 1, 1, '路面防滑'],[0, 28, 2, 1, 1, '路面防滑'],[0, 29, 2, 1, 1, '路面防滑'],"
//							+ "[0, 30, 2, 1, 1, '路面防滑'],[0, 31, 2, 1, 1, '路面防滑'],[0, 32, 2, 1, 1, '路面防滑'],[0, 33, 2, 1, 1, '路面防滑']]" +
//				"    	}" +
//				"    }," +
//				"    {" +
//				"    	type : '国道'," +
//				"    	dataset : {" +
//				"    		site : ['贺兰', '惠农', '平罗', '青铜峡', '中卫沙坡头', '同心', '银川兴庆区', '永宁', '中宁', '大武口', '贺兰', '惠农', '平罗'," +
//				"    		        '银川西夏区', '永宁', '红寺堡', '灵武', '吴忠市利通区', '盐池', '灵武', '盐池', '彭阳', '原州区', '西吉', '泾源', '隆德']," +
//				"    		road : ['国道109','国道109','国道109','国道109','国道109','国道109','国道109','国道109','国道109', '国道110', '国道110', '国道110', " +
//				"    		        '国道110', '国道110', '国道110', '国道211','国道211','国道211','国道211', '国道307','国道307', '国道309','国道309'," +
//				"    		        '国道309', '国道312', '国道312']," +
//				"    		weather : ['BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', 'BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', " +
//				"    		           'BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', 'BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', " +
//				"    		           'BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', 'Downpour']," +
//				"    		Temp : [[14, 28], [12, 25], [13, 28], [14, 27], [12, 26], [14, 28], [12, 25], [13, 28], [14, 27], [12, 26], " +
//				"    		        [14, 28], [12, 25], [13, 28], [14, 27], [12, 26], [14, 28], [12, 25], [13, 28], [14, 27], [12, 26], " +
//				"    		        [14, 28], [12, 25], [13, 28], [14, 27], [12, 26], [12, 26]]," +
//		    	"	        Type : ['交通实况气象条件', '能见度指数', '路面湿滑指数', '横风指数', '爆胎指数', '行车提示']," +
//				"    		value : [[1, 1, 2, 1, 1, '路面防滑'],[1, 2, 2, 1, 1, '路面防滑'],[1, 3, 2, 1, 1, '路面防滑'],[1, 4, 2, 1, 1, '路面防滑'],"
//							+ "[1, 5, 2, 1, 1, '路面防滑'],[1, 6, 2, 1, 1, '路面防滑'],[1, 7, 2, 1, 1, '路面防滑'],[1, 8, 2, 1, 1, '路面防滑'],[1, 9, 2, 1, 1, '路面防滑'],"
//							+ "[1, 10, 2, 1, 1, '路面防滑'],[1, 11, 2, 1, 1, '路面防滑'],[1, 12, 2, 1, 1, '路面防滑'],[1, 13, 2, 1, 1, '路面防滑'],[1, 14, 2, 1, 1, '路面防滑'],"
//							+ "[1, 15, 2, 1, 1, '路面防滑'],[1, 16, 2, 1, 1, '路面防滑'],[1, 17, 2, 1, 1, '路面防滑'],[1, 18, 2, 1, 1, '路面防滑'],[1, 19, 2, 1, 1, '路面防滑'],"
//							+ "[1, 20, 2, 1, 1, '路面防滑'],[1, 21, 2, 1, 1, '路面防滑'],[1, 22, 2, 1, 1, '路面防滑'],[1, 23, 2, 1, 1, '路面防滑'],[1, 24, 2, 1, 1, '路面防滑'],"
//							+ "[1, 25, 2, 1, 1, '路面防滑'],[1, 26, 2, 1, 1, '路面防滑']]" +
//				"    	}" +
//				"    }," +
//				"    {" +
//				"    	type : '省道'," +
//				"    	dataset : {" +
//				"    		site : ['海原', '红寺堡', '泾源', '灵武', '青铜峡', '同心', '中宁', '原州区', '银川西夏区', '永宁', '灵武', '银川兴庆区', '盐池', '中卫沙坡头'," +
//				"    		        '永宁', '中宁', '海原', '隆德', '中卫沙坡头', '西吉', '中宁', '海原', '红寺堡', '彭阳', '平罗', '同心','银川兴庆区', '原州区'," +
//				"    		        '大武口', '惠农', '平罗', '大武口', '平罗', '吴忠市利通区', '灵武', '青铜峡', '盐池', '红寺堡', '同心', '盐池', '海原', '原州区', '原州区', '海原']," +
//				"    		road : ['S101','S101','S101','S101','S101','S101','S101','S101', 'S102', 'S102', 'S103', 'S103', 'S103', 'S201', 'S201', 'S201', " +
//				"    		        'S202', 'S202', 'S202','S202', 'S202', 'S203', 'S203', 'S203', 'S203', 'S203', 'S203', 'S203', 'S301', 'S301', 'S301'," +
//				"    		        'S302','S302','S303', 'S303','S303','S303','S304','S304','S304','S305','S305','S306','S306']," +
//				"    		weather : ['BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', 'dust', 'BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', 'dust'," +
//				"    		           'fall', 'fog', 'hail', 'Lightrain', 'night', 'rain','BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', 'dust'," +
//				"    		           'BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', 'dust', 'BigSnowfall', 'CentreSnow', 'clear', 'cloudy', 'Downpour', 'dust'," +
//				"    		           'fall', 'fog', 'hail', 'Lightrain', 'night', 'rain', 'rain', 'rain']," +
//				"    		Temp : [[14, 28], [12, 25], [13, 28], [14, 27], [12, 26], [13, 25],[11, 22], [15, 28], [14, 28], [10, 18], [14, 18], [14, 25]," +
//				"    		        [11, 22], [15, 28], [14, 28], [10, 18], [14, 18], [14, 25],[11, 22], [15, 28], [14, 28], [10, 18], [14, 18], [14, 25]," +
//				"    		        [14, 28], [12, 25], [13, 28], [14, 27], [12, 26], [13, 25],[11, 22], [15, 28], [14, 28], [10, 18], [14, 18], [14, 25]," +
//				"    		        [11, 22], [15, 28], [14, 28], [10, 18], [14, 18], [14, 25],[14, 25], [14, 25]]," +
//		    	"	        Type : ['交通实况气象条件', '能见度指数', '路面湿滑指数', '横风指数', '爆胎指数', '行车提示']," +
//				"    		value : [[2, 1, 2, 1, 1, '路面防滑'],[2, 2, 2, 1, 1, '路面防滑'],[2, 3, 2, 1, 1, '路面防滑'],[2, 4, 2, 1, 1, '路面防滑'],[2, 5, 2, 1, 1, '路面防滑'],"
//							+ "[2, 6, 2, 1, 1, '路面防滑'],[2, 7, 2, 1, 1, '路面防滑'],[2, 8, 2, 1, 1, '路面防滑'],[2, 9, 2, 1, 1, '路面防滑'],[2, 10, 2, 1, 1, '路面防滑'],[2, 11, 2, 1, 1, '路面防滑'],"
//							+ "[2, 12, 2, 1, 1, '路面防滑'],[2, 13, 2, 1, 1, '路面防滑'],[2, 14, 2, 1, 1, '路面防滑'],[2, 15, 2, 1, 1, '路面防滑'],[2, 16, 2, 1, 1, '路面防滑'],[2, 17, 2, 1, 1, '路面防滑'],"
//							+ "[2, 18, 2, 1, 1, '路面防滑'],[2, 19, 2, 1, 1, '路面防滑'],[2, 20, 2, 1, 1, '路面防滑'],[2, 21, 2, 1, 1, '路面防滑'],[2, 22, 2, 1, 1, '路面防滑'],[2, 23, 2, 1, 1, '路面防滑'],"
//							+ "[2, 24, 2, 1, 1, '路面防滑'],[2, 25, 2, 1, 1, '路面防滑'],[2, 26, 2, 1, 1, '路面防滑'],[2, 27, 2, 1, 1, '路面防滑'],[2, 28, 2, 1, 1, '路面防滑'],[2, 29, 2, 1, 1, '路面防滑'],"
//							+ "[2, 30, 2, 1, 1, '路面防滑'],[2, 31, 2, 1, 1, '路面防滑'],[2, 32, 2, 1, 1, '路面防滑'],[2, 33, 2, 1, 1, '路面防滑'],[2, 34, 2, 1, 1, '路面防滑'],[2, 35, 2, 1, 1, '路面防滑'],"
//							+ "[2, 36, 2, 1, 1, '路面防滑'],[2, 37, 2, 1, 1, '路面防滑'],[2, 38, 2, 1, 1, '路面防滑'],[2, 39, 2, 1, 1, '路面防滑'],[2, 40, 2, 1, 1, '路面防滑'],[2, 41, 2, 1, 1, '路面防滑'],"
//							+ "[2, 42, 2, 1, 1, '路面防滑'],[2, 43, 2, 1, 1, '路面防滑'],[2, 44, 2, 1, 1, '路面防滑']]" +
//				"    	}" +
//				"    }" +
//				"]";
		message.put("series", trafficService.getHighwayForecast());
		return "getHighwayForecast";
	}
	
	/**
	 * 根据路段ID或气象站ID查询相应天气信息
	 * @return
	 */
	@Action(value="getRoadOrStationForecast", results={@Result(name = "getRoadOrStationForecast", type = "json", params = { "root", "message" })})
	public String getRoadOrStationForecast(){
		message = new HashMap<String, Object>();
//		String series1 = "[" +
//				"   {" +
//				"	   group : '路面温度'," +
//				"	   data : [" +
//				"			    {" +
//				"					unit : '℃'," +
//				"					label:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]," +
//				"					data:[14, 25, 36, 26, 17, 17, 19, 19, 44, 22, 15]" +
//				"			    }" +
//				"			]" +
//				"  }," +
//				"   {" +
//				"	   group : '路基温度'," +
//				"	   data : [" +
//				"			    {" +
//				"					unit : '℃'," +
//				"					label:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]," +
//				"					data:[10, 20, 30, 20, 12, 12, 14, 14, 40, 17, 10]" +
//				"			    }" +
//				"			]" +
//				"  }" +
//				"]";
//		String series2 = "[" +
//				"	{" +
//				"	   group : '能见度'," +
//				"	   data : [" +
//				"		    {" +
//				"				unit : 'Km'," +
//				"				label:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]," +
//				"				data:[10, 20, 30, 20, 12, 12, 14, 14, 40, 17, 10]" +
//				"		    }" +
//				"		]" +
//				"	}" +      
//				"]";
//		String series3 = "[" +
//				"	{" +
//				"		group : '风速'," +
//				"		   data : [" +
//				"			    {" +
//				"					unit : 'm/s'," +
//				"					label:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]," +
//				"					data:[10, 20, 30, 20, 12, 12, 14, 14, 40, 17, 10]" +
//				"			    }" +
//				"			]" +
//				"	}" +      
//				"]";
//		String series4 = "[" +
//				"	{" +
//				"		group : '降水量'," +
//				"		   data : [" +
//				"			    {" +
//				"					unit : 'mm'," +
//				"					label:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]," +
//				"					data:[10, 20, 30, 20, 12, 12, 14, 14, 40, 17, 10]" +
//				"			    }" +
//				"			]" +
//				"	}" +
//				"]";
		message.put("series1", trafficService.getRoadOrStationForecast_wd(siteID, stationID));
		message.put("series2", trafficService.getRoadOrStationForecast_njd(siteID, stationID));
		message.put("series3", trafficService.getRoadOrStationForecast_fs(siteID, stationID));
		message.put("series4", trafficService.getRoadOrStationForecast_jsl(siteID, stationID));
		return "getRoadOrStationForecast";
	}
	
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public String getSiteID() {
		return siteID;
	}

	public void setSiteID(String siteID) {
		this.siteID = siteID;
	}

	public String getStationID() {
		return stationID;
	}

	public void setStationID(String stationID) {
		this.stationID = stationID;
	}
	
}
