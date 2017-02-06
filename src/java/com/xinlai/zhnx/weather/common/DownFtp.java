package com.xinlai.zhnx.weather.common;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.TimeZone;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPClientConfig;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.log4j.Logger;


public class DownFtp {
	
	private static Logger logger=Logger.getLogger(DownFtp.class);
	      
    private FTPClient ftpClient;  
    private String strIp;  
    private int intPort;  
    private String user;  
    private String password;
    
    
    /* * 
     * DownFtp构造函数 
     */  
    public DownFtp(String strIp, int intPort, String user, String Password) {  
        this.strIp = strIp;  
        this.intPort = intPort;  
        this.user = user;  
        this.password = Password;  
        this.ftpClient = new FTPClient();  
    } 
    /** 
     * @return 判断是否登入成功 
     * */  
    public boolean ftpLogin() {  
        boolean isLogin = false;  
        FTPClientConfig ftpClientConfig = new FTPClientConfig();  
        ftpClientConfig.setServerTimeZoneId(TimeZone.getDefault().getID());  
        this.ftpClient.setControlEncoding("GBK");  
        this.ftpClient.configure(ftpClientConfig);  
        try {  
            if (this.intPort > 0) {  
                this.ftpClient.connect(this.strIp, this.intPort);  
            } else {  
                this.ftpClient.connect(this.strIp);  
            }  
            // FTP服务器连接回答  
            int reply = this.ftpClient.getReplyCode();  
            if (!FTPReply.isPositiveCompletion(reply)) {  
                this.ftpClient.disconnect();  
                logger.error("登录FTP服务失败！");  
                return isLogin;  
            }  
            this.ftpClient.login(this.user, this.password);  
            // 设置传输协议  
            this.ftpClient.enterLocalPassiveMode();  
            this.ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);  
            logger.info("恭喜" + this.user + "成功登陆FTP服务器");  
            isLogin = true;  
        } catch (Exception e) {  
            e.printStackTrace();  
            logger.error(this.user + "登录FTP服务失败！" + e.getMessage());  
        }  
        this.ftpClient.setBufferSize(1024 * 2);  
        this.ftpClient.setDataTimeout(30 * 1000);  
        return isLogin;  
    }  
    
    /** 
     * @退出关闭服务器链接 
     * */  
    public void ftpLogOut() {  
        if (null != this.ftpClient && this.ftpClient.isConnected()) {  
            try {  
                boolean reuslt = this.ftpClient.logout();// 退出FTP服务器  
                if (reuslt) {  
                    logger.info("成功退出服务器");  
                }  
            } catch (IOException e) {  
                e.printStackTrace();  
                logger.warn("退出FTP服务器异常！" + e.getMessage());  
            } finally {  
                try {  
                    this.ftpClient.disconnect();// 关闭FTP服务器的连接  
                } catch (IOException e) {  
                    e.printStackTrace();  
                    logger.warn("关闭FTP服务器的连接异常！");  
                }  
            }  
        }  
    } 
    
    /*** 
     * 下载文件 
     * @param remoteFileName   待下载文件名称 
     * @param localDires 下载到当地那个路径下 
     * @param remoteDownLoadPath remoteFileName所在的路径 
     * */  
  
    public boolean downloadFile(String remoteFileName, String localDires,  
            String remoteDownLoadPath) {  
        String strFilePath = localDires + remoteFileName;  
        BufferedOutputStream outStream = null;  
        boolean success = false;  
        try {  
            this.ftpClient.changeWorkingDirectory(remoteDownLoadPath);  
            outStream = new BufferedOutputStream(new FileOutputStream(  
                    strFilePath));  
            logger.info(remoteFileName + "开始下载....");  
            success = this.ftpClient.retrieveFile(remoteFileName, outStream);  
            if (success == true) {  
                logger.info(remoteFileName + "成功下载到" + strFilePath);  
                return success;  
            }  
        } catch (Exception e) {  
            e.printStackTrace();  
            logger.error(remoteFileName + "下载失败");  
        } finally {  
            if (null != outStream) {  
                try {  
                    outStream.flush();  
                    outStream.close();  
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
        if (success == false) {  
            logger.error(remoteFileName + "下载失败!!!");  
        }  
        return success;  
    }  
    
    public static void main(String[] args) throws IOException {  
    	DownFtp ftp=new DownFtp("61.133.215.177",21,"nxqxj","nxqxj@123");  
        ftp.ftpLogin();  
        //下载文件
        ftp.downloadFile("20160729_05.txt", "D://", "/qxgcsk");
        ftp.ftpLogOut();
        StringBuffer buffer=new StringBuffer();
        try {
            FileInputStream fis=new FileInputStream("D://20160729_05.txt");
            InputStreamReader isr=new InputStreamReader(fis,"GBK");
            BufferedReader br=new BufferedReader(isr);
            String line=null;
            br.skip(1);
            while ((line=br.readLine())!=null) {
                buffer.append(line);
                buffer.append("\r\n");
            }
            buffer.delete(buffer.length()-2,buffer.length());
            br.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(buffer);
        try {
            FileOutputStream fos=new FileOutputStream("D://20160729_05_1.txt");
            OutputStreamWriter osw=new OutputStreamWriter(fos,"UTF-8");
            osw.write(buffer.toString());
            osw.flush();
            osw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }  

}
