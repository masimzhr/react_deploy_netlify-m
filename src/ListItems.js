import LineItem from "./LineItem";
const ListItems = ({ handleCheck, handleDelete, items }) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItem
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          key={item.id}
        />
      ))}
    </ul>
  );
};

export default ListItems;
