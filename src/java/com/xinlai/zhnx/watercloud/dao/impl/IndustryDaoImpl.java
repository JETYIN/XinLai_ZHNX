package com.xinlai.zhnx.watercloud.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.watercloud.dao.IndustryDao;


@Repository("industryDao")
public class IndustryDaoImpl extends BaseDaoImpl implements IndustryDao{

	
	@Autowired
	public IndustryDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, IndustryDao.class.getName());
		// TODO Auto-generated constructor stub
	}
	
	//查询title
	@Override
	public String querywatercontitle(){
		String title = getSession().selectOne(getNamespace()+"water_consumption_ueryforcomment");
		return title;
		
	}
	@Override
	//查询数据库中存在的所有年份
	public List querywaterconyear() {
		List  yearlist = getSession().selectList(getNamespace()+"water_consumption_year");
		return yearlist;
	}

	//查询series
	@Override
	public List querywaterconseries() {
		List returnlist = getSession().selectList(getNamespace()+"water_consumption_ueryforseries");
		return returnlist;
	}


}
