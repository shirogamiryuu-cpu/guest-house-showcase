import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#eef0ff]">
      <h1 className="font-sans text-[80px] font-bold text-[#131626]">404</h1>
      <p className="mt-2 font-sans text-[18px] text-[#131626]/70">This page could not be found.</p>
      <Link
        href="/home"
        className="mt-8 rounded-[15px] bg-[#3343a5] px-5.5 py-2.5 font-sans text-[16px] font-light text-white transition-opacity hover:opacity-80"
      >
        Go Home
      </Link>
    </div>
  )
}
