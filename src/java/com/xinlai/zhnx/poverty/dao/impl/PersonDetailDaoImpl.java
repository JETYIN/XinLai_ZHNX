package com.xinlai.zhnx.poverty.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.poverty.dao.PersonDetailDao;


@Repository("PersonDetailDao")
public class PersonDetailDaoImpl extends BaseDaoImpl implements PersonDetailDao{
	
	
	@Autowired
	public PersonDetailDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, PersonDetailDao.class.getName());
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Object> querypersondetailbyvillage(String areaid) {
		
		List returnlist = getSession().selectList(getNamespace()+"querypersondetailbyvillage", areaid);
		
		return returnlist;
	}

	@Override
	public Map<String, Object> querysituationbyid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querysituationbyid", huid);
		
		return returnMap;
	}

	@Override
	public List<Object> querysituationbyid_jkzk(String huid) {
		List returnlist = getSession().selectList(getNamespace()+"querysituationbyid_jkzk", huid);
		
		return returnlist;
	}

	@Override
	public Map<String, Object> querya01_tab1_01byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya01_tab1_01byid", huid);
		
		return returnMap;
	}

	@Override
	public List<Object> querya01_tab1_02byid(String huid) {
		List returnlist = getSession().selectList(getNamespace()+"querya01_tab1_02byid", huid);
		
		return returnlist;
	}

	@Override
	public Map<String, Object> querymeasure_a04_tab4byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querymeasure_a04_tab4byid", huid);
		
		return returnMap;
	}

	@Override
	public Map<String, Object> querya06_tab6byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya06_tab6byid", huid);
		
		return returnMap;
	}

	@Override
	public Map<String, Object> querya01_tab2byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya01_tab2byid", huid);
		
		return returnMap;
	}

	@Override
	public Map<String, Object> querya04_tab3byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya04_tab3byid", huid);
		
		return returnMap;
	}

	@Override
	public Map<String, Object> querya04_tab4byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya04_tab4byid", huid);
		
		return returnMap;
	}

	@Override
	public Map<String, Object> querya05_tab5byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya05_tab5byid", huid);
		
		return returnMap;
	}

	@Override
	public List<Object> querya07_tab7byid(String huid) {
		List returnlist = getSession().selectList(getNamespace()+"querya07_tab7byid", huid);
		
		return returnlist;
	}

	@Override
	public List<Object> querya08_tab8byid(String huid) {
		List returnlist = getSession().selectList(getNamespace()+"querya08_tab8byid", huid);
		
		return returnlist;
	}

	@Override
	public List<Object> querya09_tab9byid(String huid) {
		List returnlist = getSession().selectList(getNamespace()+"querya09_tab9byid", huid);
		
		return returnlist;
	}

	@Override
	public Map<String, Object> querya01_tab10byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya01_tab10byid", huid);
		
		return returnMap;
	}

	@Override
	public Map<String, Object> querya01_tab11byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya01_tab11byid", huid);
		
		return returnMap;
	}

	@Override
	public Map<String, Object> querya01_tab12byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya01_tab12byid", huid);
		
		return returnMap;
	}

	@Override
	public Map<String, Object> querya01_tab13byid(String huid) {
		Map returnMap = getSession().selectOne(getNamespace()+"querya01_tab13byid", huid);
		
		return returnMap;
	}

}
