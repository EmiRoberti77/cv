import { Job } from '@/API/models/models';
import { SkillServive } from '@/API/skillsService';
import JobCard from '@/components/JobCard';
import { useQuery } from '@tanstack/react-query';
const api = new SkillServive();
const jobFiler: string = 'job';

export default function History() {
  const {
    data: jobData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<any>({
    queryKey: ['skills'],
    queryFn: () => api.asyncFetchSkills(),
  });

  if (isLoading) {
    return (
      <div className="h-96 flex-1 rounded-2xl bg-green-800 p-10 text-white">
        <h1 className="text-3x1 font-bold">loading .. </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-96 flex-1 rounded-2xl bg-red-800 p-10 text-white">
        <h1>Error loading jobs or data is not an array!</h1>
      </div>
    );
  }

  if (isSuccess) {
    const jobList = jobData.body;
    return (
      <div className="flex-1 rounded-2xl bg-blue-800 p-10 text-white">
        <h1>My jobs</h1>
        <br />
        <div>
          {jobList.map((job: Job) => {
            if (job.type === jobFiler) {
              return (
                <div>
                  <JobCard job={job} key={job.id} />
                  <br />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 rounded-2xl bg-pink-800 p-10 text-white">
      <h1 className="text-3x1 font-bold">My History</h1>
    </div>
  );
}
