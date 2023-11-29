import React from 'react';

export default function ListText({ title, value, bold }) {
  const valueClass = bold ? 'font-bold text-base text-slate-800' : '';

  return (
    <li className={`w-full rounded-md border mt-0.5 p-2 border-blue-600 text-sm flex`}>
      <span className={`flex-1 ${valueClass}`}>{title}</span>
      <span className={`break-all font-bold ${valueClass}`}>{value}</span>
    </li>
  );
}
