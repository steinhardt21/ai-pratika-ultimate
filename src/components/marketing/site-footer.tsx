import Link from "next/link"

export function SiteFooter() {
    return (
        <footer className="px-4 md:px-6 lg:px-10 py-6 md:py-8 bg-aipratika-purple text-white bg-texture">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg md:text-xl font-bold">AI Pratika</span>
                    </div>
                    
                    {/* Navigation links - centered */}
                    <nav className="flex flex-wrap justify-center items-center gap-6 text-sm">
                        <span className="opacity-60 text-xs">
                            © {new Date().getFullYear()} AI Pratika
                        </span>
                        <Link href="/privacy" className="opacity-80 hover:opacity-100 transition-opacity">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="opacity-80 hover:opacity-100 transition-opacity">
                            Termini di Servizio
                        </Link>
                        <Link href="/contact" className="opacity-80 hover:opacity-100 transition-opacity">
                            Contatti
                        </Link>
                        <Link 
                            href="https://linkedin.com/company/ai-pratika" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                        </Link>
                    </nav>
                    
                    {/* Right side spacer for balance */}
                    <div className="hidden lg:block w-24"></div>
                </div>
            </div>
        </footer>
    )
}