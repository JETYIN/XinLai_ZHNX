package com.xinlai.zhnx.poverty.dao;

import java.util.List;
import java.util.Map;

public interface PersonDetailDao {

		//通过村ID获取村下贫困户明细
		public List<Object> querypersondetailbyvillage(String areaid);
		
		//通过户ID获取贫困户整体情况
		public Map<String,Object> querysituationbyid(String huid);		
		//通过户ID获取贫困户整体情况
		public List<Object> querysituationbyid_jkzk(String huid);
		
		//通过户ID获取贫困户基本情况
		public Map<String,Object> querya01_tab1_01byid(String huid);
		//通过户ID获取贫困户家庭成员情况
		public List<Object> querya01_tab1_02byid(String huid);
		
		//通过户ID获取贫困户到户措施收支情况
		public Map<String,Object> querymeasure_a04_tab4byid(String huid);		
		//通过户ID获取贫困户到户措施产业精准扶持
		public Map<String,Object> querya06_tab6byid(String huid);
		
		//通过户ID获取贫困户基础设施
		public Map<String,Object> querya01_tab2byid(String huid);
		
		//通过户ID获取贫困户生产经营情况
		public Map<String,Object> querya04_tab3byid(String huid);
		
		//通过户ID获取贫困户收支情况
		public Map<String,Object> querya04_tab4byid(String huid);
		
		//通过户ID获取贫困户精准扶持情况
		public Map<String,Object> querya05_tab5byid(String huid);
		
		//通过户ID获取贫困户金融贷款支持状况
		public List<Object> querya07_tab7byid(String huid);
		
		//通过户ID获取贫困户能力提升情况
		public List<Object> querya08_tab8byid(String huid);
		
		//通过户ID获取贫困户社会帮扶
		public List<Object> querya09_tab9byid(String huid);
		
		//通过户ID获取贫困户异地搬迁
		public Map<String,Object> querya01_tab10byid(String huid);
		
		//通过户ID获取贫困户精准脱贫成效
		public Map<String,Object> querya01_tab11byid(String huid);
		
		//通过户ID获取贫困户操作人员信息
		public Map<String,Object> querya01_tab12byid(String huid);
		
		//通过户ID获取贫困户帮扶责任人
		public Map<String,Object> querya01_tab13byid(String huid);
}
