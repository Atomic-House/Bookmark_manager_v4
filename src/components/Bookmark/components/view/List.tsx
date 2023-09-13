import Link from "next/link"
import EditBookmarkOption from "../EditBookmarkOptions"
import { HiPencil } from "@react-icons/all-files/hi/HiPencil"
export default function List({ icon, title, name, url }: {
	preview?: string,
	title?: string,
	name?: string,
	description?: string,
	id: string,
	url: URL | string,
	icon?: string
}) {
	return (
		<div className="flex justify-around items-center">
			<div>
				<Link href={url!} className="flex items-center">
					<span>
						<img src={icon} alt={name} width={50} />
					</span>
					<span className="flex flex-col items-center text-sm">
						<p className="font-semibold">
							{name ? name : title ? title : url.toString()}
						</p>
						<p>
							<div className="tooltip" data-tip={url}>
								<button className="text-xs">Link</button>
							</div>
						</p>
					</span>
				</Link>
			</div>
			<div>
				<EditBookmarkOption rounded="rounded-lg" bg="bg-slate-900" trigger={<HiPencil />} />
			</div>
		</div>)
}
