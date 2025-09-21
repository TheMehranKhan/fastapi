// Minimal project-local type declarations to satisfy the compiler in this template project.
// These are intentionally small and only cover the immediate missing-type errors reported.

declare module 'lucide-react' {
  import * as React from 'react'
  export const CheckCircle: React.FC<{ className?: string }>
  export const XCircle: React.FC<{ className?: string }>
  export const Loader: React.FC<{ className?: string }>
  export const ExternalLink: React.FC<{ className?: string }>
  export const Zap: React.FC<{ className?: string }>
  export const Github: React.FC<{ className?: string }>
  export const Menu: React.FC<{ className?: string }>
  export const X: React.FC<{ className?: string }>
  export const Copy: React.FC<{ className?: string }>
  export const Code: React.FC<{ className?: string }>
  export const Database: React.FC<{ className?: string }>
  export const Shield: React.FC<{ className?: string }>
  export const Users: React.FC<{ className?: string }>
  export const Mail: React.FC<{ className?: string }>
  export const MessageSquare: React.FC<{ className?: string }>
  export const Send: React.FC<{ className?: string }>
  export const LogOut: React.FC<{ className?: string }>
  export const User: React.FC<{ className?: string }>
  export const Settings: React.FC<{ className?: string }>
  export const Rocket: React.FC<{ className?: string }>
  export const ArrowRight: React.FC<{ className?: string }>
  export const Eye: React.FC<{ className?: string }>
  export const EyeOff: React.FC<{ className?: string }>
  export const Lock: React.FC<{ className?: string }>
  const icons: { [key: string]: React.FC<any> }
  export default icons
}

// If the project lacks @types/react, provide a minimal JSX namespace so TSX files compile.
// This allows intrinsic elements and React.FC to be used without full @types/react installed.

declare namespace JSX {
  interface IntrinsicElements {
    // allow any unknown element with any props
    [elemName: string]: any
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
    h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
    main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  }
}
