import Link from "next/link";
import { Suspense } from "react";
import CopyrightYear from "./CopyrightYear";


const shop = [
    { label: "Women", href: "/women"},
    { label: "Men", href: "/men"},
    { label: "New Arrivals", href: "/new"},
    { label: "Sale", href: "/sale"},
];


const help = [
    { label: "Contact Us", href: "/contact"},
    { label: "Shipping Delivery", href: "/shipping"},
    { label: "Returns & Exchange", href: "/returns"},
    { label: "Size-Guide", href: "/size-guide"},
    { label: "FAQs", href: "/faqs"},
];

// const t = Date.now()

export default function Footer() {
    return (
			<footer className="bg-chrome text-chrome-foreground p4">
				<div className="mx-auto grid max-w-w7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
					{/* Brand */}
					<div>
						<h3 className="text-xl font-bold">
							Priscillia Pro
						</h3>
						<p className="mt-3 text-sm opacity-80">
							Fashion that fits you. Quality
							pieces for every day and every
							occasion.
						</p>
						<div className="my-3 flex gap-4 text-sm">
							<a
								href="#"
								className="p-2 rounded-md hover:bg-white/10">
								Instagram
							</a>
							<a
								href="#"
								className="p-2 rounded-md hover:bg-white/10">
								Facebook
							</a>
							<a
								href="#"
								className="p-2 rounded-md hover:bg-white/10 transition-transform duration-300">
								TikTok
							</a>
						</div>
					</div>

					{/* Shop */}
					<div>
						<h4 className="font-semibold">
							Shop
						</h4>
						<ul className="mt-3 space-y-2 text-sm opacity-80">
							{shop.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="hover:underline">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Help */}
					<div>
						<h4 className="font-semibold">
							Help
						</h4>
						<ul className="mt-3 space-y-2 text-sm opacity-80">
							{help.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="hover:underline">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h4 className="font-semibold">
							Stay in the Loop
						</h4>
						<p className="mt-3 text-sm opacity-80">
							New arrivals and exclusive offers,
							straight to your inbox.
						</p>
						<div className="my-4 flex gap-2">
							<input
								type="email"
								placeholder="Your email"
								className="w-full rounded-md br-whie/10 px-3 py-2 text-sm placeholder-white/60 outline-none  bg-white/20"
							/>
							<button className="rounded-md bg-chrome-foreground px-4 py-2 text-sm font-semibold text-chrome cursor-pointer">
								Join
							</button>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-white/20">
					<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs opacity-80 sm:flex-row sm:px-6">
						<p>
							&copy;{" "}
							<Suspense
								fallback={
									<span className="inline-block w-8" />
								}>
								<CopyrightYear />
							</Suspense>{" "}
							Pricillia. All right reserved.
						</p>
						<p>
							Secure payments . Fast delivery
							.Easy returns
						</p>
					</div>
				</div>
				<p className="text-center text-xs">
					Powered by Tushclouds Technologies Ltd
				</p>
			</footer>
		);
}
