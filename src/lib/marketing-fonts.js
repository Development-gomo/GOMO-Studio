/** Merriweather serif — display headings for the Figma home page (GO_MO_New_Test_Website_4th_August_2026). */
import { Merriweather } from "next/font/google";

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});
