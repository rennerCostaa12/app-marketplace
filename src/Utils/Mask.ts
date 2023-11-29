export class Masks {
  static MaskMoney(money: string): string {
    if (Number.isNaN(money)) return "0,00";

    let v = money.replace(/\D/g, "");
    v = String((parseInt(v) / 100).toFixed(2));
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return v;
  }

  static MaskPhone(phone: string): string {
    if (!phone) return "";
    let newValue = phone?.replace(/\D/g, "");
    newValue = newValue?.replace(/(\d{2})(\d)/, "($1)$2");
    newValue = newValue?.replace(/(\d)(\d{4})$/, "$1-$2");
    return newValue;
  }
}
