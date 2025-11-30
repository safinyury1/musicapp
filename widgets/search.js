
export const Search = ({functionSearch}) => {
  return (
    <div
      className="w-[464px]  bg-[#67912D] rounded-full py-2 px-[18px] flex items-center justify-between"
    >
      <input
        className="text-white select-none focus:outline-none"
        placeholder="Search"
        onChange={functionSearch}
      />
      <i className="bi bi-search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="white"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </i>
    </div>
  );
};