'use client';
import React, { use, useState } from 'react';
import { SkillService } from '@/API/skillsService';
import { useMutation } from '@tanstack/react-query';
import { Skill, skillType } from '@/API/models/models';
import Error from './Error';
import Added from './Added';
import Loading from './Loading';
const skillApi = new SkillService();

class SkillCreator {
  private skillType: skillType;
  constructor(skillType: skillType) {
    this.skillType = skillType;
  }

  public getSkill({
    title,
    description,
    date = undefined,
    start_date = undefined,
    end_date = undefined,
    company_url = undefined,
    company = undefined,
  }: {
    title: string;
    description: string;
    date?: string;
    start_date?: string;
    end_date?: string;
    company_url?: string;
    company?: string;
  }) {
    const isoDate = new Date().toISOString();
    switch (this.skillType) {
      case skillType.SKILL:
        return {
          id: isoDate,
          type: skillType.SKILL,
          order: 2,
          description,
          date,
          skill_name: title,
          confidence: 5,
          createdAt: isoDate,
        };
      case skillType.JOB:
        return {
          id: isoDate,
          type: skillType.JOB,
          order: 2,
          createdAt: isoDate,
          description,
          start_date,
          end_date,
          company_url,
          job_title: title,
          company,
        };
      default:
        return {
          error: 'Invalid Skills Params',
        };
    }
  }
}

const AddSkill = () => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [sType, setSType] = useState<skillType>(skillType.SKILL);

  const addSkill = () => {
    if (!title || !description) {
      setMessage('Missing input field');
      return;
    }

    const skillCreator = new SkillCreator(sType);

    mutate({
      id: 'string',
      type: skillType.SKILL,
      order: 2,
      description,
      date: 'web',
      skill_name: title,
      confidence: 5,
      createdAt: new Date().toISOString(),
    });
  };

  const { error, isPending, isSuccess, isError, mutate } = useMutation({
    mutationFn: (skill: Skill) => {
      return skillApi.post(skill);
    },
  });

  const buildAddSkillForm = () => {
    return (
      <div>
        <h1>Add Skill</h1>
        <div>
          <select>
            <option>Skill</option>
            <option>Job</option>
            <option>Profile</option>
            <option>Article</option>
          </select>
          <div>
            title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            description:
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button onClick={addSkill}>Add Skill</button>
        </div>
      </div>
    );
  };

  if (isError) {
    return <Error>{error.message}</Error>;
  }

  if (isPending) {
    return <Loading>Loading skills</Loading>;
  }

  if (isSuccess) {
    return <Added title={title ? title : '?'}>{buildAddSkillForm()}</Added>;
  }

  return buildAddSkillForm();
};

export default AddSkill;
