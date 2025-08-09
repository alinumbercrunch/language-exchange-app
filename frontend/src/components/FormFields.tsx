import React from 'react';

interface FormFieldProps {
    id: string;
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'number';
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    className = '',
}) => (
    <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

interface SelectFieldProps {
    id: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: readonly { readonly value: string; readonly label: string }[];
    required?: boolean;
    className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
    id,
    label,
    name,
    value,
    onChange,
    options,
    required = false,
    className = '',
}) => (
    <div className={className}>
        <label htmlFor={id}>{label}</label>
        <select id={id} name={name} value={value} onChange={onChange} required={required}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

interface TextAreaFieldProps {
    id: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    className?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
    id,
    label,
    name,
    value,
    onChange,
    required = false,
    className = '',
}) => (
    <div className={className}>
        <label htmlFor={id}>{label}</label>
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);
