export type View = 'home' | 'stations' | 'about' | 'news' | 'contact' | 'skyz' | 'breeze' | 'admin_login' | 'admin_dashboard';

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  id?: string;
  station?: string;
}

export interface Show {
  id?: string;
  name: string;
  time: string;
  hosts: string[];
  desc: string;
  station?: string;
  startTime?: string;
  startPeriod?: 'AM' | 'PM';
  endTime?: string;
  endPeriod?: 'AM' | 'PM';
  isLive?: boolean;
}

export interface Station {
  id: string;
  name: string;
  freq: string;
  tagline: string;
  location: string;
  desc: string;
  image: string;
  streamUrl: string;
  gallery: GalleryImage[];
  shows: Show[];
  hosts: string[];
}
