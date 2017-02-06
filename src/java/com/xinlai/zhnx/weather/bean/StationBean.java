package com.xinlai.zhnx.weather.bean;

import java.io.Serializable;

public class StationBean implements Serializable {
	private static final long serialVersionUID = -2879996855581322202L;
	private String stationID;
	private Double lng;
	private Double lat;
	private String level;
	private String code;
	private String snowmark;
	private String stationname;

	public String getStationID() {
		return stationID;
	}

	public void setStationID(String stationID) {
		this.stationID = stationID;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getSnowmark() {
		return snowmark;
	}

	public void setSnowmark(String snowmark) {
		this.snowmark = snowmark;
	}

	public String getStationname() {
		return stationname;
	}

	public void setStationname(String stationname) {
		this.stationname = stationname;
	}

}
