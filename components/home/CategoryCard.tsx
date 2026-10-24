import Link from "next/link";
import Image from "next/image"

type CategoryCardProps = {
	name: string;
	href: string;
    blurb: string;
	description: string;
	image: string;
};

export default function CategoryCard({
	name,
	href,
    blurb,
	description,
	image,
}: CategoryCardProps) {
	return (
		<Link
			href={href}
			className="group relative flex aspect-4/5 items-end overflow-hidden rounded-2xl text-primary-foreground">
			<Image
				src={image}
				alt={name}
				fill
				sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
				className="object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			{/* <div className="absolute inset-0" /> */}
			<div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-chrome/70 via-chrome/20 to-transparent">
				<h3 className="text-2xl font-bold">
					{name}
				</h3>

				<div className="grid grid-rows-[1fr] opacity-100 transition-all duration-300 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
					<div className="overflow-hidden">
						<p className="mb-3 text-sm opacity-80">
							{blurb}
						</p>
						<p className="line-clamp-3 text-sm opacity-80">
							{description}
						</p>
						<span className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">
							Shop now
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
