import { ItemSentStates } from '../lib/types';

class SentStatusFSM {
  private states = { ...ItemSentStates };

  private currentState: ItemSentStates;

  constructor() {
    this.currentState = this.states.sent;
  }

  public getCurrentState(): ItemSentStates {
    return this.currentState;
  }

  public complete(): void {
    if (this.currentState === this.states.sent) {
      this.currentState = this.states.complete;
    } else {
      throw new Error('Cannot transition to complete from current state');
    }
  }

  public error(): void {
    if (this.currentState === this.states.sent) {
      this.currentState = this.states.error;
    } else {
      throw new Error('Cannot transition to error from current state');
    }
  }

  public resend(): void {
    if (this.currentState === this.states.error) {
      this.currentState = this.states.sent;
    } else {
      throw new Error('Cannot transition to sent from current state');
    }
  }
}

export default SentStatusFSM;
