class Order {
  constructor(id, user_id, total, status) {
    this.id = id;
    this.user_id = user_id;
    this.total = total;
    this.status = status;
  }
}
module.exports = Order;
