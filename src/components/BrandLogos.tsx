import React from "react";
import type { BrandId } from "@/lib/brands";

interface BrandLogoProps {
  brand: BrandId;
  className?: string;
}

/**
 * Custom-crafted, authentic SVG vector wordmarks & emblems for all 13 HVAC manufacturers.
 * Uses currentColor-friendly or authentic brand geometry so cards can transition cleanly
 * between monochrome editorial state and full brand color.
 */
export function BrandLogo({ brand, className = "h-8 w-auto" }: BrandLogoProps) {
  switch (brand) {
    case "daikin":
      return (
        <svg
          viewBox="0 0 210 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Daikin"
        >
          {/* Signature Daikin Two-Tone Blue Triangle Corner Emblem */}
          <polygon points="6,8 34,8 6,36" fill="#0097E0" />
          <polygon points="6,8 20,8 6,22" fill="#004B87" />
          {/* Italic Geometric DAIKIN Wordmark */}
          <text
            x="38"
            y="34"
            fill="#0068B7"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="28"
            letterSpacing="1.5"
          >
            DAIKIN
          </text>
        </svg>
      );

    case "mitsubishi":
      return (
        <svg
          viewBox="0 0 265 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Mitsubishi Electric"
        >
          {/* Iconic Three-Diamond Emblem */}
          <g fill="#E60012">
            <polygon points="24,6 31,18 24,30 17,18" />
            <polygon points="24,30 38,30 45,42 31,42" />
            <polygon points="24,30 10,30 3,42 17,42" />
          </g>
          {/* MITSUBISHI ELECTRIC Lockup */}
          <text
            x="54"
            y="24"
            fill="#0F172A"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="17"
            letterSpacing="0.8"
          >
            MITSUBISHI
          </text>
          <text
            x="54"
            y="41"
            fill="#0F172A"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="14.5"
            letterSpacing="1.4"
          >
            ELECTRIC
          </text>
        </svg>
      );

    case "carrier":
      return (
        <svg
          viewBox="0 0 200 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Carrier"
        >
          <ellipse
            cx="100"
            cy="24"
            rx="84"
            ry="19"
            fill="#002F6C"
          />
          <ellipse
            cx="100"
            cy="24"
            rx="79"
            ry="15.5"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <text
            x="100"
            y="31"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="700"
            fontStyle="italic"
            fontSize="24"
            letterSpacing="0.5"
          >
            Carrier
          </text>
        </svg>
      );

    case "haier":
      return (
        <svg
          viewBox="0 0 180 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Haier"
        >
          <text
            x="18"
            y="36"
            fill="#005AAA"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="33"
            letterSpacing="0.5"
          >
            Haier
          </text>
          {/* Signature Red Dot over the 'i' */}
          <circle cx="81.5" cy="11.5" r="3.8" fill="#E60012" />
        </svg>
      );

    case "amena":
      return (
        <svg
          viewBox="0 0 205 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Amena"
        >
          {/* Cooling Arc */}
          <path
            d="M14 14C34 5 72 5 96 12"
            stroke="#0284C7"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <text
            x="14"
            y="37"
            fill="#004B87"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="28"
            letterSpacing="2.5"
          >
            AMENA
          </text>
        </svg>
      );

    case "samsung":
      return (
        <svg
          viewBox="0 0 215 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Samsung"
        >
          <g transform="rotate(-7 107 24)">
            <ellipse cx="107" cy="24" rx="92" ry="17" fill="#1428A0" />
          </g>
          <text
            x="107"
            y="31"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="21"
            letterSpacing="3.2"
          >
            SAMSUNG
          </text>
        </svg>
      );

    case "toshiba":
      return (
        <svg
          viewBox="0 0 210 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Toshiba"
        >
          <text
            x="12"
            y="35"
            fill="#E60012"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="29"
            letterSpacing="2.2"
          >
            TOSHIBA
          </text>
        </svg>
      );

    case "tcl":
      return (
        <svg
          viewBox="0 0 165 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="TCL"
        >
          <rect x="12" y="8" width="120" height="32" rx="4" fill="#E60012" />
          <text
            x="72"
            y="32"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="24"
            letterSpacing="4"
          >
            TCL
          </text>
        </svg>
      );

    case "sharp":
      return (
        <svg
          viewBox="0 0 195 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Sharp"
        >
          <text
            x="14"
            y="35"
            fill="#E60012"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="30"
            letterSpacing="2.5"
          >
            SHARP
          </text>
        </svg>
      );

    case "midea":
      return (
        <svg
          viewBox="0 0 190 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Midea"
        >
          <path
            d="M14 15C38 4 86 4 122 14"
            stroke="#0099D9"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <text
            x="18"
            y="36"
            fill="#0072CE"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="29"
            letterSpacing="0.8"
          >
            Midea
          </text>
        </svg>
      );

    case "fujitsu":
      return (
        <svg
          viewBox="0 0 205 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Fujitsu"
        >
          {/* Infinity Loop Motif above J & I */}
          <path
            d="M74 11C69 6 61 8 61 12C61 16 69 16 74 11C79 6 87 6 87 12C87 16 79 16 74 11Z"
            stroke="#E60012"
            strokeWidth="2.6"
            fill="none"
          />
          <text
            x="14"
            y="37"
            fill="#E60012"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="27"
            letterSpacing="1.8"
          >
            FUJITSU
          </text>
        </svg>
      );

    case "lg":
      return (
        <svg
          viewBox="0 0 160 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="LG"
        >
          {/* Iconic LG Circle Emblem */}
          <circle cx="28" cy="24" r="16" fill="#A50034" />
          <path
            d="M28 13V26H33"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="22.5" cy="19" r="1.8" fill="#FFFFFF" />
          <path
            d="M39 24C39 30.1 34.1 35 28 35C21.9 35 17 30.1 17 24C17 18.4 21.1 13.8 26.5 13.1"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <text
            x="54"
            y="33"
            fill="#475569"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="27"
            letterSpacing="1.5"
          >
            LG
          </text>
        </svg>
      );

    case "panasonic":
      return (
        <svg
          viewBox="0 0 225 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Panasonic"
        >
          <text
            x="12"
            y="35"
            fill="#0041C2"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="28"
            letterSpacing="0.6"
          >
            Panasonic
          </text>
        </svg>
      );
  }
}

