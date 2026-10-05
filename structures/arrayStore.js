class ArrayStore {
  constructor() {
    this.data = [];
  }
  add(student) {
    this.data.push(student);
  }
  remove(rollNo) {
    const idx = this.data.findIndex(s => s.rollNo === rollNo);
    if (idx === -1) return false;
    this.data.splice(idx, 1);
    return true;
  }
  getAll() {
    return this.data;
  }
  size() {
    return this.data.length;
  }
}

module.exports = { ArrayStore };