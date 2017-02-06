package com.xinlai.zhnx.common.dao.impl;

import org.mybatis.spring.SqlSessionTemplate;

import com.xinlai.zhnx.common.dao.BaseDao;

public class BaseDaoImpl implements BaseDao {
	private SqlSessionTemplate session;
	private String namespace;

	public BaseDaoImpl(SqlSessionTemplate session, String iDaoNamespace) {
		this.session = session;
		this.namespace = (iDaoNamespace += '.');
		getNamespace();
	}

	protected String getNamespace() {
		if (this.namespace == null) {
			throw new RuntimeException(getClass().getName() + "没有找到IDaoNamespace，可能原因：没有注入IDaoNamespace！");
		}
		return this.namespace;
	}

	protected SqlSessionTemplate getSession() {
		if (this.session == null) {
			throw new RuntimeException(getClass().getName() + "没有找到SqlSession，可能原因：没有注入SqlSession！");
		}
		return this.session;
	}

}
