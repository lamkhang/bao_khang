import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';


const DataSidebar = [
  {
    label: "Item Parent 1",
    children: [
      {
        id: "parent1_children1",
        label: "Item children 1",
      },
      {
        id: "parent1_children2",
        label: "Item children 2",
      },
      {
        id: "parent1_children3",
        label: "Item children 3",
      }
    ],
  },
  {
    label: "Item Parent 2",
    children: [
      {
        id: "parent2_children1",
        label: "Item children 1",
      },
      {
        id: "parent2_children2",
        label: "Item children 2",
      },
      {
        id: "parent2_children3",
        label: "Item children 3",
      }
    ],
  },
]

const App = () => {
  const [currentItemId, setCurrentItemId] = useState(DataSidebar[0].children[0].id);
  const [dataTicketsInItem, setDataTicketsInItem]= useState({});

  useEffect(() => {
    let data = {};
    DataSidebar.forEach(({children}) => children.forEach(({id}) => {data = {...data, [id]: [
      {
        id: 1,
        title: "Ticket1",
        items: [
          { id: 1, text: "Item-1", completed: false },
          { id: 2, text: "Item-2", completed: true },
        ],
        newItemText: "",
      },
      {
        id: 2,
        title: "Ticket2",
        items: [
          { id: 1, text: "Item-1", completed: true },
          { id: 2, text: "Item-2", completed: false },
        ],
        newItemText: "",
      },
    ]}}))
    setDataTicketsInItem(data)
  }, [DataSidebar])

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar sidebarData={DataSidebar} currentItemId={currentItemId} setCurrentItemId={setCurrentItemId} />
        <div style={{ flex: 1, background: "#f3f3f3", padding: 24 }}>
          <Dashboard currentItemId={currentItemId} setDataTicketsInItem={setDataTicketsInItem} dataTicketsInItem={dataTicketsInItem} />
        </div>
      </div>
    </div>
  );
};

export default App;
