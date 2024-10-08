import Link from 'next/link';
import React from 'react';

export default function FooterList({ title="", list=[{ text: "", href: "", label: "" }] }) {
  return (
    <div className="flex flex-col items-start gap-6 ph:w-[calc(50%-1rem)] flex-auto">
      <h4 className="text-gray-10 text-sm font-semibold capitalize">{title}</h4>
      <ul className="flex flex-col items-start gap-3">
        {list.map((item, i) => (
          <li
            key={i}
            className={`text-light-10 text-base font-medium capitalize transition-all hover:text-primary hover:scale-105${
              item.label ? (item.href ? "" : " footer-badge after:animate-pulse") : ""
            }`}
            data-badge={!item.href ? item.label : null}
          >
            {item.href ? (
              <Link
                href={item.href}
                data-badge={item.label}
                className={item.label ? "footer-badge after:animate-pulse" : ""}
              >
                {item.text}
              </Link>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
