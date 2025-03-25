
import React from 'react';

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  isActive: boolean;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  isActive,
  placeholder = '',
  type = 'text',
  multiline = false,
  rows = 4,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <label 
        htmlFor={id} 
        className={`block text-sm font-medium mb-1.5 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-700'}`}
      >
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            rows={rows}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-200"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-200"
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
};

export default FormInput;
