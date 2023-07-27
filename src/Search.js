const Search = ({search, setSearch}) => {
  return (
    <form className="addForm" onSubmit={e=>e.preventDefault()}>
      <label></label>
      <input
      id="search"
       type="text"
       role="searchbox"
       placeholder="search"
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
      />
    </form>
  )
}

export default Search;