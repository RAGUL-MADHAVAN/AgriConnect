interface RoleToggleProps {
  role: "farmer" | "consumer" | "admin";
  onChange: (role: "farmer" | "consumer" | "admin") => void;
  className?: string;
  showAdmin?: boolean;
}

export default function RoleToggle({ role, onChange, className = "", showAdmin = false }: RoleToggleProps) {
  return (
    <div 
      className={`inline-flex rounded-xl bg-slate-700/50 p-1.5 shadow-inner border border-white/10 ${className}`}
      role="group"
      aria-label="Select your role"
    >
      <button
        type="button"
        onClick={() => onChange("farmer")}
        aria-pressed={role === "farmer"}
        className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
          role === "farmer"
            ? "bg-green-600 text-white shadow-lg shadow-green-500/50 transform scale-105"
            : "text-gray-300 hover:text-white hover:bg-slate-600/50"
        }`}
      >
        Farmer
      </button>
      <button
        type="button"
        onClick={() => onChange("consumer")}
        aria-pressed={role === "consumer"}
        className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
          role === "consumer"
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50 transform scale-105"
            : "text-gray-300 hover:text-white hover:bg-slate-600/50"
        }`}
      >
        Consumer
      </button>
      {showAdmin && (
        <button
          type="button"
          onClick={() => onChange("admin")}
          aria-pressed={role === "admin"}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
            role === "admin"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50 transform scale-105"
              : "text-gray-300 hover:text-white hover:bg-slate-600/50"
          }`}
        >
          Admin
        </button>
      )}
    </div>
  );
}
