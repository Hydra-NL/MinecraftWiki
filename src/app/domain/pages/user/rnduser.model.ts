export interface RndUser {
  name: {
    title: string;
    first: string;
    last: string;
  };

  email: string;

  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };

  dob: {
    date: Date;
    age: number;
  };

  phone: string;
  cell: string;

  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
}
