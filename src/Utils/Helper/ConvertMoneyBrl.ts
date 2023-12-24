export const ConvertMoneyBrl = (valueMoney: number) => {
  return valueMoney.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
