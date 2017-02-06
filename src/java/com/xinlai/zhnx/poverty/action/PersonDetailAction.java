package com.xinlai.zhnx.poverty.action;

import java.io.IOException;
import java.util.HashMap;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.poverty.service.PersonDetailService;
import com.xinlai.zhnx.websocket.WebsocketEndPoint;


/**
 * 扶贫对象明细
 * 
 */

@Controller
@Namespace("/poverty/persondetail")
public class PersonDetailAction extends BaseAction{

	/**
	 * 
	 */
	@Autowired
	PersonDetailService personDetailService;
	
	private static final long serialVersionUID = -8613752514294317622L;
	
	protected String areaCode; 
	
	protected String huid; 
	/**
	 * 通过村ID获取村下贫困户明细
	 * 
	 */
	
	@Action(value="getpersondetailbyvillage", results={@Result(name = "getpersondetailbyvillage", type = "json", params = { "root", "message" })})
	public String getpersondetailbyvillage(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.querypersondetailbyvillage(areaCode));	
		return "getpersondetailbyvillage";
		
	}
	
	/**
	 * 通过户ID获取贫困户整体情况
	 * 
	 */
	
	@Action(value="getsituationbyid", results={@Result(name = "getsituationbyid", type = "json", params = { "root", "message" })})
	public String getsituationbyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.querysituationbyid(huid));	
		return "getsituationbyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户基本情况
	 * 
	 */
	
	@Action(value="getbasesituationbyid", results={@Result(name = "getbasesituationbyid", type = "json", params = { "root", "message" })})
	public String getbasesituationbyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.querybasesituationbyid(huid));	
		return "getbasesituationbyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户到户措施
	 * 
	 */
	
	@Action(value="getmeasurebyid", results={@Result(name = "getmeasurebyid", type = "json", params = { "root", "message" })})
	public String getmeasurebyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.querymeasurebyid(huid));	
		return "getmeasurebyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户基础措施
	 * 
	 */
	
	@Action(value="getinfrastructurebyid", results={@Result(name = "getinfrastructurebyid", type = "json", params = { "root", "message" })})
	public String getinfrastructurebyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.queryinfrastructurebyid(huid));	
		return "getinfrastructurebyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户生产经营情况
	 * 
	 */
	
	@Action(value="getproductionbyid", results={@Result(name = "getproductionbyid", type = "json", params = { "root", "message" })})
	public String getproductionbyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.queryproductionbyid(huid));	
		return "getproductionbyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户收支情况
	 * 
	 */
	
	@Action(value="getpaymentbyid", results={@Result(name = "getpaymentbyid", type = "json", params = { "root", "message" })})
	public String getpaymentbyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.querypaymentbyid(huid));	
		return "getpaymentbyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户产业发展和扶持
	 * 
	 */
	
	@Action(value="getdevelopandsupportbyid", results={@Result(name = "getdevelopandsupportbyid", type = "json", params = { "root", "message" })})
	public String getdevelopandsupportbyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.querydevelopandsupportbyid(huid));	
		return "getdevelopandsupportbyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户金融贷款支持状况
	 * 
	 */
	
	@Action(value="getloanbyid", results={@Result(name = "getloanbyid", type = "json", params = { "root", "message" })})
	public String getloanbyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.queryloanbyid(huid));	
		return "getloanbyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户能力提升情况
	 * 
	 */
	
	@Action(value="getabilitypromotionbyid", results={@Result(name = "getabilitypromotionbyid", type = "json", params = { "root", "message" })})
	public String getabilitypromotionbyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.queryabilitypromotionid(huid));	
		return "getabilitypromotionbyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户社会帮扶
	 * 
	 */
	
	@Action(value="getsocialassistancebyid", results={@Result(name = "getsocialassistancebyid", type = "json", params = { "root", "message" })})
	public String getsocialassistancebyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.querysocialassistancebyid(huid));	
		return "getsocialassistancebyid";
		
	}	
	
	/**
	 * 通过户ID获取贫困户异地搬迁情况
	 * 
	 */
	
	@Action(value="getrelocatebyid", results={@Result(name = "getrelocatebyid", type = "json", params = { "root", "message" })})
	public String getrelocatebyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.queryrelocatebyid(huid));	
		return "getrelocatebyid";
		
	}
	
	
	/**
	 * 通过户ID获取贫困户精准脱贫成效
	 * 
	 */
	
	@Action(value="geteffectbyid", results={@Result(name = "geteffectbyid", type = "json", params = { "root", "message" })})
	public String geteffectbyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.queryeffectbyid(huid));	
		return "geteffectbyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户帮扶责任人
	 * 
	 */
	
	@Action(value="getresponsiblebyid", results={@Result(name = "getresponsiblebyid", type = "json", params = { "root", "message" })})
	public String getresponsiblebyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.queryresponsiblebyid(huid));	
		return "getresponsiblebyid";
		
	}
	
	/**
	 * 通过户ID获取贫困户操作人员
	 * 
	 */
	
	@Action(value="getoperatorbyid", results={@Result(name = "getoperatorbyid", type = "json", params = { "root", "message" })})
	public String getoperatorbyid(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.queryoperatorbyid(huid));	
		return "getoperatorbyid";
		
	}
	
	/**
	 * 获取人员照片
	 * 
	 */
	
	
	@Action(value="getphoto", results={@Result(name = "getphoto", type = "json", params = { "root", "message" })})
	public String getphoto(){
		
		message = new HashMap<String, Object>();
		message.put("series", personDetailService.getphoto(huid));	
		return "getphoto";
		
	}
	
	public String getHuid() {
		return huid;
	}


	public void setHuid(String huid) {
		this.huid = huid;
	}


	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
}
