import Link from "next/link"

export function Header() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-violet-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-violet-900 hover:text-violet-700 transition-colors">
            PsiChallenge
          </Link>
        </div>
      </div>
    </nav>
  )
} 