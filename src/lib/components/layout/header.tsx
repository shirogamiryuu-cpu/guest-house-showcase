"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { navLinks } from "@/routes/navigation"

const YOUTHS_LOGO = "/Bwtnd.png"

const departmentItems = [
  { label: "Software", href: "/software" },
  { label: "Graphic", href: "/graphic" },
  { label: "Merchandise", href: "#" },
  { label: "E-sports", href: "#" },
]

const ecommerceItems = [
  { label: "Products", href: "#" },
  { label: "Contracts", href: "#" },
]

type DropdownKey = "departments" | "ecommerce" | null

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key))
  }

  return (
    <header ref={dropdownRef} className="relative mx-auto flex w-full max-w-360 items-center justify-between border-b border-[#d0d0d0] px-5 py-4 md:px-8 md:py-5 lg:px-12.5">
      {/* Logo */}
      <Link href="/home" className="relative block shrink-0">
        <div className="grid grid-cols-[max-content] grid-rows-[max-content]">
          <img
            src={YOUTHS_LOGO}
            alt=""
            className="col-start-1 row-start-1 size-9 object-cover md:size-11.5 md:rounded-xs"
          />
          <span className="col-start-1 row-start-1 ml-11.5 mt-0 font-brand text-base font-semibold leading-[1.2] text-[#3343a5] md:ml-14.75 md:text-[20px]">
            YOUTHs
          </span>
          <span className="col-start-1 row-start-1 ml-11.5 mt-5.5 font-sans text-xs font-light leading-[1.2] text-[#3343a5] md:ml-14.75 md:mt-7.25 md:text-[16px]">
            UNITE-INSPIRE-IMPACT
          </span>
        </div>
      </Link>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        className="flex items-center justify-center lg:hidden"
      >
        {mobileOpen ? (
          <X className="size-6 text-[#3343a5]" />
        ) : (
          <Menu className="size-6 text-[#3343a5]" />
        )}
      </button>

      {/* Desktop Nav + Auth */}
      <div className="hidden items-center gap-2.5 lg:flex">
        <nav className="flex items-center gap-2.5">
          {navLinks.map((link) => {
            if (link.label === "Departments") {
              return (
                <div key={link.href} className="relative">
                  <button
                    onClick={() => toggleDropdown("departments")}
                    className="flex items-center gap-1 rounded-[15px] px-3.5 py-2.5 font-sans text-[16px] font-light text-[#3343a5] transition-opacity hover:opacity-80"
                  >
                    Departments
                    <ChevronDown
                      className={`size-4 transition-transform ${
                        openDropdown === "departments" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "departments" && (
                    <div className="absolute left-0 top-full z-50 mt-1 w-27.5 overflow-hidden rounded-[15px] bg-[#eef0ff] shadow-[0_4px_3.5px_rgba(19,22,38,0.2)]">
                      {departmentItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block border-b border-[#1316261a] px-3 py-2.5 text-center font-sans text-sm font-light text-[#3343a5] last:border-b-0 hover:bg-[#3343a5]/5"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            if (link.label === "E-Commerce") {
              return (
                <div key={link.href} className="relative">
                  <button
                    onClick={() => toggleDropdown("ecommerce")}
                    className="flex items-center gap-1 rounded-[15px] px-3.5 py-2.5 font-sans text-[16px] font-light text-[#3343a5] transition-opacity hover:opacity-80"
                  >
                    E-Commerce
                    <ChevronDown
                      className={`size-4 transition-transform ${
                        openDropdown === "ecommerce" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "ecommerce" && (
                    <div className="absolute left-0 top-full z-50 mt-1 w-27.25 overflow-hidden rounded-[15px] bg-[#eef0ff] shadow-[0_4px_3.5px_rgba(19,22,38,0.2)]">
                      {ecommerceItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block border-b border-[#1316261a] px-3 py-2.5 text-center font-sans text-sm font-light text-[#3343a5] last:border-b-0 hover:bg-[#3343a5]/5"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[15px] px-3.5 py-2.5 font-sans text-[16px] font-light text-[#3343a5] transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/signup"
            className="block rounded-[15px] bg-[#3343a5] px-5.5 py-2.5 text-center text-[16px] font-light leading-none text-white font-sans"
          >
            sign up
          </Link>
          <Link
            href="/login"
            className="block rounded-[15px] bg-[#3343a5] px-6.5 py-2.5 text-center text-[16px] font-light leading-none text-white font-sans"
          >
            log in
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-[#d0d0d0] bg-white px-5 pb-5 pt-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              if (link.label === "Departments") {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => toggleDropdown("departments")}
                      className="flex w-full items-center justify-between rounded-[15px] px-3.5 py-2.5 font-sans text-[16px] font-light text-[#3343a5]"
                    >
                      Departments
                      <ChevronDown
                        className={`size-4 transition-transform ${
                          openDropdown === "departments" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === "departments" && (
                      <div className="ml-4 mt-1 space-y-1">
                        {departmentItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => { setOpenDropdown(null); setMobileOpen(false) }}
                            className="block rounded-[10px] px-3.5 py-2 font-sans text-sm font-light text-[#3343a5] hover:bg-[#3343a5]/5"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              if (link.label === "E-Commerce") {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => toggleDropdown("ecommerce")}
                      className="flex w-full items-center justify-between rounded-[15px] px-3.5 py-2.5 font-sans text-[16px] font-light text-[#3343a5]"
                    >
                      E-Commerce
                      <ChevronDown
                        className={`size-4 transition-transform ${
                          openDropdown === "ecommerce" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === "ecommerce" && (
                      <div className="ml-4 mt-1 space-y-1">
                        {ecommerceItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => { setOpenDropdown(null); setMobileOpen(false) }}
                            className="block rounded-[10px] px-3.5 py-2 font-sans text-sm font-light text-[#3343a5] hover:bg-[#3343a5]/5"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-[15px] px-3.5 py-2.5 font-sans text-[16px] font-light text-[#3343a5] transition-opacity hover:opacity-80"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Auth */}
          <div className="mt-4 flex items-center gap-2.5 border-t border-[#d0d0d0] pt-4">
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="block rounded-[15px] bg-[#3343a5] px-5.5 py-2.5 text-center text-[16px] font-light leading-none text-white font-sans"
            >
              sign up
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block rounded-[15px] bg-[#3343a5] px-6.5 py-2.5 text-center text-[16px] font-light leading-none text-white font-sans"
            >
              log in
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
