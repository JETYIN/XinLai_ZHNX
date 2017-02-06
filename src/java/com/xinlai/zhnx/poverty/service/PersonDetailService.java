package com.xinlai.zhnx.poverty.service;

import java.util.List;
import java.util.Map;

public interface PersonDetailService {
	
	
	//通过村ID获取村下贫困户明细
	public List<Object> querypersondetailbyvillage(String areaid);

	//通过户ID获取贫困户整体情况
	public Map<String,Object> querysituationbyid(String huid);
	
	//通过户ID获取贫困户基本情况
	public Map<String,Object> querybasesituationbyid(String huid);
	
	//通过户ID获取贫困户到户措施
	public Map<String,Object> querymeasurebyid(String huid);
	
	//通过户ID获取贫困户基础设施
	public Map<String,Object> queryinfrastructurebyid(String huid);
	
	//通过户ID获取贫困户生产经营情况
	public Map<String,Object> queryproductionbyid(String huid);
	
	//通过户ID获取贫困户收支情况
	public Map<String,Object> querypaymentbyid(String huid);
	
	//通过户ID获取贫困户产业发展和扶持
	public Map<String,Object> querydevelopandsupportbyid(String huid);
	
	//通过户ID获取贫困户金融贷款支持状况
	public List<Object> queryloanbyid(String huid);

	//通过户ID获取贫困户能力提升情况
	public List<Object> queryabilitypromotionid(String huid);
	
	//通过户ID获取贫困户社会帮扶
	public List<Object> querysocialassistancebyid(String huid);
	
	//通过户ID获取贫困户异地搬迁
	public Map<String,Object> queryrelocatebyid(String huid);
	
	//通过户ID获取贫困户精准脱贫成效
	public Map<String,Object> queryeffectbyid(String huid);
	
	//通过户ID获取贫困户帮扶责任人
	public Map<String,Object> queryresponsiblebyid(String huid);
	
	//通过户ID获取贫困户操作人员
	public Map<String,Object> queryoperatorbyid(String huid);
	
	//通过户ID获取贫困户操作人员
	public List<String> getphoto(String huid);
}
