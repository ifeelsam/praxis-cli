import { ModeToggle } from "@/components/ui/theme-toggle"

const Header = ({ name }: { name: string }) => {
  return (
    <header className="w-full p-4 md:px-8">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{name}</h1>
        <ModeToggle />
      </nav>
    </header>
  )
}
export default Header
