import { GlobalSummary } from "../models/transaction";

/**
 * @author DeepSeek Chat (https://www.deepseek.com)
 */
export function createMockSumary(): GlobalSummary {
  return {
    inflowTypes: [
      { id: 'salary', name: 'Salario', flow: 'in', icon: 'attach_money' },
      { id: 'freelance', name: 'Freelance', flow: 'in', icon: 'computer' }, 
      { id: 'investment', name: 'Dividendos', flow: 'in', icon: 'trending_up' },
    ],
    outflowTypes: [
      { id: 'food', name: 'Comida', flow: 'out', icon: 'restaurant' },
      {
        id: 'transport',
        name: 'Transporte',
        flow: 'out',
        icon: 'directions_car',
      },
      { id: 'shopping', name: 'Compras', flow: 'out', icon: 'shopping_cart' },
    ],
    summaries: [
      // Día 1 (5 transacciones)
      {
        id: 'day-20230401',
        date: new Date(2023, 3, 1).getTime(), // 1/Abril/2023
        inflow: 850,
        outflow: 120,
        transactions: [
          {
            id: 't-20230401-1',
            date: new Date(2023, 3, 1, 9, 30).getTime(),
            amount: 500,
            info: 'Pago freelance',
            typeId: 'freelance',
            flow: 'in',
          },
          {
            id: 't-20230401-2',
            date: new Date(2023, 3, 1, 12, 15).getTime(),
            amount: 20,
            info: 'Almuerzo',
            typeId: 'food',
            flow: 'out',
          },
          {
            id: 't-20230401-3',
            date: new Date(2023, 3, 1, 14, 0).getTime(),
            amount: 350,
            info: 'Dividendos inversión',
            typeId: 'investment',
            flow: 'in',
          },
          {
            id: 't-20230401-4',
            date: new Date(2023, 3, 1, 18, 30).getTime(),
            amount: 50,
            info: 'Taxi',
            typeId: 'transport',
            flow: 'out',
          },
          {
            id: 't-20230401-5',
            date: new Date(2023, 3, 1, 20, 0).getTime(),
            amount: 50,
            info: 'Supermercado',
            typeId: 'food',
            flow: 'out',
          },
        ],
      },
      // Día 2 (5 transacciones)
      {
        id: 'day-20230402',
        date: new Date(2023, 3, 2).getTime(), // 2/Abril/2023
        inflow: 3000,
        outflow: 450,
        transactions: [
          {
            id: 't-20230402-1',
            date: new Date(2023, 3, 2, 0, 0).getTime(),
            amount: 3000,
            info: 'Salario mensual',
            typeId: 'salary',
            flow: 'in',
          },
          {
            id: 't-20230402-2',
            date: new Date(2023, 3, 2, 10, 0).getTime(),
            amount: 200,
            info: 'Ropa',
            typeId: 'shopping',
            flow: 'out',
          },
          {
            id: 't-20230402-3',
            date: new Date(2023, 3, 2, 12, 30).getTime(),
            amount: 30,
            info: 'Almuerzo',
            typeId: 'food',
            flow: 'out',
          },
          {
            id: 't-20230402-4',
            date: new Date(2023, 3, 2, 15, 45).getTime(),
            amount: 20,
            info: 'Metro',
            typeId: 'transport',
            flow: 'out',
          },
          {
            id: 't-20230402-5',
            date: new Date(2023, 3, 2, 19, 0).getTime(),
            amount: 200,
            info: 'Cena restaurante',
            typeId: 'food',
            flow: 'out',
          },
        ],
      },
      // Día 3 (5 transacciones)
      {
        id: 'day-20230403',
        date: new Date(2023, 3, 3).getTime(), // 3/Abril/2023
        inflow: 150,
        outflow: 75,
        transactions: [
          {
            id: 't-20230403-1',
            date: new Date(2023, 3, 3, 8, 0).getTime(),
            amount: 150,
            info: 'Trabajo freelance',
            typeId: 'freelance',
            flow: 'in',
          },
          {
            id: 't-20230403-2',
            date: new Date(2023, 3, 3, 8, 30).getTime(),
            amount: 5,
            info: 'Café',
            typeId: 'food',
            flow: 'out',
          },
          {
            id: 't-20230403-3',
            date: new Date(2023, 3, 3, 12, 0).getTime(),
            amount: 20,
            info: 'Almuerzo',
            typeId: 'food',
            flow: 'out',
          },
          {
            id: 't-20230403-4',
            date: new Date(2023, 3, 3, 14, 0).getTime(),
            amount: 10,
            info: 'Bus',
            typeId: 'transport',
            flow: 'out',
          },
          {
            id: 't-20230403-5',
            date: new Date(2023, 3, 3, 18, 30).getTime(),
            amount: 40,
            info: 'Farmacia',
            typeId: 'shopping',
            flow: 'out',
          },
        ],
      },
    ],
  };
}
