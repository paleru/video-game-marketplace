export interface IVideoGame {
  id: number;
  title: string;
  description: string;
  price: number;
  platform: string;
  condition: string;
  image: {
    id: string;
  };
  user_created: {
    first_name: string;
  };
  date_created: string;
}

export interface IVideoGameResponse {
  video_games_by_id: IVideoGame;
}

export interface IVideoGamesResponse {
  video_games: IVideoGame[];
}

export interface INewVideoGame {
  title: string;
  description: string;
  price: number;
  platform: string;
  condition: string;
  image: string;
}