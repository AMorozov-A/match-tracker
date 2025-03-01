import styled from 'styled-components';

const UserRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: rgba(16, 19, 24, 1);
  padding: 8px 12px;
  border-radius: 8px;
  min-width: 0;

  @media (max-width: 1100px) {
    flex-direction: column;
    padding: 4px 8px;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #6c5ce7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserNameWithAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
`;

const UserName = styled.div`
  font-size: 14px;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const KillsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: 14px;
  flex-shrink: 0;

  span:last-child {
    color: #ffffff;
  }

  @media (max-width: 1100px) {
    font-size: 12px;
  }
`;

interface UserProps {
  name: string;
  kills: number;
  avatar?: string;
}

const User = ({ name, kills, avatar }: UserProps) => {
  return (
    <UserRow>
      <UserNameWithAvatar>
        <UserAvatar>{avatar ? <img src={avatar} alt={name} /> : <img src="/user-frames.png" alt={name} />}</UserAvatar>
        <UserName>{name}</UserName>
      </UserNameWithAvatar>
      <KillsInfo>
        <span>Убийств:</span>
        <span>{kills}</span>
      </KillsInfo>
    </UserRow>
  );
};

export default User;
