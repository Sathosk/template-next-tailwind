interface IComponenteTemplateProps {
  seila?: string
}

export default function ComponenteTemplate({
  seila,
}: IComponenteTemplateProps) {
  return (
    <div className="h-screen min-w-full bg-zinc-800 py-5 ">
      <p className="text-zinc-200">{seila}</p>
    </div>
  )
}
