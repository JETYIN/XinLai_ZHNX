package com.xinlai.zhnx.common.webservice.server.impl;

import javax.jws.WebService;

import com.xinlai.zhnx.common.webservice.server.HelloWebService;

@WebService
public class HelloWebServiceImpl implements HelloWebService{

	@Override
	public void sayHello(String value) {
		System.out.println("HelloWorld WebService! " + value);
	}

}
