import { makeAutoObservable } from "mobx";

class CounterStore {
  count = 0;
  list = [ 1, 2, 3, 4, 5, 6 ];

  constructor() {
    makeAutoObservable(this);
  }

  // 計算屬性
  get filterList() {
    return this.list.filter(item => item > 2);
  }

  addList = () => {
    this.list.push(7, 8, 9)
  }

  addCount = () => {
    this.count++;
  };
}

const counterStore = new CounterStore();
export default counterStore;
