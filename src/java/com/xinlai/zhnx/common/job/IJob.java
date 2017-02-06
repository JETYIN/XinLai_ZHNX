package com.xinlai.zhnx.common.job;

import java.text.ParseException;
import java.util.HashMap;

import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Trigger;

public class IJob {
	private String key;
	private Job job;
	private HashMap<String, Object> parameteMap;
	private String cronExpression;

	public IJob(Job job, String cronExpression) {
		this.key = (job.getClass().getName() + cronExpression.hashCode());
		this.job = job;
		this.cronExpression = cronExpression;
	}

	protected JobDetail getJobDetail() throws ClassNotFoundException {
		JobDataMap jm = new JobDataMap();
		if (this.parameteMap != null) {
			jm.putAll(this.parameteMap);
		}
		JobDetail jobDetail = new JobDetail();
		jobDetail.setName(this.key);
		jobDetail.setJobClass(this.job.getClass());
		jobDetail.setJobDataMap(jm);
		return jobDetail;
	}

	protected Trigger getTrigger() throws ParseException {
		Trigger trigger = new CronTrigger(this.key, null, this.cronExpression);
		return trigger;
	}
}
