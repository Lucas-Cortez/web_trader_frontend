type Callback<T> = (data: MessageEvent<T>["data"]) => void;

export class CandleListener<T = any> {
  private readonly candleChannel: WebSocket;

  constructor(coin: { symbol: string; interval: string }, messageCallback: Callback<T>) {
    this.candleChannel = new WebSocket(
      `${process.env.NEXT_PUBLIC_BROKER_WEBSOCKET_URL}/${coin.symbol.toLowerCase()}@kline_${coin.interval}`,
    );

    this.setMessageCallback(messageCallback);
  }

  setMessageCallback(messageCallback: Callback<T>) {
    this.candleChannel.onmessage = (event) => {
      messageCallback(JSON.parse(event.data));
    };
  }

  closeChannel() {
    this.candleChannel.close();
  }
}
