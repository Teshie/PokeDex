class LocalStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  loadState(): any {
    try {
      const serializedState = localStorage.getItem(this.key);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }

  saveState(state: any): void {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(this.key, serializedState);
    } catch (err) {
      console.log(err);
    }
  }
}

export default LocalStorage;
