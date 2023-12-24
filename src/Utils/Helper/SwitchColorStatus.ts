export const SwitchColorStatus = (status: string) => {
  switch (status) {
    case "Aguardando Visualização":
      return "#656993";
    case "Preparando Pedido":
      return "#E6A23C";
    case "A Caminho":
      return "#2CCCFF";
    case "Finalizado":
      return "#00E200";
    case "Cancelado":
      return "#DC143C";
    default:
      return "#7B808A";
  }
};
