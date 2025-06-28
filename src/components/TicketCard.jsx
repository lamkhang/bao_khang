import React, { useMemo, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TicketCardContainer = styled.div`
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  width: 260px;
  min-height: 320px;
  padding: 0 0 16px 0;
  display: flex;
  flex-direction: column;
`;
const TicketHeader = styled.div`
  background: #c62828;
  color: #fff;
  padding: 12px 16px;
  border-radius: 6px 6px 0 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AddBtn = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
`;
const TicketContent = styled.div`
  padding: 12px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const TicketItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  position: relative;
  ${({ completed }) =>
    completed &&
    `
    text-decoration: line-through;
    color: #888;
  `}
`;
const ItemCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #888;
  border-radius: 2px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  transition: border 0.1s;

  &:checked::after {
    content: "";
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    background: #888;
    border-radius: 1px;
  }
`;
const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #d32f2f;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  &:hover {
    background: #f5f5f5;
  }
`;
const NewItemInput = styled.input`
  border: 1px solid #bbb;
  border-radius: 3px;
  padding: 3px 8px;
  font-size: 0.95rem;
  outline: none;
  background: #fff;
  height: 28px;
  width: 100%;
  &::placeholder {
    color: #aaa;
    font-style: italic;
  }
`;
const EmptyText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 0.98rem;
  text-align: center;
  min-height: 80px;
`;

const TicketCard = ({
  index,
  tickets,
  currentItemId,
  dataTicketsInItem,
  setDataTicketsInItem,
}) => {
  const dataTicket = useMemo(() => tickets[index], [tickets, index]);
  const [showNewItemInput, setShowNewItemInput] = useState(false);
  const inputRef = useRef(null);
  const [itemInputError, setItemInputError] = useState("");

  useEffect(() => {
    if (showNewItemInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNewItemInput]);

  const toggleItemCompletion = (ticketId, itemId) => {
    setDataTicketsInItem({
      ...dataTicketsInItem,
      [currentItemId]: tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            items: ticket.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, completed: !item.completed };
              }
              return item;
            }),
          };
        }
        return ticket;
      }),
    });
  };

  const removeItem = (ticketId, itemId) => {
    setDataTicketsInItem({
      ...dataTicketsInItem,
      [currentItemId]: tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            items: ticket.items.filter((item) => item.id !== itemId),
          };
        }
        return ticket;
      }),
    });
  };

  const handleNewItemChange = (ticketId, value) => {
    setDataTicketsInItem({
      ...dataTicketsInItem,
      [currentItemId]: tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return { ...ticket, newItemText: value };
        }
        return ticket;
      }),
    });
  };

  const addNewItem = (ticketId, e) => {
    if (e.key === 'Enter') {
      const ticket = tickets.find(t => t.id === ticketId);
      const value = ticket.newItemText.trim();
      if (!value) {
        setItemInputError("Item is required");
        return;
      }
      if (ticket.items.some(i => i.text.toLowerCase() === value.toLowerCase())) {
        setItemInputError("Item already exists");
        return;
      }
      setDataTicketsInItem({...dataTicketsInItem, [currentItemId]: tickets.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            items: [
              ...t.items,
              { id: Math.max(0, ...t.items.map(i => i.id)) + 1, text: t.newItemText, completed: false }
            ],
            newItemText: '',
          };
        }
        return t;
      })});
      setItemInputError("");
      setShowNewItemInput(false);
    } else if (e.key === 'Escape') {
      setDataTicketsInItem({...dataTicketsInItem, [currentItemId]: tickets.map(t => {
        if (t.id === ticketId) {
          return { ...t, newItemText: '' };
        }
        return t;
      })});
      setItemInputError("");
      setShowNewItemInput(false);
    }
  };

  return (
    <TicketCardContainer>
      <TicketHeader>
        {dataTicket.title}{" "}
        <AddBtn onClick={() => setShowNewItemInput(true)}>＋</AddBtn>
      </TicketHeader>
      <TicketContent>
        {showNewItemInput && (
          <>
            <NewItemInput
              ref={inputRef}
              placeholder="New item"
              value={dataTicket.newItemText}
              onChange={(e) => {
                handleNewItemChange(dataTicket.id, e.target.value);
                if (itemInputError) setItemInputError("");
              }}
              onKeyDown={(e) => addNewItem(dataTicket.id, e)}
            />
            {itemInputError && (
              <div style={{ color: '#d32f2f', fontSize: '0.95rem', marginTop: 2 }}>
                {itemInputError}
              </div>
            )}
          </>
        )}
        {dataTicket.items.length > 0 ? (
          dataTicket.items.map((item) => (
            <TicketItem key={item.id} completed={item.completed}>
              <ItemCheckbox
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItemCompletion(dataTicket.id, item.id)}
              />
              {item.text}
              <RemoveButton onClick={() => removeItem(dataTicket.id, item.id)}>
                ×
              </RemoveButton>
            </TicketItem>
          ))
        ) : (
          <EmptyText>
            Please click button add and input name of ticket
          </EmptyText>
        )}
      </TicketContent>
    </TicketCardContainer>
  );
};

TicketCard.propTypes = {
  index: PropTypes.number.isRequired,
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          text: PropTypes.string.isRequired,
          completed: PropTypes.bool.isRequired,
        })
      ).isRequired,
      newItemText: PropTypes.string.isRequired,
    })
  ).isRequired,
  dataTicketsInItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentItemId: PropTypes.string.isRequired,
  setDataTicketsInItem: PropTypes.func.isRequired,
};

export default TicketCard;
