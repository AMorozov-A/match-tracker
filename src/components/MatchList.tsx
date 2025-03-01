import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchMatches, type Match } from '../services/matchService';
import MatchRow from './MatchRow';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const LoadingText = styled.div`
  color: #fff;
  text-align: center;
  padding: 20px;
`;

const ErrorText = styled.div`
  color: #e41e3f;
  text-align: center;
  padding: 20px;
`;

const MatchList = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchMatches();
        setMatches(data);
        setError(null);
      } catch {
        setError('Не удалось загрузить матчи');
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  if (loading) {
    return <LoadingText>Загрузка матчей...</LoadingText>;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <Container>
      {matches.map((match) => (
        <MatchRow key={match.title} match={match} />
      ))}
    </Container>
  );
};

export default MatchList;
