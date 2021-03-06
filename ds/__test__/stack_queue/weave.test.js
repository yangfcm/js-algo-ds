const weave = require("../../stack_queue/weave");
const Queue = require("../../stack_queue/queue");

describe("Test weave.js", () => {
  test("Weave function defined", () => {
    expect(weave).toBeDefined();
  });

  test("queues have a peek function", () => {
    const q = new Queue();
    expect(typeof q.peek).toEqual("function");
  });

  test("peek returns, but does not remove the first element", () => {
    const q = new Queue();
    q.add("a");
    q.add("b");
    q.add("c");
    expect(q.peek()).toBe("a");
    expect(q.peek()).toBe("a"); // To confirm 'peek' doesn't delete the element.
    q.remove();
    expect(q.peek()).toBe("b");
  });

  test("weave can combine two queues", () => {
    const one = new Queue();
    one.add(1);
    one.add(2);
    one.add(3);
    one.add(4);
    const two = new Queue();
    two.add("one");
    two.add("two");
    two.add("three");
    two.add("four");

    const result = weave(one, two);
    expect(result.remove()).toEqual(1);
    expect(result.remove()).toEqual("one");
    expect(result.remove()).toEqual(2);
    expect(result.remove()).toEqual("two");
    expect(result.remove()).toEqual(3);
    expect(result.remove()).toEqual("three");
    expect(result.remove()).toEqual(4);
    expect(result.remove()).toEqual("four");
    expect(result.remove()).toBeUndefined();
  });
});
