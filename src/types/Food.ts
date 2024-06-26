export interface Food {
  id: number;
  name: string;
  calories: number;
  net_carbs: number;
  carbs: number;
  proteins: number;
  total_fat: number;
  satured_fat: number;
  fiber: number;
  sodium: number;
}

export interface NewMealFoods {
  id: number;
  name: string;
  quantity: number;
}

export interface NewMealRequest {
  name: string;
  foods: NewMealFoods[]
}