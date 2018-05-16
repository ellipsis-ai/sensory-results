/*
@exportId v7luCPPtQliNjVuTFRYjzQ
*/
module.exports = (function() {
class CropRoom {
  constructor(crop, room) {
    this.crop = crop;
    this.room = room;
  }
}

class CropRoomResult {
  constructor(crop, room, result) {
    this.crop = crop;
    this.room = room;
    this.result = result;
  }
}

class Context {
  
  static initialFor(crops, rooms) {
    let todos = [];
    rooms.forEach(eaRoom => {
      crops.forEach(eaCrop => {
        todos.push(new CropRoom(eaCrop, eaRoom));
      });
    })
    const initial = new Context({
      results: [],
      todos: todos
    });
    return initial.withUpdatedState();
  }
  
  constructor(obj) {
    this.currentCrop = obj.currentCrop;
    this.currentRoom = obj.currentRoom;
    this.results = obj.results.map(ea => new CropRoomResult(ea.crop, ea.room, ea.result));
    this.todos = obj.todos;
  }
  
  resultFor(crop, room) {
    return this.results.find(ea => {
      return ea.crop == crop && ea.room == room;
    });
  }
  
  resultsForRoom(room) {
    return this.results.filter(ea => ea.room == room);
  }
  
  withUpdatedState() {
    const nextTodo = this.next();
    return new Context({
      results: this.results,
      todos: this.todos,
      currentCrop: nextTodo ? nextTodo.crop : undefined,
      currentRoom: nextTodo ? nextTodo.room : undefined
    });
  }
  
  withNewResult(crop, room, result) {
    return new Context({
      results: this.results.concat([{ crop: crop, room: room, result: result }]),
      todos: this.todos.filter(ea => ea.crop != crop || ea.room != room)
    }).withUpdatedState();
  }
  
  next() {
    return this.todos[0];
  }
  
  isDone() {
    return !this.next();
  }
  
  acceptResult(result, ellipsis) {
    const newContext = this.withNewResult(this.currentCrop, this.currentRoom, result);
    const next = newContext.next();
    if (next) {
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
     