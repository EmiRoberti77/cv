import { Skill } from '@/API/models/models';
import React from 'react';
import './css/SkillCard.css';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div className="card">
      <span>{skill.date}</span>
      <div className="card-header">
        <p>{skill.description}</p>
        <br />
      </div>
      <div className="card-body">
        <h3>{skill.skill_name}</h3>
        <br />
        <div>
          Confidence:
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
