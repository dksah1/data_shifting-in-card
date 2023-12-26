import React, { useState } from 'react';

const Card = ({ title, items, onItemSelect, selectedItems }) => {
  const handleCheckboxChange = (item) => {
    onItemSelect(item);
  };

  return (
    <div className="card flex align-middle flex-col items-center justify-between m-36 w-[100%] bg-red-400 ">
      <h2>{title}</h2>
      {items.map((item) => (
        <div key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [leftItems, setLeftItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);
  const [rightItems, setRightItems] = useState([]);

  const [selectedLeftItems, setSelectedLeftItems] = useState([]);
  const [selectedRightItems, setSelectedRightItems] = useState([]);

  const handleLeftItemSelect = (item) => {
    const index = selectedLeftItems.findIndex((selectedItem) => selectedItem.id === item.id);
    if (index === -1) {
      setSelectedLeftItems([...selectedLeftItems, item]);
    } else {
      const updatedSelectedItems = [...selectedLeftItems];
      updatedSelectedItems.splice(index, 1);
      setSelectedLeftItems(updatedSelectedItems);
    }
  };

  const handleRightItemSelect = (item) => {
    const index = selectedRightItems.findIndex((selectedItem) => selectedItem.id === item.id);
    if (index === -1) {
      setSelectedRightItems([...selectedRightItems, item]);
    } else {
      const updatedSelectedItems = [...selectedRightItems];
      updatedSelectedItems.splice(index, 1);
      setSelectedRightItems(updatedSelectedItems);
    }
  };

  const handleMoveToLeft = () => {
    setRightItems(rightItems.filter((item) => !selectedRightItems.includes(item)));
    setLeftItems([...leftItems, ...selectedRightItems]);
    setSelectedRightItems([]);
  };

  const handleMoveToRight = () => {
    setLeftItems(leftItems.filter((item) => !selectedLeftItems.includes(item)));
    setRightItems([...rightItems, ...selectedLeftItems]);
    setSelectedLeftItems([]);
  };

  return (
    <div className="App flex justify-center items-center bg-slate-500 w-screen">
      <Card className="w-full "
        title="Left Card"
        items={leftItems}
        onItemSelect={handleLeftItemSelect}
        selectedItems={selectedLeftItems}
      />
      <div>
        <button className='bg-green-500 rounded-full mb-3 ' onClick={handleMoveToRight}>Right</button>
        <button className='bg-red-800 rounded-full border-none' onClick={handleMoveToLeft}>Left</button>
      </div>
      <Card
        title="Right Card"
        items={rightItems}
        onItemSelect={handleRightItemSelect}
        selectedItems={selectedRightItems}
      />
    </div>
  );
};

export default App;
