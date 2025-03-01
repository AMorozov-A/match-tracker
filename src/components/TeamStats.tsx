import styled from 'styled-components';

const TeamInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: rgba(16, 19, 24, 1);
  padding: 10px 20px;
  border-radius: 8px;

  & > *:not(:last-child) {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      right: -1px;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 100%;
      background-color: rgba(20, 26, 33, 1);
    }
  }

  @media (max-width: 1100px) {
    padding: 14px 12px;
    font-size: 12px;
  }
`;

const StatItem = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;

  span:first-child {
    color: #6b7280;
  }
`;

interface TeamStatsProps {
  points: number;
  position: number;
  totalKills: number;
}

const TeamStats = ({ points, position, totalKills }: TeamStatsProps) => {
  return (
    <TeamInfo>
      <StatItem>
        <span>Points:</span>
        <span>+{points}</span>
      </StatItem>
      <StatItem>
        <span>Место:</span>
        <span>{position}</span>
      </StatItem>
      <StatItem>
        <span>Всего убийств:</span>
        <span>{totalKills}</span>
      </StatItem>
    </TeamInfo>
  );
};

export default TeamStats;
