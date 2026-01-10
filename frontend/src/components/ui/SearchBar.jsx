import { Input } from "./Input";
import { Button } from "./Button";

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
    <div className={`flex gap-2 items-center ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="flex-1 border shadow-sm"
      />

      {showButton && (
        <Button variant="primary" onClick={onSearch}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};


