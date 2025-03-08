import Link from "next/link"

export function Header() {
  return (
    <header className="bg-primary text-white py-4 px-6">
      <div className="container mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Anise Health</h1>
        </Link>
      </div>
    </header>
  )
}

