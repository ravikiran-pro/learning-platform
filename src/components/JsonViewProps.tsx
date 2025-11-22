"use client";

import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

interface JsonViewerProps {
    name: string;
    value: any;
    editable?: boolean;
    onChange?: (updatedData: any) => void;
    collapsed?: number;
}

const lightCleanTheme = {
    base00: "#ffffff",
    base01: "#f5f5f5",
    base02: "#e0e0e0",
    base03: "#9e9e9e",
    base04: "#616161",
    base05: "#212121",
    base06: "#000000",
    base07: "#000000",
    base08: "#d32f2f",
    base09: "#ff6f00",
    base0A: "#795548",
    base0B: "#2e7d32",
    base0C: "#0288d1",
    base0D: "#1565c0",
    base0E: "#6a1b9a",
    base0F: "#8e4b10",
};

const darkCleanTheme = {
    base00: "#1e1e1e",
    base01: "#2c2c2c",
    base02: "#3c3c3c",
    base03: "#6a6a6a",
    base04: "#cccccc",
    base05: "#ffffff",
    base06: "#e0e0e0",
    base07: "#ffffff",
    base08: "#f28b82",
    base09: "#fbbc04",
    base0A: "#fdd663",
    base0B: "#81c995",
    base0C: "#8ab4f8",
    base0D: "#8ab4f8",
    base0E: "#c58afe",
    base0F: "#f6c177"
};


export default function JsonViewer({
    name,
    value,
    editable = false,
    onChange,
    collapsed = 1,
}: JsonViewerProps) {
    return (
        <ReactJson
            src={value}
            name={name}                // 👈 disables "root" display
            theme={darkCleanTheme}
            collapsed={collapsed}
            enableClipboard={true}
            displayDataTypes={false}
            onEdit={editable ? (e) => onChange?.(e.updated_src) : false}
            onAdd={editable ? (e) => onChange?.(e.updated_src) : false}
            onDelete={editable ? (e) => onChange?.(e.updated_src) : false}
            style={{
                fontSize: "14px",
                padding: "8px",
                width: "100%",
                height: "100%",
                overflow: "auto",
            }}
        />
    );
}
