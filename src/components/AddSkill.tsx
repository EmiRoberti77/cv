'use client';
import React, { useState } from 'react';
import { SkillService } from '@/API/skillsService';
import { useMutation } from '@tanstack/react-query';
import { Skill, skillType } from '@/API/models/models';
import Error from './Error';
const skillApi = new SkillService();

const AddSkill = () => {
  const [title, setTitle] = useState<string>('title');
  const [description, setDescription] = useState<string>('description');

  const { isPending, isSuccess, isError, mutate } = useMutation({
    mutationFn: (skill: Skill) => {
      return skillApi.post(skill);
    },
  });

  if (isError) {
    return <Error />;
  }

  if (isPending) {
    return <div>Adding {title}. .</div>;
  }

  if (isSuccess) {
    return <div>Added {title}</div>;
  }

  return (
    <div>
      <h1>Add Skill</h1>
      <div>
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
        <button
          onClick={() =>
            mutate({
              id: 'string',
              type: skillType.SKILL,
              order: 2,
              description,
              date: 'web',
              skill_name: title,
              confidence: 5,
              createdAt: new Date().toISOString(),
            })
          }
        >
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default AddSkill;
