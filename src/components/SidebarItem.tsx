type SidebarItemProps = {
  id: string
  isActive: boolean
  onSelect: () => void
  onDelete: () => void
}

export default function SidebarItem({
  id,
  isActive,
  onSelect,
  onDelete,
}: SidebarItemProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border-l-4 px-2 transition-colors duration-150 ${
        isActive
          ? 'border-stone-700 bg-stone-200 font-medium'
          : 'border-transparent hover:bg-stone-200'
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-current={isActive ? 'page' : undefined}
        title={id}
        className="min-w-0 flex-1 truncate py-2 text-left text-sm text-stone-800 focus-visible:outline-2 focus-visible:outline-stone-700"
      >
        {id}
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label={`Excluir conversa ${id}`}
        className="shrink-0 rounded p-1.5 text-stone-500 transition-colors hover:bg-red-100 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6h18m-2 0-.9 14.1a2 2 0 0 1-2 1.9H7.9a2 2 0 0 1-2-1.9L5 6m4 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-5 4v7m4-7v7"
          />
        </svg>
      </button>
    </div>
  )
}
