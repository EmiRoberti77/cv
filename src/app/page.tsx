import { SkillServive } from '@/API/skillsService';
const api = new SkillServive();

export default async function Home() {
  const skills = await api.fetchSkills();
  console.info(skills);
  return (
    <div className="h-30 rounded-2xl bg-sky-800 p-10 text-white">
      <h1 className="text-3x1 font-bold">Emiliano Roberti</h1>
    </div>
  );
}
