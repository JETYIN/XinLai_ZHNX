package com.xinlai.zhnx.poverty.service.impl;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.xinlai.zhnx.poverty.dao.PersonDetailDao;
import com.xinlai.zhnx.poverty.service.PersonDetailService;



@Service("PersonDetailService")
public class PersonDetailServiceImpl implements PersonDetailService{

	@Resource
	PersonDetailDao personDetailDao;
	
	
	@Override
	public List<Object> querypersondetailbyvillage(String areaid) {
		
		List<Object> returnlist = new ArrayList<Object>();
		returnlist = personDetailDao.querypersondetailbyvillage(areaid);
		return returnlist;
	}
	
	@Override
	public Map<String, Object> querysituationbyid(String huid) {
		
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> jkMap = new HashMap<String, Object>();
		String jkzk = "";
		returnMap = personDetailDao.querysituationbyid(huid);
		List<Object> jklist = new ArrayList<Object>();
		jklist = personDetailDao.querysituationbyid_jkzk(huid);
		for(int i=0;i<jklist.size();i++)
		{
			jkMap = (Map<String, Object>) jklist.get(i);
			jkzk = jkzk + jkMap.get("zk");
			jkzk = jkzk + jkMap.get("total");
			jkzk = jkzk + "人";
		}
		returnMap.put("jkzk", jkzk);
		return returnMap;
	}
	
	@Override
	public Map<String, Object> querybasesituationbyid(String huid) {
		
		Map<String, Object> returnMap = new HashMap<String, Object>();
		List<Object> returnlist = new ArrayList<Object>();
		returnMap = personDetailDao.querya01_tab1_01byid(huid);
		returnlist = personDetailDao.querya01_tab1_02byid(huid);
		returnMap.put("returnlist", returnlist);
		return returnMap;
	}

	@Override
	public Map<String, Object> querymeasurebyid(String huid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> a04_tab4Map = new HashMap<String, Object>();
		Map<String, Object> a06_tab6Map = new HashMap<String, Object>();
		float sum = 0;
		int count = 0;
		a04_tab4Map = personDetailDao.querymeasure_a04_tab4byid(huid);
		a06_tab6Map = personDetailDao.querya06_tab6byid(huid);
		Set<String> typeSet = new LinkedHashSet<String>();
		typeSet.addAll(a04_tab4Map.keySet());
		Iterator<String> iter = typeSet.iterator();
		while(iter.hasNext())
		{
			String type = iter.next();
			String sdata = String.valueOf(a04_tab4Map.get(type));
			float data = 0;
			if (sdata.equals("")||sdata=="")
			{
				data = 0;
			}else
			{
			    data = Float.parseFloat(sdata);
			}						
			if (data > 0)
			{
				sum = sum + data;
				count++;
			}
		}
		a04_tab4Map.put("btx", String.valueOf(count));
		a04_tab4Map.put("btje", String.valueOf(sum));
		returnMap.put("btqk", a04_tab4Map);
		returnMap.put("cyjzfc", a06_tab6Map);
		return returnMap;
	}

	@Override
	public Map<String, Object> queryinfrastructurebyid(String huid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap = personDetailDao.querya01_tab2byid(huid); 
		return returnMap;
	}

	@Override
	public Map<String, Object> queryproductionbyid(String huid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap = personDetailDao.querya04_tab3byid(huid); 
		return returnMap;
	}

	@Override
	public Map<String, Object> querypaymentbyid(String huid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap = personDetailDao.querya04_tab4byid(huid); 
		return returnMap;
	}

	@Override
	public Map<String, Object> querydevelopandsupportbyid(String huid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> a05_tab5Map = new HashMap<String, Object>();
		Map<String, Object> a06_tab6Map = new HashMap<String, Object>();
		a05_tab5Map = personDetailDao.querya05_tab5byid(huid);
		a06_tab6Map = personDetailDao.querya06_tab6byid(huid);
		returnMap.put("fzxq", a05_tab5Map);
		returnMap.put("jzfc", a06_tab6Map);
		return returnMap;
	}

	@Override
	public List<Object>  queryloanbyid(String huid) {
		List<Object> returnlist = new ArrayList<Object>();
		returnlist = personDetailDao.querya07_tab7byid(huid);
		return returnlist;
	}

	@Override
	public List<Object> queryabilitypromotionid(String huid) {
		List<Object> returnlist = new ArrayList<Object>();
		returnlist = personDetailDao.querya08_tab8byid(huid);
		return returnlist;
	}

	@Override
	public List<Object> querysocialassistancebyid(String huid) {
		List<Object> returnlist = new ArrayList<Object>();
		returnlist = personDetailDao.querya09_tab9byid(huid);
		return returnlist;
	}

	@Override
	public Map<String, Object> queryrelocatebyid(String huid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap = personDetailDao.querya01_tab10byid(huid);
		return returnMap;
	}

	@Override
	public Map<String, Object> queryeffectbyid(String huid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap = personDetailDao.querya01_tab11byid(huid);
		return returnMap;
	}

	@Override
	public Map<String, Object> queryresponsiblebyid(String huid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap = personDetailDao.querya01_tab13byid(huid);
		return returnMap;
	}

	@Override
	public Map<String, Object> queryoperatorbyid(String huid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap = personDetailDao.querya01_tab12byid(huid);
		return returnMap;
	}

	@Override
	public List<String> getphoto(String huid) {
		// TODO Auto-generated method stub 
		List<String> returnlist = new ArrayList<String>();
		String rootPath=getClass().getResource("/").getFile().toString();
		String path = new File(new File(rootPath).getParent()).getParent();
		String idpath = new File(new File(rootPath).getParent()).getParent();
		path = path + File.separator +"data"+File.separator+"povertyphoto"+File.separator+"2232703";
		try {
			path=URLDecoder.decode(path, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		idpath = idpath + File.separator+"data"+File.separator+"povertyphoto"+File.separator+"" + huid;
		try {
			idpath=URLDecoder.decode(idpath, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		System.out.println(path);
		System.out.println(idpath);
		File idfile = new File(idpath);
		File[] idarray = idfile.listFiles();		
		if (idfile.exists())
		{
			
			 for(int i=0;i<idarray.length;i++){   
		            if(idarray[i].isFile()){
		            	returnlist.add("data\\povertyphoto\\"+huid+"\\"+idarray[i].getName());
		            }   
		        } 
		}else
		{
			File file = new File(path);
			File[] array = file.listFiles();
			 for(int i=0;i<array.length;i++){   
		            if(array[i].isFile()){
		            	returnlist.add("data\\povertyphoto\\2232703\\"+array[i].getName());
		            }   
		        } 
		}

		return returnlist;
	}

}
