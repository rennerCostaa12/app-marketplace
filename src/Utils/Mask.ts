export class Masks {
  static MaskMoney(money: string): string {
    const numericValue = money.replace(/\D/g, "") as any;
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue / 100);

    return formattedValue;
  }

  static RemoveMaskMoney(money: string): number {
    const numericValue = money.replace(/\D/g, "");
    return parseFloat(numericValue) / 100;
  }

  static MaskPhone(phone: string): string {
    if (!phone) return "";
    let newValue = phone?.replace(/\D/g, "");
    newValue = newValue?.replace(/(\d{2})(\d)/, "($1)$2");
    newValue = newValue?.replace(/(\d)(\d{4})$/, "$1-$2");
    return newValue;
  }
}
