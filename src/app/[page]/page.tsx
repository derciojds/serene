export default async function Page({ params }: { params: { page: string } }) {
  const { page } = params;

  return <h1>`${page} page`</h1>;
}
