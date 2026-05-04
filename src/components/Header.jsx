function Header() {
    return (
        <header className="flex items-center justify-between px-6 h-14 bg-white shrink-0 border-b border-gray-300">
        
            <div>
                <div className="text-sm font-medium text-gray-800">Panel</div>
                <div className="text-xs text-gray-400">FindRent / Panel</div>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600">
                    Sistema activo
                </span>
                <div className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1.5C4.515 1.5 2.5 3.515 2.5 6v3.5l-1 1v.5h11v-.5l-1-1V6C11.5 3.515 9.485 1.5 7 1.5Z" stroke="#6b7280" strokeWidth="1.2"/>
                        <path d="M5.5 11.5a1.5 1.5 0 003 0" stroke="#6b7280" strokeWidth="1.2"/>
                    </svg>
                </div>
            </div>
        </header>
    )
}

export default Header