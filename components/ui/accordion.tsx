export function Accordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <div className="divide-y divide-primary/10 rounded-md border border-primary/10">
      {items.map((item) => (
        <details className="group" key={item.question}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm font-medium text-text">
            {item.question}
            <span className="text-lg text-primary group-open:rotate-45">+</span>
          </summary>
          <p className="px-4 pb-4 text-sm leading-6 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
