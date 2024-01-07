import { Job } from '@/API/models/models';
import React from 'react';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <h2>
          ({job.order})-{job.job_title}
        </h2>
        <a href={job.company_url} target="_blank" rel="noopener noreferrer">
          {job.company}
        </a>
      </div>
      <div className="job-body">
        <p>{job.description}</p>
        <div>
          Date: {job.start_date} - {job.end_date || 'Present'}
        </div>
      </div>
      <div className="job-footer">
        <small>Posted on: {job.createdAt}</small>
      </div>
    </div>
  );
};

export default JobCard;
