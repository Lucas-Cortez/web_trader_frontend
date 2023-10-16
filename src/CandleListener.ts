export class CandleListener<T = any> {
  private readonly candleChannel: WebSocket;

  constructor(
    coin: { symbol: string; interval: string },
    messageCallback: (data: MessageEvent<T>["data"]) => void,
  ) {
    this.candleChannel = new WebSocket(
      `${process.env.NEXT_PUBLIC_BROKER_WEBSOCKET_URL}/${coin.symbol.toLowerCase()}@kline_${coin.interval}`,
    );

    this.setMessageCallback(messageCallback);
  }

  setMessageCallback(messageCallback: (data: MessageEvent<T>["data"]) => void) {
    this.candleChannel.onmessage = (event) => {
      messageCallback(JSON.parse(event.data));
    };
  }

  closeChannel() {
    this.candleChannel.close();
  }
}
