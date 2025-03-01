import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import type { MatchStatus } from '../services/matchService';
import type { WebSocketMessage } from '../services/websocketService';
import { websocketService } from '../services/websocketService';
import type { AppDispatch, RootState } from '../store';
import { fetchMatchesThunk, updateMatches } from '../store/matchesSlice';
import MatchRow from './MatchRow';
import StatusFilter from './StatusFilter';

const Container = styled.div`
  padding: 20px;
  color: white;
  max-width: 1900px;
  margin: 0 auto;

  @media (max-width: 1100px) {
    padding: 12px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    margin-bottom: 37px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const Logo = styled.div`
  max-width: 260px;
  height: 32px;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 1100px) {
    width: 200px;
    height: 46px;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 19, 24, 1);
  border-radius: 4px;
  padding: 8px 12px;
  color: white;
  font-size: 14px;

  @media (max-width: 1100px) {
    justify-content: center;
  }
`;

const ErrorIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #eb0237;

  img {
    width: 16px;
    height: 16px;
  }
`;

const RefreshButton = styled.button`
  background-color: #e41e3f;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: auto;

  &:hover {
    background-color: #d1162f;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  img {
    width: 16px;
    height: 16px;
    animation: ${(props) => (props.disabled ? 'spin 1s linear infinite' : 'none')};
  }

  @media (max-width: 1100px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(11, 14, 18, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const MatchesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;

  @media (max-width: 1100px) {
    gap: 8px;
  }
`;

const MatchTracker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: matches } = useSelector((state: RootState) => state.matches);
  const [selectedStatus, setSelectedStatus] = useState<MatchStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleMatchesUpdate = (message: WebSocketMessage) => {
    if (!isLoading && message.type === 'update_matches' && message.data) {
      dispatch(updateMatches(message.data));
    }
  };

  const loadMatches = async () => {
    setIsLoading(true);
    setShowError(false);

    try {
      await dispatch(fetchMatchesThunk());
    } catch {
      setShowError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadMatches();
    const unsubscribe = websocketService.subscribe(handleMatchesUpdate);
    return () => unsubscribe();
  }, [dispatch]);

  const filteredMatches = matches.filter((match) => selectedStatus === 'all' || match.status === selectedStatus);

  return (
    <Container>
      <Header>
        <TitleSection>
          <Logo>
            <img src="/logo.png" alt="Match Tracker" />
          </Logo>
          <StatusFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
        </TitleSection>
        <HeaderControls>
          {showError && (
            <ErrorMessage>
              <ErrorIcon>
                <img src="/error.svg" alt="Error" />
              </ErrorIcon>
              <span>Ошибка: не удалось загрузить информацию</span>
            </ErrorMessage>
          )}
          <RefreshButton onClick={loadMatches} disabled={isLoading}>
            <span>Обновить</span>
            <img src="/refresh.svg" alt="Refresh" />
          </RefreshButton>
        </HeaderControls>
      </Header>

      <MatchesList>
        {isLoading && (
          <LoadingOverlay>
            <img
              src="/refresh.svg"
              alt="Loading"
              style={{ width: '32px', height: '32px', animation: 'spin 1s linear infinite' }}
            />
          </LoadingOverlay>
        )}
        {filteredMatches.map((match) => (
          <MatchRow key={match.title} match={match} />
        ))}
      </MatchesList>
    </Container>
  );
};

export default MatchTracker;
