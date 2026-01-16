import { Dropdown } from "./Dropdown";

const STATUS_OPTIONS = [
  { value: "OPEN", label: "Active" },
  { value: "CLOSED", label: "Closed" },
];

export const StatusDropdown = ({ value, onChange }) => {
  return (
    <Dropdown
      options={STATUS_OPTIONS}
      value={value}
      onSelect={onChange}
    />
  );
};
