import React from "react";
interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className="flex bg-white justify-end items-end p-1 space-x-2 rounded-md">
      <input
        type="text"
        id="email"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        required
      />

      {searchValue?.length > 0 && (
        <div
          className="cursor-pointer cmbutton"
          onClick={() => setSearchValue("")}
        >
          <span className="border ">X</span>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
