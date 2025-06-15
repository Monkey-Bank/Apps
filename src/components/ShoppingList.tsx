import React, { useState } from 'react';

const ShoppingList = () => {
  interface ShoppingItem {
    id: number;
    list: string;
    quantity: string;
    done: boolean;
  }

  const [shoppingLists, setShoppingLists] = useState<ShoppingItem[]>([]);
  const [listValue, setListValue] = useState<string>('');
  const [quantityValue, setQuantityValue] = useState<string>('');

  const handleAddList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListValue(e.target.value);
  };

  const handleAddQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityValue(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newList: ShoppingItem = {
      id: Date.now(),
      list: listValue,
      quantity: quantityValue,
      done: false,
    };
    setShoppingLists([...shoppingLists, newList]);
    setListValue('');
    setQuantityValue('');
  };

  // const handleAddListEdit = (id: number, list: string) => {
  //   const newList = shoppingLists.map((shoppingList) =>
  //     shoppingList.id === id ? { ...shoppingList, list } : shoppingList
  //   );
  //   setShoppingLists(newList);
  // };

  // const handleAddQuantityEdit = (id: number, quantity: number) => {
  //   const newQuantity = shoppingLists.map((shoppingList) =>
  //     shoppingList.id === id ? { ...shoppingList, quantity } : shoppingList
  //   );
  //   setShoppingLists(newQuantity);
  // };

  const updateShoppingListItem = (
    id: number,
    updatedFields: Partial<ShoppingItem>
  ) => {
    const updatedList = shoppingLists.map((item) =>
      item.id === id ? { ...item, ...updatedFields } : item
    );
    setShoppingLists(updatedList);
  };

  const handleDone = (id: number) => {
    const doneShoppingList = shoppingLists.map((shoppingList) =>
      shoppingList.id === id
        ? { ...shoppingList, done: !shoppingList.done }
        : shoppingList
    );
    setShoppingLists(doneShoppingList);
  };

  const handleDelete = (id: number) => {
    const deleteShoppingList = shoppingLists.filter(
      (shoppingList) => shoppingList.id !== id
    );
    setShoppingLists(deleteShoppingList);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={listValue}
          onChange={(e) => handleAddList(e)}
        />
        <input
          type="number"
          value={quantityValue}
          onChange={(e) => handleAddQuantity(e)}
        />
        <input type="submit" value="作成" />
      </form>

      <div>
        <p>買うもの　　　：　　　数量</p>
        <ul>
          {shoppingLists.map((shoppingList) => (
            <li key={shoppingList.id}>
              <input
                type="checkbox"
                onChange={() => handleDone(shoppingList.id)}
              />
              <input
                type="text"
                value={shoppingList.list}
                onChange={(e) =>
                  updateShoppingListItem(shoppingList.id, {
                    list: e.target.value,
                  })
                }
                disabled={shoppingList.done}
              />
              <input
                type="number"
                min="1"
                value={shoppingList.quantity}
                onChange={(e) =>
                  updateShoppingListItem(shoppingList.id, {
                    quantity: e.target.value,
                  })
                }
                disabled={shoppingList.done}
              />
              <button
                type="button"
                onClick={() => handleDelete(shoppingList.id)}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList;
