import { Badge } from "@/components/ui/badge";
import { Trade } from "@/enums/trade";

const TRADE_BADGES: Record<Trade, { styles: string; label: string }> = {
  buy: { styles: "bg-[#2761ff] hover:bg-[#1d45b3]", label: "Compra" },
  sell: { styles: "bg-[#ffbd67] hover:bg-[#aa7f46]", label: "Venda" },
};

export const TradeBadge: React.FC<{ tradeType: Trade }> = ({ tradeType }) => {
  const trade = TRADE_BADGES[tradeType];
  return <Badge className={trade.styles}>{trade.label}</Badge>;
};
