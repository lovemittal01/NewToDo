import React, { useState } from "react";
import todo from "../images/todo.png";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  // Delete the Items

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updatedItems);
  };

  // Edit the Items

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });

    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  //   Remove all Items

  const removeAll = () => {
    setItems([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          {/* ToDo Logo */}

          <figure>
            <img src={todo} alt="Todo Logo" />
            <figcaption>Add Your List Here ✌️</figcaption>
          </figure>

          {/* Adding Notes */}

          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items... "
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />

            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Items"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit edit-btn"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>

          {/* Showing Notes */}

          <div className="showItems">
            {items.map((elem) => {
              return (
                <div className="eachItems" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <i
                    className="far fa-edit edit-btn"
                    title="Edit Item"
                    onClick={() => editItem(elem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Delete Items"
                    onClick={() => deleteItem(elem.id)}
                  ></i>
                </div>
              );
            })}
          </div>

          {/* Clear All Items */}

          <div className="showItems">
            <button
              className="btn"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>REMOVE ALL</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
