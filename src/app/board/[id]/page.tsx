export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div>
      <h1 className="text-2xl m-5">Board</h1>
    </div>
  );
}
