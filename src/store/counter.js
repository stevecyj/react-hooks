import { makeAutoObservable } from "mobx";

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addCount = () => {
    this.count++;
  };
}

const counterStore = new CounterStore();
export default counterStore;
