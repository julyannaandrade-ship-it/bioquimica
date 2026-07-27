import React from 'react';

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Formats mathematical and chemical notations like \\(Na^+\\), \\(NH_3\\), \\(Fe^{2+}\\), \\(\\alpha\\), \\(\\delta\\)
 * into nicely formatted HTML elements for medical and biochemistry questions.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Replace LaTeX-like patterns with readable clean spans
  const formatText = (str: string) => {
    // Replace inline LaTeX tokens
    let formatted = str
      .replace(/\\\(Na\^\+\\\)/g, 'Na⁺')
      .replace(/\\\(H\^\+\\\)/g, 'H⁺')
      .replace(/\\\(NH_3\\\)/g, 'NH₃')
      .replace(/\\\(NH_4\^\+\\\)/g, 'NH₄⁺')
      .replace(/\\\(Fe\^\{2\+\}\\\)/g, 'Fe²⁺')
      .replace(/\\\(Fe\^\{3\+\}\\\)/g, 'Fe³⁺')
      .replace(/\\\(CO_2\\\)/g, 'CO₂')
      .replace(/\\\(\\alpha\\\)/g, 'α')
      .replace(/\\\(\\delta\\\)/g, 'δ')
      .replace(/\\\(\\beta\\\)/g, 'β')
      .replace(/\\\(K\^\+\\\)/g, 'K⁺');

    // General fallback for remaining \(...\)
    formatted = formatted.replace(/\\\((.*?)\\\)/g, (_match, p1) => {
      let inner = p1
        .replace(/(\w+)\^\{?\+?(\d*|\+|-)\}?/g, '$1⁺')
        .replace(/(\w+)_(\d+)/g, '$1_$2')
        .replace(/\\alpha/g, 'α')
        .replace(/\\delta/g, 'δ');
      return inner;
    });

    return formatted;
  };

  const processed = formatText(text);

  return <span className={className}>{processed}</span>;
};
