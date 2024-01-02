export class SkillServive {
  private apiUrl: string;
  constructor() {
    this.apiUrl = process.env.API_URL as string;
  }

  public async fetchSkills(): Promise<any> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
      });
      return response.json();
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
