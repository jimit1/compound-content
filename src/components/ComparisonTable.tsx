import React from "react";

type Props = {
  columns: string[];
  rows: (string | number)[][];
};

export default function ComparisonTable({ columns, rows }: Props) {
  return (
    <div className="comparison-table">
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
