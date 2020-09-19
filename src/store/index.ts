import {BehaviorSubject} from 'rxjs';
import {
  SetStateParams,
  StoreState,
  Subject,
  SubjectId,
  SubscribeParams,
} from './types';
import {initialState} from './default';

export class Store {
  private state: StoreState;
  private globalId: number;
  private subject: BehaviorSubject<StoreState>;
  private subjects: Subject[];

  constructor() {
    this.state = initialState;
    this.subject = new BehaviorSubject(initialState);
    this.subjects = [
      {
        id: 'loadingIndicator',
        subject: new BehaviorSubject(initialState),
      },
    ];
    this.globalId = 0;
  }

  public setState(params: SetStateParams) {
    this.state = {...this.state, ...params.newState};
    if (params.subjectId) {
      this.dispatch(params.subjectId);
    } else {
      this.subject.next(this.state);
    }
  }

  public subscribe(params: SubscribeParams) {
    let subject;
    if (params.subjectId) {
      subject = this.subjects.find((sub) => sub.id === params.subjectId)!
        .subject;
    } else {
      subject = this.subject;
    }

    return subject.subscribe({
      next: params.onNext,
    });
  }

  public addSubject(subjectId: SubjectId) {
    this.subjects.push({
      id: subjectId,
      subject: new BehaviorSubject(initialState),
    });
  }

  public getGlobalId() {
    this.globalId = ++this.globalId;
    return this.globalId;
  }

  public getCurrentState() {
    return this.state;
  }

  public dispatch(subjectId: SubjectId) {
    this.subjects
      .find((subject) => subject.id === subjectId)
      ?.subject.next(this.state);
  }
}

const store = new Store();

export default store;
