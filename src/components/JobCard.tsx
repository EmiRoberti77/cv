import { Job } from '@/API/models/models';
import React from 'react';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <h2>Role: {job.job_title}</h2>
        <div>
          <b>Date:</b> {job.start_date} - {job.end_date || 'Present'}{' '}
          <b>
            <a href={job.company_url} target="_blank" rel="noopener noreferrer">
              {job.company}
            </a>
          </b>
        </div>
        <br />
      </div>
      <div className="job-details-container">
        <div className="job-body">
          <p>{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
