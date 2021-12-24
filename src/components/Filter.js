const Filter = ({ search, handleSearch }) => {
  return (
    <>
      <p>
        filter shown with <input onChange={handleSearch} />
      </p>
      {search &&
        search.map((element) => (
          <p key={element.name}>
            {element.name} {element.number}
          </p>
        ))}
    </>
  );
};

export default Filter;
