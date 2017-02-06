package com.xinlai.zhnx.common.job;

import java.text.ParseException;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;

public class ScheduleManager {
	private Scheduler scheduler;

	protected void start() throws SchedulerException {
		this.scheduler.start();
	}

	public void addJobs(IJob job) throws SchedulerException,
			ClassNotFoundException, ParseException {
		this.scheduler.scheduleJob(job.getJobDetail(), job.getTrigger());
	}

	public void deleteJob(String key) throws SchedulerException {
		this.scheduler.deleteJob(key, null);
	}

	public Scheduler getScheduler() {
		return scheduler;
	}

	public void setScheduler(Scheduler scheduler) {
		this.scheduler = scheduler;
	}

}
