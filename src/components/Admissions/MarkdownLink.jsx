export default function MarkDownLink({ text }) {
  const regex = /\[(.*?)\]\((.*?)\)/;
  const match = text.match(regex);
  if (match) {
    const linkText = match[1];
    const url = match[2];
    const parts = text.split(regex);
    return (
      <>
        {parts[0]}
        <a
          href={url}
          className="text-brand-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </a>
        {parts[parts.length - 1]}
      </>
    );
  } else if (text.startsWith("http")) {
    return (
      <a
        href={text}
        className="text-brand-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  } else {
    return <>{text}</>;
  }
}
