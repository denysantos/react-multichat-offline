type MobileMenuButtonProps = {
  isOpen: boolean
  onClick: () => void
}

export default function MobileMenuButton({
  isOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? 'Fechar menu de conversas' : 'Abrir menu de conversas'}
      aria-expanded={isOpen}
      aria-controls="conversation-sidebar"
      onClick={onClick}
      className="fixed left-3 top-3 z-50 rounded-lg bg-stone-800 p-2 text-white transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700 md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
        aria-hidden="true"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            d="m6 6 12 12M18 6 6 18"
          />
        ) : (
          <path
            strokeLinecap="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  )
}
