import { useState } from 'react';
import styled from 'styled-components';
import type { MatchStatus } from '../services/matchService';

const FilterContainer = styled.div`
  position: relative;
  width: 100%;
`;

const FilterButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 12px 16px;
  background: #101318;
  border: none;
  border-radius: 8px;
  color: ${({ isOpen }) => (isOpen ? 'rgba(255, 255, 255, 1)' : 'rgba(180, 181, 182, 1)')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #1a1e24;
  }

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${({ isOpen }) => (isOpen ? 'rgba(255, 255, 255, 1)' : 'rgba(180, 181, 182, 1)')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
    transition: transform 0.2s ease;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: #101318;
  border-radius: 8px;
  overflow: hidden;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-10px')});
  transition: all 0.2s ease;
  z-index: 10;
`;

const MenuItem = styled.button<{ isActive?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(180, 181, 182, 1)')};
  text-align: left;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #1a1e24;
    color: rgba(255, 255, 255, 1);
  }
`;

const statuses: { label: string; value: MatchStatus | 'all' }[] = [
  { label: 'Все статусы', value: 'all' },
  { label: 'Live', value: 'Ongoing' },
  { label: 'Finished', value: 'Finished' },
  { label: 'Match preparing', value: 'Scheduled' },
];

interface StatusFilterProps {
  selectedStatus: MatchStatus | 'all';
  onStatusChange: (status: MatchStatus | 'all') => void;
}

const StatusFilter = ({ selectedStatus, onStatusChange }: StatusFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusSelect = (status: MatchStatus | 'all') => {
    onStatusChange(status);
    setIsOpen(false);
  };

  const selectedLabel = statuses.find((s) => s.value === selectedStatus)?.label || 'Все статусы';

  return (
    <FilterContainer>
      <FilterButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}
      </FilterButton>
      <DropdownMenu isOpen={isOpen}>
        {statuses.map((status) => (
          <MenuItem
            key={status.value}
            isActive={status.value === selectedStatus}
            onClick={() => handleStatusSelect(status.value)}
          >
            {status.label}
          </MenuItem>
        ))}
      </DropdownMenu>
    </FilterContainer>
  );
};

export default StatusFilter;
