import { FiSearch } from "react-icons/fi";

type Props = {
  query: string;
  onChange: (query: string) => void;
};
export const SearchBar = ({ query, onChange }: Props) => {
  return (
    <div className="w-full flex items-center relative border border-slate-500 rounded-md p-2 shadow-sm md:w-3/4 lg:w-1/2">
      <FiSearch />
      <input
        aria-label="Search task"
        type="search"
        name="task-search"
        placeholder="Search task"
        value={query}
        onChange={(e) => onChange(e.target.value?.toLowerCase())}
        className="outline-none bg-transparent pl-2 w-full"
      />
    </div>
  );
};
