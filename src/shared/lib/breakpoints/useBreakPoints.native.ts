import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const useBreakpoints = () => {
  const [width, setWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number } }) => {
      setWidth(window.width);
    };

    const subs = Dimensions.addEventListener('change', onChange);

    return () => {
      subs.remove();
    };
  }, []);

  const gtPhone = width >= 550;
  const gtMobile = width >= 800;
  const gtTablet = width >= 1048;

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

export default useBreakpoints;
