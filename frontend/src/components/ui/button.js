export function Button({ children, onClick, disabled }) {
    return (
      <button onClick={onClick} disabled={disabled} className="y-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
        {children}
      </button>
    );
  }