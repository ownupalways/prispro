import Link from "next/link";

export default function Hero() {
	return (
		<section className="bg-surface">
			<div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
				<div>
					<p className="text-sm font-semibold uppercase tracking-widest text-primary">
						New Season
					</p>
					<h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
						Fashion that fits you.
					</h1>
					<p className="mt-4 max-w-md text-lg text-muted">
						Discover quality pieces for every day
						and every occasion. Fresh styles
						arrive every week.
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<Link
							href="/new"
							className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
							Shop New Arrivals
						</Link>
						<Link
							href="/sale"
							className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
							View Sale
						</Link>
					</div>
				</div>

				<div className="flex aspect-4/5 w-full items-center justify-center rounded-2xl bg-linear-to-br from-primary to-chrome text-sm text-primary-foreground/70">
					Hero image goes here
				</div>
			</div>
		</section>
	);
}
