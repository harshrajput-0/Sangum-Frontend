export function AuthFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-transparent px-5 py-6 text-center backdrop-blur-md">
      <span className="text-xs text-text-muted">
        © {year} Sangum. All rights reserved. · Terms of Service · Privacy Policy
      </span>
    </footer>
  );
}