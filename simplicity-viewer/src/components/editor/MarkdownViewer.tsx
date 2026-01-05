'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div className={cn('prose-simplicity max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom heading renderers with proper spacing
          h1: ({ children, ...props }) => (
            <h1
              className="text-3xl font-bold text-simplicity-charcoal mb-6 mt-8 first:mt-0 pb-3 border-b border-simplicity-gray-200"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="text-2xl font-semibold text-simplicity-charcoal mb-4 mt-8 first:mt-0"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="text-xl font-semibold text-simplicity-charcoal mb-3 mt-6"
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              className="text-lg font-semibold text-simplicity-charcoal mb-2 mt-5"
              {...props}
            >
              {children}
            </h4>
          ),

          // Paragraphs
          p: ({ children, ...props }) => (
            <p className="mb-4 leading-relaxed text-simplicity-charcoal" {...props}>
              {children}
            </p>
          ),

          // Lists
          ul: ({ children, ...props }) => (
            <ul className="mb-4 ml-6 list-disc space-y-1" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-1" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-simplicity-charcoal leading-relaxed" {...props}>
              {children}
            </li>
          ),

          // Links with turquoise accent
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              className="text-simplicity-turquoise hover:underline transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),

          // Code blocks with dark theme
          pre: ({ children, ...props }) => (
            <pre
              className="bg-simplicity-charcoal text-simplicity-offwhite p-4 rounded-xl overflow-x-auto mb-4 text-sm"
              {...props}
            >
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className?.includes('language-');
            if (isInline) {
              return (
                <code
                  className="bg-simplicity-offwhite text-simplicity-charcoal px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={cn('font-mono text-sm', className)} {...props}>
                {children}
              </code>
            );
          },

          // Blockquotes with turquoise border
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-simplicity-turquoise pl-4 italic my-4 text-simplicity-gray-500"
              {...props}
            >
              {children}
            </blockquote>
          ),

          // Tables with proper styling
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-simplicity-offwhite" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-simplicity-gray-200 px-4 py-2 text-left font-semibold text-simplicity-charcoal"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="border border-simplicity-gray-200 px-4 py-2 text-simplicity-charcoal"
              {...props}
            >
              {children}
            </td>
          ),

          // Horizontal rules
          hr: () => <hr className="my-8 border-simplicity-gray-200" />,

          // Strong and emphasis
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-simplicity-charcoal" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic" {...props}>
              {children}
            </em>
          ),

          // Images
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt || ''}
              className="max-w-full h-auto rounded-lg my-4"
              loading="lazy"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// Loading skeleton for markdown content
export function MarkdownViewerSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Title skeleton */}
      <div className="h-8 bg-simplicity-gray-100 rounded-lg w-3/4" />
      <div className="h-1 bg-simplicity-gray-100 rounded w-full" />

      {/* Paragraph skeletons */}
      <div className="space-y-2">
        <div className="h-4 bg-simplicity-gray-100 rounded w-full" />
        <div className="h-4 bg-simplicity-gray-100 rounded w-5/6" />
        <div className="h-4 bg-simplicity-gray-100 rounded w-4/5" />
      </div>

      {/* Section heading */}
      <div className="h-6 bg-simplicity-gray-100 rounded w-1/2 mt-6" />

      {/* More paragraphs */}
      <div className="space-y-2">
        <div className="h-4 bg-simplicity-gray-100 rounded w-full" />
        <div className="h-4 bg-simplicity-gray-100 rounded w-3/4" />
      </div>

      {/* List skeleton */}
      <div className="space-y-2 ml-6">
        <div className="h-4 bg-simplicity-gray-100 rounded w-2/3" />
        <div className="h-4 bg-simplicity-gray-100 rounded w-3/4" />
        <div className="h-4 bg-simplicity-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}

// Empty state for when no file is selected
export function MarkdownEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-simplicity-gray-100 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-simplicity-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-simplicity-charcoal mb-2">
        No file selected
      </h3>
      <p className="text-sm text-simplicity-gray-400 max-w-sm">
        Select a file from the navigation panel to view its contents
      </p>
    </div>
  );
}
