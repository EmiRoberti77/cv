import axios from 'axios';
import { count } from 'console';
import { Job, Profile, Skill } from './models/models';

export class SkillService {
  private static count = 0;
  private apiUrl: string;
  constructor() {
    this.apiUrl =
      'https://p4u5g8kbz5.execute-api.us-east-1.amazonaws.com/prod/skills';
  }

  public fetchSkills() {
    axios
      .get(this.apiUrl)
      .then((res) => res.data)
      .catch((err) => err.message);
  }

  public async asyncFetchSkills() {
    SkillService.count += 1;
    console.log('asyncFetchSkills', SkillService.count);
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  public async post(skill: Job | Skill | Profile): Promise<boolean> {
    const response = await axios.post(this.apiUrl, skill);
    console.log(response.data);
    if (response.data) return true;
    return false;
  }
}
