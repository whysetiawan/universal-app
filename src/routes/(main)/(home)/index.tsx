import { memo, useState } from 'react';
import { Text, View } from 'react-native';

import { useBreakpoints } from '@/src/shared/lib/breakpoints';
import { s } from '@/src/shared/lib/styles';

const setCount = () => {
  console.log('setCount');
  return {
    type: 'SET_COUNT',
  };
};

export default function HomeScreen() {
  const { gtMobile } = useBreakpoints();
  const [c, setC] = useState(0);
  console.log('gtMobile', gtMobile);
  return (
    <View style={[s.flex_1, s.justify_center, s.items_center]}>
      <Text onPress={() => setC(c + 1)} style={{ color: 'white' }}>
        Home Screen + {c}
      </Text>
      <TestScreen setCount={setCount()} />
    </View>
  );
}

const TestScreen: React.FC<{ setCount: any }> = memo((props) => {
  console.log('render TestScreen', props);
  return (
    <View>
      <Text style={{ color: 'red' }}>Test Screen</Text>
    </View>
  );
});
TestScreen.displayName = 'TestScreen';
