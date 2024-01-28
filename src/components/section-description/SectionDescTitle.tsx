export function SectionDescTitle({ text }: { text: string }) {
  return <h2 className="fs-h2" dangerouslySetInnerHTML={{ __html: text }} />;
}
