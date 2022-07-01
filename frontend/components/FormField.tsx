import React from "react";
import classNames from "classnames";

const FormField: React.FC<{
  children: React.ReactElement;
  label?: React.ReactNode;
  error?: string | false | null;
  className?: string;
}> = ({ children, error, label, className }) => {
  return (
    <div className={classNames("space-y-2 flex flex-col w-full", className)}>
      {label && (
        <label className="font-semibold text-sm text-slate-600">{label}</label>
      )}
      {children}
      {error && <div className="text-red-400 text-sm">{error}</div>}
    </div>
  );
};

export default FormField;
