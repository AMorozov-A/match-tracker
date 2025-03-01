import styled from 'styled-components';
import TeamStats from './TeamStats';
import User from './User';

const TeamSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UsersList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 2px;
`;

interface TeamMember {
  id: string | number;
  name: string;
  kills: number;
  avatar?: string;
}

interface TeamProps {
  members: TeamMember[];
  points: number;
  position: number;
  totalKills: number;
}

const Team = ({ members, points, position, totalKills }: TeamProps) => {
  return (
    <TeamSection>
      <UsersList>
        {members.map((member) => (
          <User key={member.id} name={member.name} kills={member.kills} avatar={member.avatar} />
        ))}
      </UsersList>
      <TeamStats points={points} position={position} totalKills={totalKills} />
    </TeamSection>
  );
};

export default Team;
