  export function highlight(text, searchTerm) {
    if (!searchTerm) return text;

    {/*use regular expressions to highlight it */}
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase()
        ? <span key={i} style={{ backgroundColor: "yellow", color: "black" }}>{part}</span>
        : part
  );
}