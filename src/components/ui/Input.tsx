import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  withToggle?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, errorMessage, withToggle, maxLength, showCharCount, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const isPassword = type === "password" && withToggle;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        <div className="relative">
          <input
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "flex h-10 w-full rounded-md border bg-white dark:bg-gray-800 px-3 py-2 text-sm text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
              error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:border-transparent",
              className
            )}
            ref={ref}
            maxLength={maxLength}
            onChange={handleChange}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          )}
        </div>
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
        {showCharCount && maxLength && (
          <p className="mt-1 text-xs text-gray-400 text-right">{charCount}/{maxLength}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, errorMessage, maxLength, showCharCount, ...props }, ref) => {
    const [charCount, setCharCount] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        <textarea
          className={cn(
            "w-full min-h-[100px] rounded-md border bg-white dark:bg-gray-800 px-3 py-2 text-sm text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:border-transparent",
            className
          )}
          ref={ref}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
        {showCharCount && maxLength && (
          <p className="mt-1 text-xs text-gray-400 text-right">{charCount}/{maxLength}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";