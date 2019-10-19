import {Review} from './Review';

export interface Restaurant {
  imageUrl: string;
  title: string;
  kitchen: string;
  district: string;
  reviews: Review[];

}
