export function Checkbox({ checked, onCheckedChange }) {
    return (
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="flex items-center space-x-2"
      />
    );
  }