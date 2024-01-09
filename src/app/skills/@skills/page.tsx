import { Skill } from '@/API/models/models';
import { SkillService } from '@/API/skillsService';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useQuery } from '@tanstack/react-query';
import SkillCard from '@/components/SkillCard';
const skillFilter: string = 'skill';
const api = new SkillService();

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
      <div className="flex-1 rounded-2xl bg-blue-800 p-10 text-white">
        <h1>Error loading skills or data is not an array!</h1>
      </div>
    );
  }

  if (isSuccess) {
    const skillList = data.body;
    return (
      <div className="flex-1 rounded-2xl bg-blue-800 p-10 text-white">
        <h1>My Skills</h1>
        <br />
        <div>
          {skillList.map((skill: Skill) => {
            if (skill.type === skillFilter)
              return <SkillCard skill={skill} key={skill.id} />;
            else return null;
          })}
        </div>
      </div>
    );
  }
}
