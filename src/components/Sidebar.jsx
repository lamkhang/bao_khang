import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SidebarContainer = styled.div`
  width: 260px;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ParentItem = styled.div`
  padding: 16px 20px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  background: ${({ active }) => (active ? "#f5f7fa" : "#fff")};
  border-left: ${({ active }) => (active ? "4px solid #1976d2" : "4px solid transparent")};
  color: ${({ active }) => (active ? "#1976d2" : "#222")};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ChildrenList = styled.div`
  padding-left: 32px;
  font-size: 0.98rem;
  color: #444;
`;
const ChildItem = styled.div`
  padding: 6px 0;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `
      background: #e3f2fd;
      color: #1976d2;
      font-weight: 600;
      border-radius: 4px;
      padding-left: 4px;
    `}
`;
const ExpandIcon = styled.span`
  font-size: 1.2rem;
  margin-left: 8px;
`;


const getExpandIconHTML = (hasChildren, isOpen) => {
  if (!hasChildren) return null;
  return isOpen ? "&#11167;" : "&#11165;";
};

const Sidebar = ({sidebarData, currentItemId, setCurrentItemId}) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <SidebarContainer>
      {sidebarData && sidebarData.map((item, idx) => {
        const parentKey = `${item.label}-${idx}`;
        return (
          <div key={parentKey}>
            <ParentItem
              active={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            >
              {item.label}
              <ExpandIcon
                dangerouslySetInnerHTML={{
                  __html: getExpandIconHTML(item.children.length > 0, openIndex === idx)
                }}
              />
            </ParentItem>
            {openIndex === idx && item.children.length > 0 && (
              <ChildrenList>
                {item.children.map(({id, label}) => (
                  <ChildItem
                    key={`${parentKey}-child-${label}=${id}`}
                    onClick={() => setCurrentItemId(id)}
                    active={id === currentItemId}
                  >
                    • {label}
                  </ChildItem>
                ))}
              </ChildrenList>
            )}
          </div>
        );
      })}
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  sidebarData: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentItemId: PropTypes.string.isRequired,
  setCurrentItemId: PropTypes.func.isRequired,
};

export default Sidebar;