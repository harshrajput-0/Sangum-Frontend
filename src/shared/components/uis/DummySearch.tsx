// components/DummySearch.tsx

import { Search } from "lucide-react";

export default function DummySearch() {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search..."
        disabled
        className="
          w-full
          rounded-lg
          border
          border-border
          bg-surface
          py-2
          pl-10
          pr-4
          text-sm
          text-text-secondary
          placeholder:text-text-muted
          cursor-not-allowed
          focus:outline-none
        "
      />
    </div>
  );
}