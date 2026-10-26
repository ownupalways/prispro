"use client";

import { useState } from "react";
import Link from "next/link";
import {
	Search,
	User,
	ShoppingBag,
	Menu,
	X,
} from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

const links = [
	{ label: "Home", href: "/" },
	{ label: "Women", href: "/women" },
	{ label: "Men", href: "/men" },
	{ label: "Children", href: "/children" },
	{ label: "New Arrivals", href: "/new" },
	{ label: "Sale", href: "/sale" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const { cartCount } = useCart();

	return (
		<header className="sticky top-0 z-50 bg-chrome text-chrome-foreground shadow-md">
			<nav
				aria-label="Main navigation"
				className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
				{/* Logo */}
				<Link
					href="/"
					className="text-xl font-bold tracking-wide">
					PrisciliaPro
				</Link>

				{/* Desktop links */}
				<ul className="hidden items-center gap-8 md:flex">
					{links.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className="cursor-pointer text-sm font-medium transition-opacity hover:opacity-75">
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				{/* Right-side icons */}
				<div className="flex items-center gap-1">
					<button
						type="button"
						aria-label="Search"
						className="cursor-pointer rounded-full p-2 hover:bg-white/10">
						<Search
							size={20}
							aria-hidden="true"
						/>
					</button>

					<Link
						href="/account"
						aria-label="Account"
						className="cursor-pointer rounded-full p-2 hover:bg-white/10">
						<User size={20} aria-hidden="true" />
					</Link>

					<Link
						href="/cart"
						aria-label={`Shopping cart, ${cartCount} ${
							cartCount === 1 ? "item" : "items"
						}`}
						className="relative rounded-full p-2 hover:bg-white/10">
						<ShoppingBag
							size={20}
							aria-hidden="true"
						/>

						{cartCount > 0 && (
							<span
								aria-hidden="true"
								className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-chrome-foreground px-1 text-[10px] font-bold text-chrome">
								{cartCount > 99
									? "99+"
									: cartCount}
							</span>
						)}
					</Link>

					{/* Mobile menu */}
					<button
						type="button"
						aria-label={
							open ? "Close menu" : "Open menu"
						}
						aria-expanded={open}
						onClick={() =>
							setOpen((current) => !current)
						}
						className="cursor-pointer rounded-full p-2 hover:bg-white/10 md:hidden">
						{open ? (
							<X size={22} aria-hidden="true" />
						) : (
							<Menu
								size={22}
								aria-hidden="true"
							/>
						)}
					</button>
				</div>
			</nav>

			{/* Mobile menu */}
			{open && (
				<ul className="border-t border-white/20 md:hidden">
					{links.map((link) => (
						<li
							key={link.href}
							className="w-full px-4 py-1.5 hover:bg-white/10">
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
