package com.xinlai.zhnx.poverty.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.poverty.dao.CommonDao;


@Repository("CommonDao")
public class CommonDaoImpl extends BaseDaoImpl implements CommonDao{

	
	@Autowired
	public CommonDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, CommonDao.class.getName());
		// TODO Auto-generated constructor stub
	}

	//根据ID查询地区下级地区信息 
	@Override
	public List<Object> queryareabyid(String areaid) {
		
		List returnlist = getSession().selectList(getNamespace()+"common_queryareabyid", areaid);
		
		return returnlist;
	}

}
