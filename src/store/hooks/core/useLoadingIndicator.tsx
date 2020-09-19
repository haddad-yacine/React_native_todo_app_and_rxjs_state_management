import React from 'react';
// import {androidElevationToIosShadow} from '../../../utils';
// import Modal from 'react-native-modal';
import {
  ActivityIndicator,
  StyleSheet,
  Platform,
  View,
  Modal,
} from 'react-native';
import useStoreState from './useStoreState';
import {LoadingIndicator as LoadingIndicatorType} from '../../types';
import Store from '../..';

const useLoadingIndicator = (subscribeToState = false) => {
  const {isVisible, queue} = useStoreState<LoadingIndicatorType>({
    selector: (state) => state.loadingIndicator,
    isEqual: (prev, curr) =>
      subscribeToState && curr.isVisible === prev.isVisible,
    subjectId: 'loadingIndicator',
  });

  const Indicator = () => {
    if (subscribeToState) {
      return <LoadingIndicator isVisible={isVisible} />;
    } else {
      return null;
    }
  };

  const showLoadingIndicator = () => {
    Store.setState({
      newState: {
        loadingIndicator: {
          isVisible: true,
          queue: queue + 1,
        },
      },
      subjectId: 'loadingIndicator',
    });
  };

  const hideLoadingIndicator = () => {
    const leftQueue = queue <= 0 ? 0 : queue - 1;
    Store.setState({
      newState: {
        loadingIndicator: {
          isVisible: leftQueue > 0,
          queue: leftQueue,
        },
      },
      subjectId: 'loadingIndicator',
    });
  };

  return {
    LoadingIndicator: Indicator,
    showLoadingIndicator,
    hideLoadingIndicator,
  };
};

//#region Loading Indicator
interface Props {
  isVisible: boolean;
}
const LoadingIndicator = (props: Props) => {
  // <Modal
  //   isVisible={props.isVisible}
  //   style={styles.modal}
  //   backdropOpacity={0.2}>
  return (
    <Modal visible={props.isVisible}>
      <View style={styles.mainContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    </Modal>
  );
};
//#endregion

//#region Style Sheet
const styles = StyleSheet.create({
  mainContainer: {
    elevation: 2,
    //TODO
    // ...androidElevationToIosShadow(2),
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 3 : undefined,
    paddingLeft: Platform.OS === 'ios' ? 2 : undefined,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
//#endregion

export default useLoadingIndicator;
