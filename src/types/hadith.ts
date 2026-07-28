export interface HadithBook {
  name: string;
  id: string;
  available: number;
}

export interface HadithContent {
  number: number;
  arab: string;
  id: string; // Indonesian translation
}

export interface SingleHadithData {
  name: string;
  id: string;
  available: number;
  contents: HadithContent;
}

export interface RangeHadithData {
  name: string;
  id: string;
  available: number;
  requested: number;
  hadiths: HadithContent[];
}

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  error?: boolean;
  data?: T;
}

export interface ApiEndpointSpec {
  method: 'GET' | 'POST';
  path: string;
  title: string;
  description: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  exampleResponse: string;
}
