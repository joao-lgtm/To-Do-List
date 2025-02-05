import { colors } from "./colors";

export const theme = {
  colors,
  fonts: {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    bold: "Poppins_700Bold"
  }
};

export type ThemeType = typeof theme;
