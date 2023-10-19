import { View } from 'react-native';

import Spinner from '../src/shared/Spinner';

function StartPage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner />
    </View>
  );
}

export default StartPage;
