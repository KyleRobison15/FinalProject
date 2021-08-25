import { MessageCountPipe } from './message-count.pipe';

describe('MessageCountPipe', () => {
  it('create an instance', () => {
    const pipe = new MessageCountPipe();
    expect(pipe).toBeTruthy();
  });
});
