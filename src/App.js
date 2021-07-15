import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { nanoid } from "nanoid";

function App() {
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: nanoid(),
      itemName: "item 4",
      quantity: 5,
      isSelected: false,
    },
    { id: nanoid(), itemName: "item 2", quantity: 1, isSelected: false },
    { id: nanoid(), itemName: "item 4", quantity: 1, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);

  const handleAddButtonClick = () => {
    const newItem = {
      id: nanoid(),
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };

    const newItems = [...shoppingLists, newItem];
    setShoppingLists(newItems);
    setInputValue("");
    calculateTotal();
  };

  const handleQuantityIncrease = (index) => {
    const newNotes = [...shoppingLists];
    newNotes[index].quantity++;
    setShoppingLists(newNotes);
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newNotes = [...shoppingLists];
    if (newNotes[index].quantity > 0) {
      newNotes[index].quantity--;
      setShoppingLists(newNotes);
    }

    calculateTotal();
  };

  const toggleComplete = (index) => {
    const newNotes = [...shoppingLists];
    newNotes[index].isSelected = !newNotes[index].isSelected;
    setShoppingLists(newNotes);
  };

  const calculateTotal = () => {
    const totalItemCount = shoppingLists.reduce((total, shoppingList) => {
      return total + shoppingList.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            type="text"
            placeholder="Add an item"
            className="add-item-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <AiOutlinePlus
            size="30"
            fill="red"
            className="add-icon"
            onClick={handleAddButtonClick}
          />
        </div>
        <div className="item-list">
          {shoppingLists.map((shoppingList, index) => (
            <div className="item-container" key={shoppingList.id}>
              <div className="item-name" onClick={() => toggleComplete(index)}>
                {shoppingList.isSelected ? (
                  <>
                    <FaRegCheckCircle size="25" className="arrow-check" />
                    <span className="completed">{shoppingList.itemName}</span>
                  </>
                ) : (
                  <>
                    <FaRegCircle size="25" className="arrow-check" />
                    <span>{shoppingList.itemName}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <FaAngleLeft
                  size="25"
                  className="arrow"
                  onClick={() => handleQuantityDecrease(index)}
                />
                <p>{shoppingList.quantity}</p>
                <FaAngleRight
                  size="25"
                  className="arrow"
                  onClick={() => handleQuantityIncrease(index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          Total: <span className="sum">{totalItemCount}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
