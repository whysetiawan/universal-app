import { useMediaQuery } from 'react-responsive';

export const useBreakpoints = () => {
  const gtPhone = useMediaQuery({ minWidth: 550 });
  const gtMobile = useMediaQuery({ minWidth: 800 });
  const gtTablet = useMediaQuery({ minWidth: 1048 });

  return {
    /**
     * Greater than phone
     * min-width: 550px
     */
    gtPhone,
    /**
     * Greater than mobile
     * min-width: 800px
     */
    gtMobile,
    /**
     * Greater than tablet
     * min-width: 1300px
     */
    gtTablet,
  };
};
