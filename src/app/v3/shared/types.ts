export interface Cat {
  firstName: string;
  lastName: string;
  age: number;
  colorType: string;
  nicknames: string[];
  favoriteMeals: string[];
}

export interface StoredCat extends Cat {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchParams {
  size?: number;
  page?: number;
  colorType?: string;
  favoriteMeal?: string;
}
