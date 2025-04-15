export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  height: number;
  weight: number;
  goal_weight: number;
  fitness_level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  workout_type: string;
  duration: number;
  calories_burned: number;
  date: string;
  notes: string;
}

export interface DietLog {
  id: string;
  user_id: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  image_url: string;
  category: string;
}