import {Review} from './Review';

export interface Restaurant {
  id: number;
  imageUrl: string;
  title: string;
  cuisine: string;
  district: string;
  reviews: Review[];
  location: string;
}
