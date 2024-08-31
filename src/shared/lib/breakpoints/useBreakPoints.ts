import { useMediaQuery } from 'react-responsive';

export const useBreakpoints = () => {
  const gtPhone = useMediaQuery({ minWidth: 500 });
  const gtMobile = useMediaQuery({ minWidth: 800 });
  const gtTablet = useMediaQuery({ minWidth: 1300 });

  return {
    gtPhone,
    gtMobile,
    gtTablet,
  };
};
