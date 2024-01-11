'use client';
import React, { use, useEffect, useState } from 'react';
import { SkillService } from '@/API/skillsService';
import { useMutation } from '@tanstack/react-query';
import { Skill, skillType } from '@/API/models/models';
import Error from './Error';
import Added from './Added';
import Loading from './Loading';
const skillApi = new SkillService();

const AddSkill = () => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [sType, setSType] = useState<skillType>(skillType.SKILL);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [publication, setPublication] = useState<string | undefined>(undefined);

  const getSkillType = (value: string): skillType => {
    switch (value) {
      case 'skill':
        return skillType.SKILL;
      case 'job':
        return skillType.JOB;
      case 'article':
        return skillType.ARTICLE;
      case 'profile':
        return skillType.PROFILE;
      default:
        return skillType.SKILL;
    }
  };

  useEffect(() => {}, [sType]);

  const addSkill = () => {
    if (!title || !description) {
      setMessage('Missing input field');
      return;
    }

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
          <select onChange={(e) => setSType(getSkillType(e.target.value))}>
            <option value={skillType.SKILL}>Skill</option>
            <option value={skillType.JOB}>Job</option>
            <option value={skillType.PROFILE}>Profile</option>
            <option value={skillType.ARTICLE}>Article</option>
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
          {/* add article data */}
          {sType === skillType.ARTICLE ? (
            <div>
              <div>
                Article URL:
                <input value={url} onChange={(e) => setUrl(e.target.value)} />
              </div>
              <div>
                Publication:
                <input
                  value={publication}
                  onChange={(e) => setPublication(e.target.value)}
                />
              </div>
            </div>
          ) : null}
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
