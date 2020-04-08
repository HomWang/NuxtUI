/**
 * kafka
 */
class kafka {
  constructor() {
    // //生产者对象集合: 生产者发布消息到某个主题
    // this.Producer = new Map();
    // //经纪人对象集合
    // this.Broker = new Map();
    // //消费者对象集合: 订阅了这个主题的消费者都可以接收到生产者写入的新消息
    // this.Consumer = new Map();
    // //主题对象集合: 每一条消息都有一个topic, 使用中产生不同类型的数据，都可以设置不同的主题, 一个主题一般会有多个消息的订阅者
    // this.Topic = new Map();
    // //消费者群体对象集合
    // this.ConsumerGroup = new Map();
    // //分区
    // this.partition = new Map()

    // this.observes = new Map(); //订阅者对象集合
    this.messages = []; //推送的消息集合

  }

  //生产者对象集合: 生产者发布消息到某个主题
  Producer() {
    //产生了一条数据
  }

  //主题对象集合: 每一条消息都有一个topic, 使用中产生不同类型的数据，都可以设置不同的主题, 一个主题一般会有多个消息的订阅者
  Topic() {

  }

  // 消费者对象集合: 订阅了这个主题的消费者都可以接收到生产者写入的新消息
  Consumer() {

  }
}
