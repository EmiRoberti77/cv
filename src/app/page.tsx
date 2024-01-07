'use client';
import { Skill } from '@/API/models/models';
import { SkillServive } from '@/API/skillsService';
import { useQuery } from '@tanstack/react-query';
const api_url = process.env.NEXT_PUBLIC_SKILL_API as string;
const api = new SkillServive();

export default function Home() {
  console.log('api_url', api_url);
  const {
    data: skillsData,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: () => api.asyncFetchSkills(),
  });

  if (isLoading) {
    return (
      <div className="h-30 rounded-2xl bg-sky-800 p-10 text-white">
        <h1 className="text-3x1 font-bold">loading ..</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-30 rounded-2xl bg-sky-800 p-10 text-white">
        <h1 className="text-3x1 font-bold">Error loading the api</h1>
      </div>
    );
  }

  if (isSuccess) {
    console.log('isSuccess', skillsData);
  }

  return (
    <div className="h-30 rounded-2xl bg-sky-800 p-10 text-white">
      <h1 className="text-3x1 font-bold">Emiliano Roberti</h1>
    </div>
  );
}
