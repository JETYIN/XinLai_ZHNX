package com.xinlai.zhnx.common.webservice.server;

import javax.jws.WebService;

@WebService
public interface HelloWebService {
	public void sayHello(String value);
}
