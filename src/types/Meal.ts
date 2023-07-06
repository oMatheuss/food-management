import { Food } from './Food';

export interface Meal {
  list_id: number;
  user_id: number;
  name: string;
}

export interface MealFood extends Omit<Food, 'id'> {
  food_id: number;
  quantity: number;
}
