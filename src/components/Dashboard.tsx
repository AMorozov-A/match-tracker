import styled from 'styled-components';
import Sidebar from './Sidebar';

const DashboardContainer = styled.div`
  background-color: #1a1d21;
  padding: 20px;
  color: white;
  min-height: 100vh;
`;

const DashboardLayout = styled.div`
  display: flex;
  gap: 20px;
`;

const MainContent = styled.div`
  flex: 1;
`;

const CommandBlock = styled.div`
  background-color: #242830;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

const StatusBar = styled.div<{ status: 'success' | 'error' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.status === 'success' ? '#4CAF50' : '#f44336')};
  color: white;
  padding: 5px 15px;
  border-radius: 4px;
  font-size: 14px;
`;

const UserFlow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const UserNode = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #6c5ce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled.div`
  height: 2px;
  width: 50px;
  background-color: #6c5ce7;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: -4px;
    width: 0;
    height: 0;
    border-left: 8px solid #6c5ce7;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
`;

const MetricsContainer = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #a8b2c1;
`;

const Metric = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <Sidebar />
        <MainContent>
          <CommandBlock>
            <StatusBar status="success">
              <span>Command #01</span>
              <span>0/0</span>
            </StatusBar>

            <UserFlow>
              <UserNode>
                <UserIcon>U1</UserIcon>
                <MetricsContainer>
                  <Metric>
                    <span>Score:</span>
                    <span>+30</span>
                  </Metric>
                  <Metric>
                    <span>Points:</span>
                    <span>7</span>
                  </Metric>
                  <Metric>
                    <span>Score received:</span>
                    <span>12</span>
                  </Metric>
                </MetricsContainer>
              </UserNode>
              <Arrow />
              <UserNode>
                <UserIcon>U2</UserIcon>
                <MetricsContainer>
                  <Metric>
                    <span>Score:</span>
                    <span>+30</span>
                  </Metric>
                  <Metric>
                    <span>Points:</span>
                    <span>7</span>
                  </Metric>
                </MetricsContainer>
              </UserNode>
            </UserFlow>
          </CommandBlock>
        </MainContent>
      </DashboardLayout>
    </DashboardContainer>
  );
};

export default Dashboard;
