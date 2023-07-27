import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItems from "./AddItems";
import Search from "./Search";
import { useState } from "react";
import { useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("did not recieved expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsPending(false);
      }
    };
    setTimeout(() => {
      fetchItem();
    }, 2000);
  }, []);

  const AddItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItems = { id, checked: false, item };
    const ListItems = [...items, myNewItems];
    setItems(ListItems);

   const postOption={
    method: 'POST',
    headers: {'content-type' : 'application/json'},
    body: JSON.stringify(myNewItems)
    }

    const result = await apiRequest(API_URL, postOption)
    if(result) setFetchError(result)
  };
  const handleCheck = async (id) => {
    const ListItems = items.map((item) =>
      id === item.id ? { ...item, checked: !item.checked } : item
    );
    setItems(ListItems);

    const myItem= ListItems.filter(item=> item.id===id)
    const updateOption= {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOption)
    if(result) setFetchError(result)
  };
  const handleDelete = async (id) => {
    const ListItems = items.filter((item) => item.id !== id);
    setItems(ListItems);
    const deleteOPtion={
      method: 'DELETE',
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOPtion)
    if(result)setFetchError(result) 
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    AddItem(newItem);
    setNewItem(""); // Clear the input field by setting newItem to an empty string
  };
  //With this change, the input field should be cleared after submitting the form.

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItems
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Search search={search} setSearch={setSearch} />
      <main>
        {isPending && <p>loading items...</p>}
        {fetchError && (
          <p
            style={{ marginTop: "2rem", color: "red" }}
          >{`Error : ${fetchError} !`}</p>
        )}

        {!fetchError && !isPending && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            setItems={setItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
