import { Minus, Plus } from 'lucide-react';

interface NumberInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helpText?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  helpText,
  min = 0,
  max,
  step = 1,
}: NumberInputProps) {
  const handleIncrement = () => {
    const currentValue = parseFloat(value) || 0;
    const newValue = currentValue + step;
    if (!max || newValue <= max) {
      onChange(newValue.toString());
    }
  };

  const handleDecrement = () => {
    const currentValue = parseFloat(value) || 0;
    const newValue = currentValue - step;
    if (newValue >= min) {
      onChange(newValue.toString());
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className="absolute left-0 h-full px-4 bg-[#6e054e] hover:bg-[#5a0440] text-white rounded-l-lg transition-colors flex items-center justify-center z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={min !== undefined && (parseFloat(value) || 0) <= min}
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6e054e] focus:border-transparent text-center pl-16 pr-16"
        />
        
        <button
          type="button"
          onClick={handleIncrement}
          className="absolute right-0 h-full px-4 bg-[#6e054e] hover:bg-[#5a0440] text-white rounded-r-lg transition-colors flex items-center justify-center z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={max !== undefined && (parseFloat(value) || 0) >= max}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {helpText && (
        <p className="text-sm text-gray-500 mt-2">
          {helpText}
        </p>
      )}
    </div>
  );
}
