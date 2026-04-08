class Observer {
    private listeners: Function[];
  
    constructor() {
      this.listeners = [];
    }
  
    public subscribe(listener: Function): void {
      this.listeners.push(listener);
    }
  
    public unsubscribe(listener: Function): void {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    }
  
    public notify(data?: any): void {
      for (const listener of this.listeners) {
        listener(data);
      }
    }
  }
  
  export default Observer;
  