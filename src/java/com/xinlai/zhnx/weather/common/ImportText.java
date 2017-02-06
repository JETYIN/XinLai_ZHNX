package com.xinlai.zhnx.weather.common;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class ImportText {
	
    /**
     * @param args
     * @throws UnsupportedEncodingException 
     */ 
    public static void main(String[] args) throws UnsupportedEncodingException { 
    		
	        // TODO Auto-generated method stub 
	        String driver = "com.mysql.jdbc.Driver"; 
	        String url = "jdbc:mysql://localhost:3306/zhnx"; 
	        String username = "zhnx"; 
	        String password = "zhnx"; 
	        Connection conn = null; 
	        Statement stmt = null; 
	        try { 
	            conn = DriverManager.getConnection(url, username, password); 
	            stmt = conn.createStatement(); 
	        } catch (SQLException e1) { 
	            // TODO Auto-generated catch block 
	            e1.printStackTrace(); 
	        } 
	        
	        File file = new File("D:\\20160729_05_1.txt"); 
	        FileInputStream fis = null; 
	        try{
	        	
	        	fis = new FileInputStream(file); 
	            InputStreamReader input = new InputStreamReader(fis,"UTF-8"); 
	            BufferedReader br = new BufferedReader(input); 
	            String line = null; 
	            String sql = null; 
	            String info[] = null; 
	            String[] dataname=new String[8];
	            String path = file.getAbsolutePath();//得到选择文件的全路径 
	            //String fileName = path.substring(path.lastIndexOf("\\")+1, path.lastIndexOf("."));//取得所选文件名
	            try{
	            	line = br.readLine();
	            	info = line.split("\\s+"); 	            	
	            	for (int i=0;i<info.length;i++)
	            	{
	            		System.out.println(info[i]);
	            		if(info[i].trim().equals("站号"))
	            		{
	            			dataname[i] = "stationID";
	            		}
	            		if(info[i].trim().equals("日期"))
	            		{
	            			dataname[i] = "stationdate";
	            		}
	            		if(info[i].trim().equals("时间"))
	            		{
	            			dataname[i] = "stationtime";
	            		}
	            		if(info[i].trim().equals("气温"))
	            		{
	            			dataname[i] = "temperature";
	            		}
	            		if(info[i].trim().equals("风向"))
	            		{
	            			dataname[i] = "winddirection";
	            		}
	            		if(info[i].trim().equals("风速"))
	            		{
	            			dataname[i] = "windspeed";
	            		}
	            		if(info[i].trim().equals("湿度"))
	            		{
	            			dataname[i] = "humidity";
	            		}
	            		if(info[i].trim().equals("降水量"))
	            		{
	            			dataname[i] = "precipitation";
	            		}
	            	}
	            	while((line = br.readLine())!= null){ 
	            		info = line.split("\\s+"); 
	            		sql = "insert into "
	            				+ "weather_weatherlive('"+dataname[0]+"','"+dataname[1]+"','"+dataname[2]+"','"+dataname[3]+"',"
	            						+ "'"+dataname[4]+"','"+dataname[5]+"','"+dataname[6]+"','"+dataname[7]+"')"
	            				+ "values('"+info[0]+"','"+info[1]+"','"+info[2]+"','"+info[3]+"',"
	            						+ "'"+info[4]+"','"+info[5]+"','"+info[6]+"','"+info[7]+"')";
	            		System.out.println(sql);
	            	}
	            }catch (IOException e) { 
	                // TODO Auto-generated catch block 
	                e.printStackTrace(); 
	            } 
	        }catch (FileNotFoundException e) { 
	            // TODO Auto-generated catch block 
	            e.printStackTrace(); 
	        }finally{ 
	            if(conn != null){ 
	                try { 
	                    conn.close(); 
	                } catch (SQLException e) { 
	                    // TODO Auto-generated catch block 
	                    e.printStackTrace(); 
	                } 
	            } 
	        } 
    }

}
