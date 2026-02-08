import { Input } from "@heroui/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  onScan: (barcode: string) => void;
  placeholder?: string;
};

export default function BarcodeScannerInput({
  onScan,
  placeholder = "Scan barcode..."
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  // Initial focus when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Refocus helper (safe & non-blocking)
  const refocus = () => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  // Scanner submits via Enter
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const code = value.trim();
    if (!code) return;

    onScan(code);   // 🔍 send barcode to parent
    setValue("");   // 🧹 clear input
    refocus();      // 🔐 restore focus for next scan
  };
  // useEffect(() => {
  //   const forceFocus = () => inputRef.current?.focus();
  //   window.addEventListener("click", forceFocus);

  //   return () => window.removeEventListener("click", forceFocus);
  // }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        value={value}
        autoComplete="off"
        autoCorrect="off"
        // spellCheck={false}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      // onBlur={refocus}   // prevents accidental focus loss
      />
    </form>
  );
}
