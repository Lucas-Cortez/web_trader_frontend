export const handleWS = () => {
  const symbol = "btcbrl";
  const interval = "1s";

  const socket = new WebSocket(`${process.env.NEXT_PUBLIC_BROKER_WEBSOCKET_URL}/${symbol}@kline_${interval}`);

  socket.onmessage = (event) => {
    console.log(event.data);
  };

  socket.onclose = (event) => {
    console.log("CLOSE");
  };

  const timeout = setTimeout(() => {
    socket.close();
  }, 10000);
};
