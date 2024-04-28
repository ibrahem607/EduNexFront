export interface ICourse {
    id: number;
    imageUrl: string;
    subject: string;
    profilePictureUrl: string;
    teacher: string;
    description: string;
    grade: string;
    price: number;
    lesson?: ILesson[];
  }
  
  export interface ILesson {
    id: number;
    title: string;
    content?: ILessonContent[];
  }
  
  export interface ILessonContent {
    id: number;
    title: string;
    videoUrl?: string;
    pdfUrl?: string;
  }