package com.xinlai.zhnx.poverty.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.poverty.dao.EffectDao;


@Repository("EffectDao")
public class EffectDaoImpl extends BaseDaoImpl implements EffectDao{

	
	@Autowired
	public EffectDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, EffectDao.class.getName());
	}

	@Override
	public List<Map<String, Object>> queryShiErWuAntPovertyBar(String category) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryShiErWuAntPovertyBar", category);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryShiErWuAntPoverty() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryShiErWuAntPoverty");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryXHGEconomicBar(String category) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryXHGEconomicBar", category);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryXHGEconomic() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryXHGEconomic");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryXHGPopulationBar(String category) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryXHGPopulationBar", category);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryXHGPopulation() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryXHGPopulation");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryMigrantWorkersLinequ() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryMigrantWorkersLinequ");
		return returnList;
	}
	
	@Override
	public List<Map<String, Object>> queryMigrantWorkersLineshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryMigrantWorkersLineshi", areaid);
		return returnList;
	}
	
	@Override
	public List<Map<String, Object>> queryMigrantWorkersLinexian(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryMigrantWorkersLinexian", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryMigrantWorkersBarqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryMigrantWorkersBarqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryMigrantWorkersBarshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryMigrantWorkersBarshi", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryMigrantWorkersBarxian(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryMigrantWorkersBarxian", areaid);
		return returnList;
	}
	

	@Override
	public List<Map<String, Object>> queryOtherHelpSum() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryOtherHelpSum");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryOtherHelpBar() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryOtherHelpBar");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryPreciseSum() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryPreciseSum");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryPreciseBar() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryPreciseBar");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryToFamilyBar0() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryToFamilyBar0");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryToFamilyBar1() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryToFamilyBar1");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryMigrationBar(String category) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryMigrationBar", category);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryMigration(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryMigration", areaid);
		return returnList;
	}

}
