"use client";
import Link from "next/link";
import Image from "next/image";
export default function Card({ preview, icon,title, name, description, id, url }: {
	preview?: string,
	title: string,
	name: string,
	description: string,
	id: string,
	url: string
	,
	icon:string
}) {
const nURL = new URL(url)
	return (
		<Link href={url} className="card card-compact w-96 bg-base-100 shadow-xl">
			<figure><img src={preview!} alt={name} /></figure>
			<div className="card-body">
				<h2 className="card-title"><img src={icon} alt={name} width={30} className="avatar rounded-full"/>{title}</h2>
				<p>{nURL.hostname}</p>
			
			</div>
		</Link>
	)
}
