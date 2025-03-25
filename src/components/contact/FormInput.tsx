
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
        className={`block text-sm font-medium mb-1 transition-all duration-300 ${isActive ? 'text-indigo-600' : 'text-neutral-700'}`}
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
            className="w-full px-4 py-3 rounded-lg bg-white/70 border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
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
            className="w-full px-4 py-3 rounded-lg bg-white/70 border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
            placeholder={placeholder}
          />
        )}
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
