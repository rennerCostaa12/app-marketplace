export const ConvertMoneyBrl = (valueMoney: number) => {
  if (valueMoney) {
    return valueMoney.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }
};
