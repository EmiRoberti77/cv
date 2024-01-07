import axios from 'axios';
import { count } from 'console';

export class SkillServive {
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
    console.log('api', this.apiUrl);
    SkillServive.count += 1;
    console.log('asyncFetchSkills', SkillServive.count);
    const response = await axios.get(this.apiUrl);
    return response.data;
  }
}
