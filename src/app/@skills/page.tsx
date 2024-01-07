import { Skill } from '@/API/models/models';
import { SkillServive } from '@/API/skillsService';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useQuery } from '@tanstack/react-query';
const skillFilter: string = 'skill';
const api = new SkillServive();

export default function Skills() {
  const { data, isError, isLoading, isSuccess } = useQuery<any>({
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
        <h1>Error loading skills or data is not an array!</h1>
      </div>
    );
  }

  if (isSuccess) {
    const skillList = data.body;
    return (
      <div className="h-96 flex-1 rounded-2xl bg-blue-800 p-10 text-white">
        <h1>My Skills</h1>
        <div>
          {skillList.map((skill: Skill) => {
            if (skill.type === skillFilter)
              return <div key={skill.id}>{skill.skill_name}</div>;
            else return null;
          })}
        </div>
      </div>
    );
  }
}
