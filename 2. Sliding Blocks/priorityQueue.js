function PriorityQueue() {
    this.data = [];
}

PriorityQueue.prototype.push = function(item, priority) {
    priority = +priority;
    for (var i = 0; i < this.data.length && this.data[i][1] > priority; i++);
    this.data.splice(i, 0, [item, priority]);
}

PriorityQueue.prototype.pop = function() {
    return this.data.shift()[0];
}

PriorityQueue.prototype.size = function() {
    return this.data.length;
}

module.exports = PriorityQueue;
