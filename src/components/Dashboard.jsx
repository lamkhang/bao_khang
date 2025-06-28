import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import TicketCard from "./TicketCard";

const DashboardContainer = styled.div`
  padding: 0 16px;
`;
const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f3f3f3;
  padding: 0 8px 0 0;
  min-height: 36px;
`;
const Title = styled.h1`
  color: #d32f2f;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  letter-spacing: 1px;
`;
const TicketsRow = styled.div`
  display: flex;
  gap: 24px;
`;

const CreateSection = styled.div`
  display: flex;
  align-items: top;
`;
const CreateInput = styled.input`
  border: 1px solid #bbb;
  border-radius: 3px 0 0 3px;
  padding: 3px 8px;
  background: #fff;
  font-size: 0.95rem;
  outline: none;
  height: 28px;
  width: 160px;
`;
const CreateButton = styled.button`
  background: #c62828;
  color: #fff;
  border: none;
  border-radius: 0 3px 3px 0;
  padding: 0 12px;
  font-size: 0.95rem;
  cursor: pointer;
  height: 28px;
  margin-left: -1px;
`;


const Dashboard = ({currentItemId, dataTicketsInItem, setDataTicketsInItem}) => {
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [createInputError, setCreateInputError] = useState(false);

  const tickets = useMemo(() =>  dataTicketsInItem[currentItemId], [dataTicketsInItem, currentItemId]);

  const handleCreateTicket = () => {
    const title = newTicketTitle.trim();
    if (!title) {
      setCreateInputError("Title ticket is require");
      return;
    }
    if (tickets && tickets.some(t => t.title.toLowerCase() === title.toLowerCase())) {
      setCreateInputError("Title ticket is already exists");
      return;
    }
    const newTicket = {
      id: tickets && tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1,
      title,
      items: [],
      newItemText: "",
    };
    setDataTicketsInItem({
      ...dataTicketsInItem,
      [currentItemId]: tickets ? [...tickets, newTicket] : [newTicket],
    });
    setNewTicketTitle("");
    setCreateInputError(false);
  };

  return (
    <DashboardContainer>
      <TopRow>
        <Title>DASHBOARD</Title>
        <CreateSection>
          <div>
          <CreateInput
            placeholder="New list"
            value={newTicketTitle}
            onChange={e => {
              setNewTicketTitle(e.target.value);
              if (createInputError) setCreateInputError(false);
            }}
            onKeyDown={e => { if (e.key === 'Enter') handleCreateTicket(); }}
          />
          {createInputError && (
            <div style={{ color: '#d32f2f', fontSize: '0.95rem', marginTop: 2 }}>
              {createInputError}
            </div>
          )}
          </div>

          <CreateButton onClick={handleCreateTicket}>Create</CreateButton>
        </CreateSection>
      </TopRow>
      <TicketsRow>
        {tickets && tickets.map((ticket, index) => (
          <TicketCard
            key={ticket.id}
            index={index}
            tickets={tickets}
            currentItemId={currentItemId} setDataTicketsInItem={setDataTicketsInItem} dataTicketsInItem={dataTicketsInItem}
          />
        ))}
      </TicketsRow>
    </DashboardContainer>
  );
};

Dashboard.propTypes = {
  dataTicketsInItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentItemId: PropTypes.string.isRequired,
  setDataTicketsInItem: PropTypes.func.isRequired,
};

export default Dashboard;