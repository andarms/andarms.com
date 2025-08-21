import { useEffect, useMemo, useState } from "preact/hooks";

const taglines: string[] = [
  "アドリアン・マンハレス",
  "Just coding for fun.",
  "Shipping tiny things.",
  "Learning in public.",
  "Minimal code, maximal joy.",
  "Building, breaking, fixing.",
  "Coffee-fueled commits.",
  "Less boilerplate, more craft.",
  "Curious by default.",
  "Make it simple.",
];

export default function TaglineClient() {
  const [text, setText] = useState("");

  const random = useMemo(() => {
    const idx = Math.floor(Math.random() * taglines.length);
    return String(taglines[idx] ?? "");
  }, [taglines]);

  useEffect(() => {
    setText(random);
  }, [random]);

  return <p class="tagline">{text}</p>;
}
