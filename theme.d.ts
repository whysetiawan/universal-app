import '@react-navigation/native';

declare module '@react-navigation/native' {
  export type Theme = {
    /**
     * colors for navigation elements like header and tab bars
     */
    colors: {
      background: string;
      border: string;
      card: string;
      notification: string;
      primary: string;
      text: string;
      backdrop: string;
    };
    utils: {
      /**
       * text styles
       */
      text: {
        color: string;
      };
      /**
       * background styles
       */
      background: {
        backgroundColor: string;
      };
      background2: {
        backgroundColor: string;
      };
      border: {
        borderColor: string;
      };
      card: {
        backgroundColor: string;
      };
      notification: {
        backgroundColor: string;
      };
      backdrop: {
        backgroundColor: string;
      };
    };
    dark: boolean;
  };
  export const useTheme: () => Theme;
}
