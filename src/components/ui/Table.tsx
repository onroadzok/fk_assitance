import type { HTMLAttributes } from 'react';

export const Table = ({ children, className = '', ...props }: HTMLAttributes<HTMLTableElement>) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-sm text-left ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
  return <tbody {...props}>{children}</tbody>;
};

export const TableRow = ({ children, className = '', ...props }: HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${className}`} {...props}>
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className = '', ...props }: HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th className={`px-6 py-3 ${className}`} {...props}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = '', ...props }: HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </td>
  );
};
