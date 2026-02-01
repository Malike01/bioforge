interface IconProps {
  color?: string;
  size?: number;
  className?: string;
}

// 1. Promoter
export const IconPromoter = ({
  color = "currentColor",
  size = 24,
  className = "",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 12V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 2. RBS (Ribosome Binding Site)
export const IconRBS = ({
  color = "currentColor",
  size = 24,
  className = "",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M4 12H20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path
      d="M12 12C12 12 16 12 16 8C16 4 12 4 12 4C12 4 8 4 8 8C8 12 12 12 12 12Z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2"
    />
  </svg>
);

// 3. CDS (Coding Sequence)
export const IconCDS = ({
  color = "currentColor",
  size = 24,
  className = "",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2 8H16L22 12L16 16H2V8Z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

// 4. Terminator (T)
export const IconTerminator = ({
  color = "currentColor",
  size = 24,
  className = "",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M4 12H20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 12V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 6H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Default/Unknown Icon
export const IconUnknown = ({
  color = "currentColor",
  size = 24,
  className = "",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="4 4"
    />
  </svg>
);
