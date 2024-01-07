import { Profile as Prof } from '@/API/models/models';
import { useQuery } from '@tanstack/react-query';
import { SkillServive } from '@/API/skillsService';
const api = new SkillServive();
const profileFilter = 'profile';

export default function Profile() {
  const {
    data: profileData,
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
      <div className="flex-1 rounded-2xl bg-blue-800 p-10 text-white">
        <h1>Error loading skills or data is not an array!</h1>
      </div>
    );
  }

  if (isSuccess) {
    const profiles = profileData.body;
    return (
      <div className="flex-1 rounded-2xl bg-blue-800 p-10 text-white">
        <h1>My Profile</h1>
        <div>
          {profiles.map((profile: Prof) => {
            if (profile.type === profileFilter)
              return <div key={profile.id}>{profile.description}</div>;
            else return null;
          })}
        </div>
      </div>
    );
  }
}
