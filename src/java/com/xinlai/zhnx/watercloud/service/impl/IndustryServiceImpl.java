package com.xinlai.zhnx.watercloud.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.watercloud.dao.IndustryDao;
import com.xinlai.zhnx.watercloud.service.IndustryService;




@Service("IndustryService")
public class IndustryServiceImpl implements IndustryService{
	
	
	@Resource
	private IndustryDao industryDao;
	@Override
	public Map<String, Object> query(String[] label) {
		
		HashMap<String, Object> message = new HashMap<String, Object>();
		//查询title名
		String title = industryDao.querywatercontitle();
		//subTitle
		String subTitle = "（立方米）";
		//查询series
		List<Object> year = industryDao.querywaterconyear();
		List<Object> series = industryDao.querywaterconseries();
		List<Object> series_end = new ArrayList<Object>();
		//返回参数拼接
		String strlabel;
		String stryear;
		Map mapyear = new HashMap();
		Map mapseries = new HashMap();
		//区域
		for (int i=0;i<label.length;i++)
		{
			strlabel = label[i];
			List<Object> series_temp = new ArrayList<Object>();
			//年份
			for(int a=0;a<year.size();a++)
			{
				List<Object> company =new ArrayList<Object>();
				List<Object> data =new ArrayList<Object>();
				mapyear = (Map) year.get(a);
				stryear = (String) mapyear.get("year");
				for (int b=0;b<series.size();b++)
				{
					mapseries = (Map) series.get(b);					
					if(strlabel.equals(mapseries.get("area"))&&stryear.equals(mapseries.get("year")))
					{
						int length = company.size();
						company.add(length, mapseries.get("company"));
						data.add(length, mapseries.get("waterconsumption"));
					}
				}
				Map<String, Object> mapseries_end = new HashMap<String, Object>();
				mapseries_end.put("year", stryear);
				mapseries_end.put("company",company);
				mapseries_end.put("data", data);
				series_temp.add(mapseries_end);
			}
			series_end.add(series_temp);
		}
		message.put("title", title);
		message.put("subTitle", subTitle);
		message.put("series", series_end);
		System.out.println(series_end);
		return message;
		
	}
	

}
