// services/mealsApi.ts
const BASE = 'https://www.themealdb.com/api/json/v1/1';

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail extends MealSummary {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube?: string;
  [key: string]: string | undefined; // for strIngredient1..20, strMeasure1..20
}

async function fetchWithRetry<T>(url: string, retries = 2): Promise<T> {
  let lastError: Error = new Error('Unknown error');
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err as Error;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

export async function fetchItalianMeals(): Promise<MealSummary[]> {
  const data = await fetchWithRetry<{ meals: MealSummary[] | null }>(
    `${BASE}/filter.php?a=Italian`,
  );
  return data.meals ?? [];
}

export async function fetchMealById(id: string): Promise<MealDetail | null> {
  const data = await fetchWithRetry<{ meals: MealDetail[] | null }>(
    `${BASE}/lookup.php?i=${id}`,
  );
  return data.meals?.[0] ?? null;
}

export function extractIngredients(
  meal: MealDetail,
): { ingredient: string; measure: string }[] {
  const result: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      result.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? '',
      });
    }
  }
  return result;
}
