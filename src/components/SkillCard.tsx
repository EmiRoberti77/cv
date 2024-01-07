import { Skill } from '@/API/models/models';
import React from 'react';
import './css/SkillCard.css';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{skill.skill_name}</h2>
        <span>{skill.date}</span>
      </div>
      <div className="card-body">
        <p>{skill.description}</p>
        <div>Confidence: {skill.confidence}</div>
      </div>
      <div className="card-footer">
        <small>Created at: {skill.createdAt}</small>
      </div>
    </div>
  );
};

export default SkillCard;
