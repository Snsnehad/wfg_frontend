import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 border-b border-primary/10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-lg sm:text-xl font-semibold">
          VoiceOps Analytics
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm opacity-80">
          <span className="hover:text-primary hover:opacity-100 cursor-pointer transition-colors">
            Overview
          </span>
          <span className="hover:text-primary hover:opacity-100 cursor-pointer transition-colors">
            Analytics
          </span>
          <span className="hover:text-primary hover:opacity-100 cursor-pointer transition-colors">
            Reports
          </span>
          <span className="hover:text-primary hover:opacity-100 cursor-pointer transition-colors">
            Settings
          </span>
        </div>

        {/* Desktop CTA Button */}
        <button className="hidden md:block bg-primary hover:bg-primary/90 px-5 py-2 rounded-full transition-colors duration-200 text-sm font-medium">
          Request Demo
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-primary/10">
          <div className="flex flex-col gap-4 text-sm opacity-80">
            <span className="hover:text-primary hover:opacity-100 cursor-pointer transition-colors py-2">
              Overview
            </span>
            <span className="hover:text-primary hover:opacity-100 cursor-pointer transition-colors py-2">
              Analytics
            </span>
            <span className="hover:text-primary hover:opacity-100 cursor-pointer transition-colors py-2">
              Reports
            </span>
            <span className="hover:text-primary hover:opacity-100 cursor-pointer transition-colors py-2">
              Settings
            </span>
            <button className="bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-full transition-colors duration-200 text-sm font-medium mt-2">
              Request Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}