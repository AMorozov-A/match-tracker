import styled from 'styled-components';

const SidebarContainer = styled.div`
  background-color: #242830;
  padding: 15px;
  border-radius: 8px;
  width: 250px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

const Button = styled.button<{ variant?: 'success' | 'error' | 'warning' }>`
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  background-color: ${(props) => {
    switch (props.variant) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      default:
        return '#6c5ce7';
    }
  }};

  &:hover {
    opacity: 0.9;
  }
`;

const StatusIndicator = styled.div<{ status: 'live' | 'match' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => (props.status === 'live' ? '#4CAF50' : '#a8b2c1')};
  font-size: 14px;
  padding: 5px 0;

  &:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <ButtonGroup>
        <Button>Box strategy</Button>
        <Button>Box strategy</Button>
        <Button>Box strategy</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button>Box strategy</Button>
        <Button>Box strategy</Button>
        <Button>Box strategy</Button>
      </ButtonGroup>

      <ButtonGroup>
        <StatusIndicator status="live">Live</StatusIndicator>
        <StatusIndicator status="match">Match preparing</StatusIndicator>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="success">Offensive</Button>
        <Button variant="error">Defensive</Button>
        <Button variant="warning">Balanced</Button>
      </ButtonGroup>
    </SidebarContainer>
  );
};

export default Sidebar;
