import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export function Logo({ variant = 'default', className }: LogoProps) {
  if (variant === 'compact') {
    return (
      <Link href="/" className={cn('flex items-center', className)}>
        <div className="w-8 h-8 rounded-card bg-simplicity-charcoal flex items-center justify-center">
          <span className="text-simplicity-white font-bold text-lg tracking-tight">
            S
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" className={cn('flex items-center gap-3', className)}>
      {/* Logo Mark */}
      <div className="w-10 h-10 rounded-card bg-simplicity-charcoal flex items-center justify-center">
        <span className="text-simplicity-white font-bold text-xl tracking-tight">
          S
        </span>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span className="font-semibold text-simplicity-charcoal text-sm tracking-tight leading-none">
          SIMPLICITY
        </span>
        <span className="text-[10px] text-simplicity-gray-400 tracking-[0.2em] uppercase">
          Growth Marketing
        </span>
      </div>
    </Link>
  );
}

// Alternative: Viewer-specific logo
export function ViewerLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-3', className)}>
      <div className="w-9 h-9 rounded-lg bg-simplicity-charcoal flex items-center justify-center">
        <span className="text-simplicity-white font-bold text-lg">S</span>
      </div>
      <div>
        <div className="font-semibold text-simplicity-charcoal text-sm">
          Simplicity Viewer
        </div>
        <div className="text-xs text-simplicity-gray-400">
          Client Dashboard
        </div>
      </div>
    </Link>
  );
}
