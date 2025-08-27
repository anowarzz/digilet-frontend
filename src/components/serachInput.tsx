import { Input } from "@/components/ui/input";
import { ArrowRightIcon, SearchIcon, X } from "lucide-react";
import { useId } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
  onClear,
}: SearchInputProps) {
  const id = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="*:not-first:mt-2" onSubmit={handleSubmit}>
      <div className="relative">
        <Input
          id={id}
          className="peer ps-9 pe-9 [&::-webkit-search-cancel-button]:appearance-none"
          placeholder={placeholder || "Search..."}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>

        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-10 flex h-full w-6 items-center justify-center transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}

        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
