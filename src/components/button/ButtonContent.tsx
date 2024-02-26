interface ButtonContentProps {
  text: string;
}

export function ButtonContent({ text }: ButtonContentProps) {
  return <span>{text}</span>;
}
