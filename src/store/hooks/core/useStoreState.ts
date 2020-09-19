import {useEffect, useState} from 'react';
import {BehaviorSubject} from 'rxjs';
import Store from '../..';
import {StoreState} from '../../types';

type Selector<T> = (state: StoreState) => T;
type IsEqual<T> = (previous: T, current: T) => boolean;

interface Props<T> {
  selector: Selector<T>;
  isEqual: IsEqual<T>;
  unSubscribe?: boolean;
  subjectId?: keyof StoreState;
}

const useStoreState = <T>({
  unSubscribe = true,
  selector,
  isEqual,
  subjectId,
}: Props<T>) => {
  const [state, setState] = useState<T>(selector(Store.getCurrentState()));
  const [stateSubject] = useState(new BehaviorSubject(state));

  useEffect(() => {
    stateSubject.next(state);
  }, [state]);

  const onNext = (storeState: StoreState) => {
    const selectedState = selector(storeState);
    const stateChanged = !isEqual(stateSubject.getValue(), selectedState);
    if (stateChanged) {
      setState(selectedState);
    }
  };

  useEffect(() => {
    const subscription = Store.subscribe({
      onNext,
      subjectId,
    });
    return () => {
      if (unSubscribe && subscription && !subscription.closed) {
        subscription!.unsubscribe();
      }
    };
  }, []);

  return state;
};

export default useStoreState;
