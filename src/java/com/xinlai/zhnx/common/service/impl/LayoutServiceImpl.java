package com.xinlai.zhnx.common.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URLDecoder;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xinlai.zhnx.common.service.LayoutService;

@Service("layoutService")
public class LayoutServiceImpl implements LayoutService {

	private Object layoutJson;
	private FileWriter writer;
	private FileReader reader;
	private final String layoutFileName = "layout.json";

	@PostConstruct
	private void readLayout() throws IOException {

		File layoutFile = new File(URLDecoder.decode(this.getClass()
				.getClassLoader().getResource(layoutFileName).getPath(),
				"UTF-8"));
		reader = new FileReader(layoutFile);
		BufferedReader br = new BufferedReader(reader);
		StringBuilder layoutJsonBuilder = new StringBuilder();
		String cbuf;
		while ((cbuf = br.readLine()) != null) {
			layoutJsonBuilder.append(cbuf);
		}
		layoutJson = layoutJsonBuilder.toString().isEmpty() ? (new JSONObject())
				: JSON.parse(layoutJsonBuilder.toString().trim());
		reader.close();
		br.close();
	}

	@PreDestroy
	private void writeLayout() throws IOException {
		File layoutFile = new File(URLDecoder.decode(this.getClass()
				.getClassLoader().getResource(layoutFileName).getPath(),
				"UTF-8"));
		writer = new FileWriter(layoutFile);
		writer.write(JSON.toJSONString(layoutJson));
		writer.flush();
		writer.close();
	}

	@Override
	public String getLayout() {
		return JSON.toJSONString(layoutJson);
	}

	@Override
	public void setLayout(String layout) {
		layoutJson = JSON.parseObject(layout);
	}

}
