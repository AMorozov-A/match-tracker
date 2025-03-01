import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import type { Match as MatchType } from '../services/matchService';
import Team from './Team';

const Container = styled.div<{ isOpen: boolean }>`
  height: ${(props) => (props.isOpen ? '217px' : '73px')};
  transition: height 0.3s ease;
  overflow: hidden;
  border-radius: 4px;
  background-color: rgba(11, 14, 18, 1);

  @media (max-width: 1100px) {
    height: ${(props) => (props.isOpen ? '440px' : '96px')};
    position: relative;
  }
`;

const MatchRowHeader = styled.div<{ isOpen: boolean }>`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 1100px) {
    padding: 8px;
    flex-direction: column;
  }
`;

const Command = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
`;

const CommandIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Score = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const ScoreNumbers = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

const Status = styled.div<{ status: 'live' | 'finished' | 'preparing' }>`
  background-color: ${(props) => {
    switch (props.status) {
      case 'live':
        return '#4CAF50';
      case 'finished':
        return '#E41E3F';
      case 'preparing':
        return '#F1C40F';
      default:
        return '#E41E3F';
    }
  }};
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 500;
`;

const ExpandIcon = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${(props) => (props.isOpen ? '180deg' : '0deg')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  transition-delay: ${(props) => (props.isOpen ? '0s' : '0.1s')};
  opacity: ${(props) => (props.isOpen ? 1 : 0.6)};
  cursor: pointer;

  img {
    width: 12px;
    height: 12px;
    @media (max-width: 1100px) {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 1100px) {
    transform: rotate(${(props) => (props.isOpen ? '0deg' : '180deg')});
    position: absolute;
    top: ${(props) => (props.isOpen ? '405px' : '69px')};
    transition: top 0.3s ease-in-out, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const DetailsPanel = styled.div<{ isOpen: boolean }>`
  padding: ${(props) => (props.isOpen ? '20px' : 0)};
  height: ${(props) => (props.isOpen ? 'fit-content' : 0)};
  overflow-y: auto;

  @media (max-width: 1100px) {
    padding: ${(props) => (props.isOpen ? '8px' : 0)};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  display: none;

  @media (max-width: 1100px) {
    display: block;
  }
`;

const VsText = styled.div`
  display: none;
  color: rgba(255, 255, 255, 0.1);
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  padding: 8px 10px;
  font-size: 14px;

  @media (max-width: 1100px) {
    display: block;
  }
`;

const TeamsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  position: relative;

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 0;
    padding: 16px 0;
  }
`;

const MatchInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DividerBox = styled.div`
  align-items: center;
  justify-content: center;
  display: none;

  @media (max-width: 1100px) {
    display: flex;
  }
`;

interface MatchRowProps {
  match: MatchType;
}

const MatchRow = ({ match }: MatchRowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContainerClick = useCallback(() => {
    if (!isMobile) {
      setIsOpen(!isOpen);
    }
  }, [isMobile, isOpen]);

  const handleExpandIconClick = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }
    },
    [isMobile, isOpen]
  );

  const getMatchStatus = () => {
    switch (match.status) {
      case 'Ongoing':
        return 'live';
      case 'Finished':
        return 'finished';
      case 'Scheduled':
        return 'preparing';
      default:
        return 'finished';
    }
  };

  const getStatusText = () => {
    switch (match.status) {
      case 'Ongoing':
        return 'Live';
      case 'Finished':
        return 'Finished';
      case 'Scheduled':
        return 'Preparing';
      default:
        return 'Finished';
    }
  };

  return (
    <>
      <Container isOpen={isOpen} onClick={handleContainerClick}>
        <MatchRowHeader isOpen={isOpen}>
          <MatchInfo>
            <Command>
              <CommandIcon>
                <img src="/command-icon.svg" alt="Command icon" />
              </CommandIcon>
              <span>{match.homeTeam.name}</span>
            </Command>

            <Score>
              <ScoreNumbers>
                {match.homeScore} : {match.awayScore}
              </ScoreNumbers>
              <Status status={getMatchStatus()}>{getStatusText()}</Status>
            </Score>

            <Command style={{ justifyContent: 'flex-end' }}>
              <span>{match.awayTeam.name}</span>
              <CommandIcon>
                <img src="/command-icon.svg" alt="Command icon" />
              </CommandIcon>
            </Command>
          </MatchInfo>

          <ExpandIcon isOpen={isOpen} onClick={handleExpandIconClick}>
            <img src="/arrow.svg" alt="Expand" />
          </ExpandIcon>
        </MatchRowHeader>

        <DetailsPanel isOpen={isOpen}>
          <TeamsContainer>
            <Team
              members={match.homeTeam.players.map((p) => ({
                id: p.username,
                name: p.username,
                kills: p.kills,
              }))}
              points={match.homeTeam.points}
              position={match.homeTeam.place}
              totalKills={match.homeTeam.total_kills}
            />
            <DividerBox>
              <Divider />
              <VsText>VS</VsText>
              <Divider />
            </DividerBox>
            <Team
              members={match.awayTeam.players.map((p) => ({
                id: p.username,
                name: p.username,
                kills: p.kills,
              }))}
              points={match.awayTeam.points}
              position={match.awayTeam.place}
              totalKills={match.awayTeam.total_kills}
            />
          </TeamsContainer>
        </DetailsPanel>
      </Container>
    </>
  );
};

export default MatchRow;
