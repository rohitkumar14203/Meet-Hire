import { Input } from "./Input";
import { Button } from "./Button";
import { Search } from "lucide-react";

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  showButton = false,
  buttonText = "Search",
  className = "",
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`flex gap-2 items-end ${className}`}>
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          icon={Search}
        />
      </div>

      {showButton && (
        <Button 
          variant="primary" 
          onClick={onSearch}
          icon={Search}
          className="mb-4"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};


