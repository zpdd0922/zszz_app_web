export default class Queue {
  static _queueSeqNumber = 0;

  // 下个队列id
  static _nextQueueID() {
    return ++Queue._queueSeqNumber;
  }

  _maxSize = 1000;
  _isAsync = false;
  _callback = null;

  _items = [];
  _queueName = '';
  _isRunnig = false;

  constructor(name = 'Test', { maxSize = 1000, isAsync = false, callback = null } = {}) {
    this._queueName = `Queue-${Queue._nextQueueID()}-${name}`;
    this._maxSize = maxSize;
    this._isAsync = isAsync;
    if (callback) this.sub(callback);
  };

  sub(callback) {
    this._callback = callback;
    window.addEventListener('message', async (e) => {
      // 只响应当前队列的召唤
      if (e.data === this._queueName) {
        e.stopPropagation(); // 阻止事件冒泡
        if (!this._isAsync && this._isRunnig) {
          return;
        }
        while (!this.isEmpty()) {
          // 执行并删除队列中的第一个
          this._isRunnig = true;
          const message = this.take();

          if (typeof this._callback === 'function') await this._callback(message);
        }
        this._isRunnig = false;
      }
    });
  }

  offer(message) {
    if (!message) {
      throw new Error('message 为空!');
    }
    if (this.size() >= this.maxSize) {
      return false;
    }
    // 添加到队列
    this._items.push(message);
    if (this._isAsync || !this._isRunnig) {
      window.postMessage(this._queueName, '*');
    }
    return true;
  }

  take() {
    if (this.size()) return this._items.shift();
  }

  clear() {
    this._items = [];
  }

  size() {
    return this._items.length;
  }

  queueName() {
    return this._queueName;
  }

  isEmpty() {
    return this._items.length === 0;
  }
}

// var AsyncQueue = {
//   queue: [],
//   init: function () {
//     window.addEventListener("message", function (e) {
//       // 只响应AsyncQueue的召唤
//       if (e.data === "AsyncQueue") {
//         e.stopPropagation();//阻止事件冒泡
//         if (AsyncQueue.queue.length > 0) {
//           //执行并删除队列中的第一个
//           var _task = AsyncQueue.queue.shift();
//           _task.excute(_task.data);
//         }
//       }
//     }, true);
//   },
//   addTask: function (task) {
//     //添加到队列
//     console.log('添加', task.data.name);
//     AsyncQueue.queue.push(task);
//     window.postMessage("AsyncQueue", "*");
//   }
// }

// //初始化队列
// AsyncQueue.init();

// for (var i = 0; i < 10; i++) {
//   var _task = {
//     data: { name: i },
//     excute: function (param) {
//       // 模拟后台请求
//       var _tt = Math.random() * 10000;//因为有些业务快，有些业务慢
//       console.log(param.name, "任务执行中.....", _tt);
//       setTimeout(function () {
//         console.info(param.name, "任务完成", _tt);
//       }, _tt);

//     }
//   }
//   AsyncQueue.addTask(_task);
// }

// //模拟隔一段时间再加入的任务
// setTimeout(function () {
//   var _uuid = "test0001";

//   var _task = {
//     data: { name: _uuid },
//     excute: function (param) {
//       //模拟后台请求
//       var _tt = Math.random() * 1000;//因为有些业务快，有些业务慢
//       console.log(param.name, "任务执行中.....", _tt);
//       setTimeout(function () {
//         console.info(param.name);
//         console.log(param.name, "任务完成", _tt);
//       }, _tt);

//     }
//   }
//   AsyncQueue.addTask(_task);
// }, 6000);
