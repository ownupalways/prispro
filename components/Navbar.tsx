"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

const links = [
	{ label: "Home", href: "/" },
	{ label: "Women", href: "/women" },
	{ label: "Men", href: "/men" },
	{ label: "Children", href:"/children"},
	{ label: "New Arrivals", href: "/new" },
	{ label: "Sale", href: "/sale" },
];


export default function Navbar() {
    const [open, setOpen] = useState(false);


    return (
			<header className="sticky top-0 z-50 bg-chrome text-chrome-foreground shadow-md">
				<nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
					{/* Logo */}
					<Link
						href="/"
						className="text-xl font-bold tracking-wide">
						PrisciliaPro
					</Link>

					{/* |Desktop links */}
					<ul className="hidden item-center gap-8 md:flex">
						{links.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									className="text-sm font-medium transition-opacity hover:opacity-75 cursor-pointer">
									{link.label}
								</Link>
							</li>
						))}
					</ul>

					{/* Right side icons */}
					<div className="flex items-center gap-1">
						<button
							aria-label="Search"
							className="rounded-full p-2 hover:bg-white/10 cursor-pointer">
							<Search size={20} />
						</button>

						<Link
							href="/account"
							aria-label="Account"
							className="rounded-full p-2 hover:bg-white/10 cursor-pointer">
							<User size={20} />
						</Link>

						<Link
							href="/cart"
							aria-label="Cart"
							className="relative rounded-full p-2 hover:bg-white/10">
							<ShoppingBag size={20} />
							<span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-chrome-foreground text-10 font-bold text-chrome cursor-pointer">
								2
							</span>
						</Link>

						{/* Hamburger: Mobile only */}
						<button
							aria-label="Menu"
							onClick={() => setOpen(!open)}
							className="rounded-full p-2 hover:bg-white/10 md:hidden cursor-pointer">
							{open ? (
								<X size={22} />
							) : (
								<Menu size={22} />
							)}
						</button>
					</div>
				</nav>

				{/* Mobile menu */}
				{open && (
					<ul className="border-t border-white/20  md:hiddden">
						{links.map((link) => (
							<li
								key={link.href}
								className="hover:bg-white/10 w-full px-4 py-1.5">
								<Link
									href={link.href}
									onClick={() => setOpen(false)}
									className="block py-2 text-sm font-medium">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				)}
			</header>
		);
}
