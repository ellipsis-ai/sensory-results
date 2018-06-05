/*
@exportId v7luCPPtQliNjVuTFRYjzQ
*/
module.exports = (function() {
class Context {
  
  static initialFor(crops, room, postChannels) {
    return new Context({
      room: room,
      results: {},
      cropsTodo: crops,
      postChannels: postChannels.split(' ')
    });
  }
  
  constructor(obj) {
    this.postChannels = obj.postChannels;
    this.room = obj.room;
    this.results = obj.results;
    this.cropsTodo = obj.cropsTodo;
  }
  
  resultFor(crop) {
    return this.results[crop];
  }
  
  copyWith(obj) {
    return new Context(Object.assign({}, this, obj));
  }
  
  withNewResult(result) {
    const crop = this.nextCrop();
    const newResults = Object.assign({}, this.results, { [crop]: result });
    return this.copyWith({
      results: newResults,
      cropsTodo: this.cropsTodo.slice(1)
    });
  }
  
  nextCrop() {
    return this.cropsTodo[0];
  }
  
  isDone() {
    return !this.nextCrop();
  }
  
  acceptResult(result, ellipsis) {
    const newContext = this.withNewResult(result);
    const nextCrop = newContext.nextCrop();
    if (nextCrop) {
      ellipsis.success("", {
        next: {
          actionName: "run-check",
          args: [
            { name: "contextString", value: JSON.stringify(newContext) }
          ]
        }
      }); 
    } else {
      ellipsis.success("", {
        next: {
          actionName: "post-summary",
          args: [
            { name: "contextString", value: JSON.stringify(newContext) }
          ]
        }
      })
    }
  }
}

return Context;
})()
     